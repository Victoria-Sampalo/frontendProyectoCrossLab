import React, { useEffect, useState } from "react";
import "../styles/listStyles.css";
import { useNavigate } from "react-router-dom";
import {
  tokenUser,
  getCountProductsAdminFilters,
  getAllProductsAdminLimitFilters,
  crearProducto, // Importa la función crearProducto si no está importada ya
} from "../lib/data";
import { useLogin } from "../hooks/useLogin";
import { obtenerToken } from "../lib/serviceToken";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdCancel, MdFirstPage, MdLastPage } from "react-icons/md";
import FilterProductAdmin from "./FilterProductAdmin";
import CrearProductoForm from "./CrearProductoForm";

const GestionProductos = () => {
  const { logged, logout } = useLogin();
  const [products, setProducts] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para mostrar/ocultar el formulario de creación
  const [offset, setOffset] = useState(0);
  const [cantidad, setCantidad] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    if (!logged.estaLogueado) navigate("/login");
    const cargarDatos = async () => {
      const token = obtenerToken();
      let esTokenValid = await tokenUser(token);
      if (esTokenValid.error) {
        logout();
      } else {
        const numeroRegistros = await getCountProductsAdminFilters(token, filtros);
        setCantidad(numeroRegistros.total);
        const productos = await getAllProductsAdminLimitFilters(token, limit, offset, filtros);
        setProducts(productos);
      }
    };
    cargarDatos();
  }, [logged, offset, limit, filtros]);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const cambiarFiltros = (f) => {
    setFiltros(f);
    setOffset(0); // Restablecer a la primera página al aplicar nuevos filtros
  };

  const cambiarPagina = (operador) => {
    if (operador === "+") {
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

  const totalPages = Math.ceil(cantidad / limit); // Calcular el número total de páginas

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
    <div className='product_container'>
      <h2 className="listTitle">GESTIÓN DE PRODUCTOS</h2>
      <button className="btn btn-primary" onClick={toggleCreateForm}>
        CREAR PRODUCTO
      </button>
      {/* Si showCreateForm es true, renderiza el formulario de creación */}
      {showCreateForm && <CrearProductoForm onClose={toggleCreateForm} />}

      <FilterProductAdmin cambiarFiltros={cambiarFiltros} />

      {products && products.length === 0 && (
        <p>TODAVÍA NO HAY PRODUCTOS REGISTRADOS</p>
      )}

      {products && products.length > 0 && (
        <div className="listContainer">
          {products.map((product) => (
            <div className="listItem" key={product._id}>
              <div>
                <p className="title_p">{product.name}</p>
                <p>ID producto: {product._id}</p>
                <p>SKU: {product.sku}</p>
                <p>Marca: {product.brand}</p>
                <p>Categoría: {product.category}</p>
                <p>Precio: {product.price} €</p>
                <p>STOCK: {product.stock} uds.</p>
                <p>Descripción:</p>
                <p className="description-product">{product.description}</p>
              </div>
              <div className="imageContainer">
                <img src={product.images[0]} alt={product.sku} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINACIÓN */}
      {cantidad && cantidad > limit && (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item" onClick={goToFirstPage}>
              <a className="page-link" href="#" aria-label="Previous">
                <MdFirstPage /> {/* Icono de primera página */}
              </a>
            </li>
            {offset > 0 && (
              <li className="page-item" onClick={() => cambiarPagina("-")}>
                <a className="page-link" href="#" aria-label="Previous">
                  <GrFormPrevious /> {/* Icono de página anterior */}
                </a>
              </li>
            )}
            {renderPageNumbers()}
            {offset < cantidad - limit && (
              <li className="page-item" onClick={() => cambiarPagina("+")}>
                <a className="page-link" href="#" aria-label="Next">
                  <GrFormNext /> {/* Icono de página siguiente */}
                </a>
              </li>
            )}
            <li className="page-item" onClick={goToLastPage}>
              <a className="page-link" href="#" aria-label="Next">
                <MdLastPage /> {/* Icono de última página */}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default GestionProductos;
