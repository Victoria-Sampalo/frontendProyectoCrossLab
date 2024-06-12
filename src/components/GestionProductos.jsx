// ./src/components/GestionProductos.jsx
import React, { useEffect, useState } from "react";
import "../styles/listStyles.css";
import { useNavigate } from "react-router-dom";
import {
  tokenUser,
  getCountProductsAdminFilters,
  getAllProductsAdminLimitFilters,
  
} from "../lib/data";
import { useLogin } from "../hooks/useLogin";
import { obtenerToken } from "../lib/serviceToken";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdCancel, MdFirstPage, MdLastPage } from "react-icons/md";

const GestionProductos = () => {
  const { logged,logout } = useLogin();
  const [products, setProducts] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para mostrar/ocultar el formulario de creación
  const [offset, setOffset] = useState(0); //offset
  const [cantidad, setCantidad] = useState(null);
  const [limit, setLimit] = useState(2);
  const [filtros, setFiltros] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);


  useEffect(() => {
    if (!logged.estaLogueado) navigate("/login");
    const cargarDatos = async () => {
      const id = logged.user._id;
      const token = obtenerToken();
      let esTokenValid = await tokenUser(token);
      //console.log(esTokenValid);
      if (esTokenValid.error) {
       logout()
      } else {
        const numeroRegistros = await getCountProductsAdminFilters(
          token,
          filtros
        );

       
 
        setCantidad(numeroRegistros.total);
        console.log(cantidad)
        //cantidad/limit
        const productos = await getAllProductsAdminLimitFilters(
          token,
          limit,
          offset,
          filtros
        );

        setProducts(productos); // Actualiza el estado con los datos recibidos
        console.log(productos);
      }
    };
    cargarDatos();
  }, [logged, offset, limit, filtros]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setOffset(0); // Reset the offset to 0 when limit changes
  };

  const cambiarPagina = (operador) => {
    if (operador == "+") {
      setOffset(offset + limit);
    } else {
      setOffset(offset - limit);
    }
  };

  const goToFirstPage = () => {
    setOffset(0);
  };

  const goToLastPage = () => {
    const lastPageIndex = Math.ceil(cantidad / limit) - 1;
    setOffset(lastPageIndex * limit);
  };

  const totalPages = Math.ceil(cantidad / limit); // Calculate total pages

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      const isActive = (i - 1) * limit === offset;
      pageNumbers.push(
        <li key={i} className={`page-item ${isActive ? "active" : ""}`}>
          <a
            className={`page-link ${isActive ? "active-page" : ""}`}
            href="#"
            onClick={() => setOffset((i - 1) * limit)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <h2 className="listTitle">PRODUCTS MANAGEMENT</h2>
      <button>CREATE PRODUCT</button>

    
      {products && products.length === 0 && (
        <p>TODAVÍA NO HAY PRODUCTOS REGISTRADAS</p>
      )}

      {products && products.length > 0 && (
         <div className="listContainer">
         {products.map((order) => {
           return (
               <div className="listItem"   key={order._id}>
                <p className="title_p" >{order.name}</p>
                 <p>ID product: {order._id}</p>
                

                 <p>SKU: {order.sku}</p>

                 <p>Brand: {order.brand}</p>
                 <p>Category:{order.category}</p>
                 <p>Price: {order.price} €</p>
                 <p>STOCK: {order.stock} uds.</p>
                 <p>Description:</p>
                 <p>{order.description}</p>
                 

               </div>          
           )
         })}
         </div>
      )}

       {/* PAGINATION */}
       {cantidad && cantidad > limit && (
          <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled" onClick={goToFirstPage}>
              <a class="page-link" href="#" aria-label="Previous">
                <MdFirstPage /> {/* First Page Icon */}
              </a>
            </li>
            {offset > 0 && (
              <li class="page-item" onClick={() => cambiarPagina("-")}>
                <a class="page-link" href="#" aria-label="Previous">
                  <GrFormPrevious /> {/* Previous Page Icon */}
                </a>
              </li>
            )}
            {renderPageNumbers()}
            {offset < (cantidad - limit) && (
              <li class="page-item" onClick={() => cambiarPagina("+")}>
                <a class="page-link" href="#" aria-label="Next">
                  <GrFormNext /> {/* Next Page Icon */}
                </a>
              </li>
            )}
            <li class="page-item">
              <a class="page-link" href="#" onClick={goToLastPage} aria-label="Next">
                <MdLastPage /> {/* Last Page Icon */}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default GestionProductos;
