// ./src/components/GestionPedidos.jsx
import React, { useEffect, useState } from 'react';
import { getAllOrdersAdmin } from '../lib/serviceOrders';
import { formatDateTime } from "../utils/utils";
import CrearPedido from './CrearPedido'; 


import '../styles/listStyles.css'; 


const GestionPedidos = () => {
  const [orders, setOrders] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para mostrar/ocultar el formulario de creación


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación
        const data = await getAllOrdersAdmin(token);
        setOrders(data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="listTitle">ORDERS MANAGEMENT</h2>
      {/* Botón para mostrar/ocultar el formulario de creación */}
      <button onClick={() => setShowCreateForm(!showCreateForm)}>CREATE ORDER</button>
      {/* Mostrar el formulario de creación si showCreateForm es true */}
      {showCreateForm && <CrearPedido />}
     
      <div className="listContainer">
      {orders.map((order) => {
        return (
            <div className="listItem"  onClick={()=>pedido(order)} key={order._id}>
              <p>Nº ORDER: {order._id}</p>
              <p>STATUS: {order.order_status}</p>
              <p>DATE: {formatDateTime(order.order_date)}</p>
              <p>{order.totalPrice} €</p>
            </div>          
        )
      })}
      </div>
    </div>
  );
};

export default GestionPedidos;
