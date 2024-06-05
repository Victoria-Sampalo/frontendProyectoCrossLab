// ./App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Router, Routes } from 'react-router-dom';
import { allProducts, allProductsByFilters } from "./services/api";
import { tokenUser } from './lib/data';

import Header from "./components/Header";
import { Products } from "./components/Products";
import { Filters } from "./components/Filters";
import { SinProducts } from "./components/SinProducts";

import {Footer} from './components/Footer'
import { FiltersContext } from "./context/filters";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/cart";
import { useLogin } from "./hooks/useLogin";
import Login from './components/Login';
import { obtenerToken } from './lib/serviceToken.js'
import DetalleProducto from "./components/DetalleProducto.jsx";

function useFilters(){
  // const[filters,setFilters]=useState({
  //     minPrice: 0,
  //     category: "all",
  //   });

    const {filters, setFilters}=useContext(FiltersContext)
  
  console.log(filters)

    return {filters, setFilters}

    
}


function App() {
  const {cambiarLogged, logged, logout}=useLogin()

  const [products, setProducts] = useState(null);
  const [limit, setLimit] = useState([0, 10]);
  const [filters, setFilters] =   useState({  
       minPrice: 0,
     category: "",
   });

   const [usuario,setUsuario]=useState(null);
   
  const [resetFiltersFlag, setResetFiltersFlag] = useState(false);
  //paso a la funcion que me llamada a los filtros,
  const changeFilters = (item) => {
    setFilters(item);

    //console.log(item);
  };
  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      category: "",
    });
    //Va alternando los valores para volver al App principal si hace click en el botón
    (!resetFilters) ? (setResetFiltersFlag(true)) : (setResetFiltersFlag(false))
    

  };

  useEffect(() => {
    // Función para realizar la petición
    const fetchData = async () => {
        //Me traigo los productos
        const response = await allProductsByFilters(filters);
        //Me traigo el token
        const token= obtenerToken();
        //Controlo si está o no logueado
        if(token!=null) {
          const user= await tokenUser(token)
          console.log("usuario en app "+ user);
          if(user==null||user.error ){
            logout()
          } else {
            console.log("EXISTE usuario en app "+ user);
            cambiarLogged(user)
            setUsuario(user)
           

          }
        } else {
          logout()
        }
        // console.log(response)
        //actualiza el estado con los datos recibidos
        setProducts(response);
    
    };
    // Llamar a la función fetchData cuando el componente se monte
    fetchData();

    // Limpiar la función en caso de que el componente se desmonte antes de que la petición se complete
    // return () => {};
    //renderizame cada vez que lo que está entre [] se cambie
  }, [filters, limit]); // El segundo argumento del useEffect es un array de dependencias, en este caso, vacío para que el efecto solo se ejecute una vez al montar el componente

  if (products != null) {
    const objectKeys = Object.keys(products);
    const objectLength = objectKeys.length;
    //console.log(objectLength);
  }
  
  const home=()=>{
    return (
      <>
      <Filters onResetFilters={resetFiltersFlag} cambiarFiltro={(x) => changeFilters(x)} item={filters} />
       {products != null ? (
        Object.keys(products).length > 0 ? (
          <Products products={products} />
        ) : (
          <SinProducts resetFilters={resetFilters} />
        )
      ) : (
        <p>Cargando...</p>
      )}
      </>
    )
  }

  return (
    <CartProvider className="App">
      <BrowserRouter>
       <Header />
       <Cart /> 
       <main>
        <Routes>
          <Route path="/" element={home()}/>
          <Route path="/shop" element={<h1>Shop</h1>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<h1>Register</h1>}/>
          <Route path='/product/:id' element={<DetalleProducto/>}/>
          <Route path="/about" element={<h1>About</h1>}/>
        </Routes>
       </main>
       <Footer filters={filters} usuario={usuario}/>
      </BrowserRouter>
     
    </CartProvider >
  );
}

export default App;
