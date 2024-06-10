import React, { useContext, useEffect, useState } from "react";
import { LoggedContext } from "../context/LoggedProvider";
import { getAllOrdersNormal } from "../lib/serviceOrders";
import { formatDateTime } from "../utils/utils";
import "../styles/listStyles.css";

const VistaNormal = () => {
  const { logged } = useContext(LoggedContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtén el token de almacenamiento local
        const id = logged.user._id;
        console.log("logged id en vistaNormal " + id + " antes de la llamada");
        const userOrders = await getAllOrdersNormal(token, id);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    if (logged.user._id) {
      fetchOrders();
    }
  }, [logged]);

  return (
    <div>
      <h2 className="listTitle">Detalle del Usuario</h2>
      <div className="listContainer">
        <ul className="listItem" >
        <li>Nombre de usuario: {logged.user.user_name}</li>
        <li>Id: {logged.user._id}</li>
        <li>Email: {logged.user.email}</li>
        <li>Nombre completo: {logged.user.full_name}</li>
        <li>Dirección: {logged.user.billing_address}</li>
        <li>País: {logged.user.country}</li>
        <li>Teléfono: {logged.user.phone}</li>
        <li>
          Fecha de nacimiento:{" "}
          {new Date(logged.user.date_of_birth).toLocaleDateString()}
        </li>
        <li>
          Fecha de registro:{" "}
          {new Date(logged.user.registration_date).toLocaleDateString()}
        </li>
      </ul>
      </div>
     
      <h2 className="listTitle">Historial de Pedidos</h2>
      <p>Total de pedidos: {orders.length}</p>
      <div className="listContainer">
        {orders.length > 0 ? (
          orders.map((order) => {
            return (
              <div className="listItem" key={order._id}>
                <ul>
                <li>Id Order: {order._id}</li>
                <li>Shipping date: {formatDateTime(order.shipping_date)}</li>
                <li>Status: {order.order_status}</li>
                <li>Total amount: {order.total_cost} €</li>
              </ul>
              </div>
              
            );
          })
        ) : (
          <p>No se encontraron pedidos</p>
        )}
      </div>
    </div>
  );
};

export default VistaNormal;
