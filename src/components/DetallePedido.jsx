// ./src/components/DetallePedido.jsx
import React from 'react';
import { formatDateTime } from "../utils/utils";

import '../styles/DetallePedido.css'

const DetallePedido = ({ order, onClose }) => {
  return (
    <div className="detallePedido_contenedor">
      <button onClick={onClose}>Cerrar</button>
      <h3>Detalle del Pedido</h3>
      <p><strong>ID Pedido:</strong> {order._id}</p>
      <p><strong>ID Usuario:</strong> {order.id_user}</p>
      <p><strong>Estado:</strong> {order.order_status}</p>
      <p><strong>Costo Total:</strong> {order.total_cost} €</p>
      <p><strong>Fecha de Pedido:</strong> {formatDateTime(order.order_date)}</p>
      <p><strong>Dirección de Envío:</strong> {order.shipping_address}</p>
      <p><strong>Método de Pago:</strong> {order.payment_method}</p>
      <p><strong>Fecha de Envío:</strong> {formatDateTime(order.shipping_date)}</p>
      <p><strong>Fecha de Entrega:</strong> {formatDateTime(order.delivery_date)}</p>
      <h4>Productos en el Pedido:</h4>
      <ul>
        {order.list_products.map((product) => (
          <li key={product._id}>
            <p><strong>ID Producto:</strong> {product.productId}</p>
            <p><strong>Cantidad:</strong> {product.quantity}</p>
            <p><strong>Precio:</strong> {product.price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetallePedido;
