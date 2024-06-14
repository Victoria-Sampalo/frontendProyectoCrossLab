import React, { useState } from 'react';
import { updateOrder } from '../lib/serviceOrders';
import { obtenerToken } from '../lib/serviceToken';

const EditarPedido = ({ order, onClose }) => {
  const [orderStatus, setOrderStatus] = useState(order.order_status);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = obtenerToken();
      if (!token) {
        throw new Error('No se ha podido obtener el token');
      }

      // Limpiar el estado de la orden (eliminar espacios en blanco al inicio y al final)
      const cleanedOrderStatus = orderStatus.trim();
       console.log('Cleaned Order Status:', cleanedOrderStatus); // Agrega este console.log para verificar el valor

      // Verificar que el estado limpio esté en el enum permitido
      const allowedStatus = ['activo', 'preparado', 'pendiente de pago', 'enviado', 'completo'];
      if (!allowedStatus.includes(cleanedOrderStatus)) {
        throw new Error('Estado de orden inválido');
      }

      // Realizar la solicitud de actualización
      const updatedOrder = await updateOrder( token, order._id, cleanedOrderStatus);
      setMessage('Orden actualizada correctamente');
      onClose(); // Cerrar el formulario o modal de edición
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      setMessage('Error al actualizar la orden');
    }
  };

  return (
    <div className="edit-order-container">
      <h2>Editar Orden</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Estado de la Orden:</label>
          <select
            value={orderStatus}
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="preparado">Preparado</option>
            <option value="pendiente de pago">Pendiente de pago</option>
            <option value="enviado">Enviado</option>
            <option value="completo">Completo</option>
          </select>
        </div>
        <button type="submit">Actualizar Orden</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditarPedido;
