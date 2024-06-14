import React, { useEffect, useState } from 'react';
import { getCountOrdersAdminFilter, getAllOrdersAdminLimitFilters, updateOrder } from '../lib/serviceOrders';
import { formatDateTime } from "../utils/utils";
import { tokenUser } from "../lib/data";
import CrearPedido from './CrearPedido';
import { useNavigate } from "react-router-dom";
import '../styles/listStyles.css';
import { useLogin } from "../hooks/useLogin";
import { obtenerToken } from "../lib/serviceToken";
import FilterOrder from './FilterOrder';
import DetallePedido from './DetallePedido';
import EditarPedido from './EditarPedido.jsx';  // Importar el nuevo componente
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdCancel, MdFirstPage, MdLastPage } from "react-icons/md";

const GestionPedidos = () => {
  const { logged, logout } = useLogin();
  const [orders, setOrders] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [offset, setOffset] = useState(0);
  const [cantidad, setCantidad] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged.estaLogueado) navigate("/login");
    const cargarDatos = async () => {
      const token = obtenerToken();
      let esTokenValid = await tokenUser(token);
      if (esTokenValid.error) {
        logout();
      } else {
        const numeroRegistros = await getCountOrdersAdminFilter(token, filtros);
        if (numeroRegistros.error) {
          console.error(numeroRegistros.message);
        } else {
          setCantidad(numeroRegistros.total);
          // console.log(numeroRegistros);
        }

        const ordenes = await getAllOrdersAdminLimitFilters(token, limit, offset, filtros);
        // console.log(ordenes); // Asegúrate de que `ordenes` tiene los datos correctos
        if (ordenes.error) {
          console.error(ordenes.message);
        } else {
          setOrders(ordenes);
        } 
      }
    };
    cargarDatos();
  }, [logged, offset, limit, filtros]);

  const cambiarFiltros = (f) => {
    setFiltros(f);
    setOffset(0);
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

  const totalPages = Math.ceil(cantidad / limit);

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

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
    setShowEdit(false);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setShowDetail(false);
    setShowEdit(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedOrder(null);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setSelectedOrder(null);
  };

  return (
    <div className='orders_container'>
      <h2 className="listTitle">ORDERS MANAGEMENT</h2>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>CREATE ORDER</button>
      {showCreateForm && <CrearPedido />}
      <FilterOrder cambiarFiltros={cambiarFiltros} />

      <div className="listContainer">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id}>
              <div className="listItem list_orders" onClick={() => handleOrderClick(order)}>
                <p><strong>Nº ORDER:</strong> {order._id}</p>
                <p><strong>STATUS:</strong> {order.order_status}</p>
                <p><strong>DATE:</strong> {formatDateTime(order.order_date)}</p>
                <p><strong>TOTAL PRICE:{order.total_cost} €</strong></p>
                <FaEdit onClick={(e) => {e.stopPropagation(); handleEditClick(order);}} /> {/* Añadir icono de edición */}
              </div>
              {showDetail && selectedOrder === order && (
                <DetallePedido order={selectedOrder} onClose={closeDetail} />
              )}
              {showEdit && selectedOrder === order && (
                <EditarPedido order={selectedOrder} onClose={closeEdit} />
              )}
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>

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

export default GestionPedidos;
