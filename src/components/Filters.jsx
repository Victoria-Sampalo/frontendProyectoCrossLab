
// components/Filters.jsx
import { allCategories, allProductsByFilters } from '../services/api';
import './Filters.css'
import { useId, useState, useEffect } from 'react'
import {SearchIcon } from './Icons';

export function Filters( {cambiarFiltro,item, onResetFilters} ){
    const [filters, setFilters]=useState({
        minPrice:item.minPrice,
         category:item.category,
    });
    const [categories,setCategories]=useState([]);

    const minPriceFilterId=useId();
    const categoryFilterId= useId();

    //console.log("valor de: "+ onResetFilters)

    if(onResetFilters){
        
        setFilters({
            minPrice: 0,
            category: "",
          });
          //console.log("valores cambiados"+ filters.minPrice + "-"+ filters.category);
          onResetFilters=false;
          
    }

    const btnSearch=()=>{
        cambiarFiltro(filters)
    }

    const resetFilters = () => {
        setFilters({
            minPrice: 0,
            category: ''
        });
    };

    useEffect(()=>{
        const fetchData=async ()=>{
            try {
                
                const response= await allCategories();
                
               // console.log(response)
                setCategories(response.data)// Actualizar estado con las categorías
                //console.log(response.data)
            } catch (error) {
                console.log('Error al obtener las categorias',error)
            }
        };
        fetchData();
    },[]);
    //  console.log("categories")
    //  console.log(categories)

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
          ...prevState,
          minPrice: event.target.value
        }))
        //console.log("Precio seleccionado: " + event.target.value + "€");
      }

      const handleChangeCategory = (event) => {
        setFilters(prevState => ({
          ...prevState,
          category: event.target.value
        }))

        //console.log("Categoría seleccionada: " + event.target.value);
      }

      //console.log("info filtro: " + JSON.stringify(filters))
      //info filtro: {"minPrice":"871","category":"Other"}

    return(

        <section className='filters'>
           
            <div>
            {/* Entonces, cuando haces clic en la etiqueta "Precio a partir de:",
             el control de formulario asociado, que es el input con el id igual 
             a minPriceFilterId, obtiene el foco. */}
                <label htmlFor={minPriceFilterId}>Rango precio: </label>
                <input 
                type='range'
                id={minPriceFilterId}
                min='0'
                max='200'
                onChange={handleChangeMinPrice}
                value={filters.minPrice}
                />
                <span>{filters.minPrice}€</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select id={categoryFilterId} onChange={handleChangeCategory} 
                value={filters.category}>
                    <option value=''>All </option>
                   {categories.map((c,index)=>(
                    <option key={index} value={c}>
                        {c}
                    </option>
                   ))} 
        </select>

            </div>
            <button onClick={()=>btnSearch()}>{SearchIcon()}</button>

        </section>

    )
}