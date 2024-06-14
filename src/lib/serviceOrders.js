// .src/lib.serviceOrders.js

const uri="https://back-mongoose.onrender.com/api";

// const uri = "http://localhost:1000/api";
import { obtenerToken } from './serviceToken';


export const getAllOrdersNormal = async (token, id) => {
  const datos = {
    id_user: id,
  };

  console.log("id en service orders" + id);

  const url = `${uri}/getuserorders`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

export const getAllOrdersAdmin = async (token) => {
  const url = `${uri}/orders`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};

export const crearPedidoAdmin = async (token, datosPedido) => {
  try {
    const url = `${uri}/createorder`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datosPedido),
    });
    if (response.status == 409)
      return { error: true, message: "Token no valido" };

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw new Error("Error al crear el pedido");
  }
};

export const crearPedidoNormal = async (token, datosPedido) => {
  const today = new Date().toISOString().split("T")[0];
  const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const pedido = {
    id_user: datosPedido.id_user,
    shipping_address: datosPedido.shipping_address,
    payment_method: datosPedido.payment_method,
    shipping_date: datosPedido.shipping_date || today,
    delivery_date: datosPedido.delivery_date || deliveryDate,
    order_status: datosPedido.order_status || "activo",
    list_products: datosPedido.list_products,
    total_cost: datosPedido.total_cost,
  };

  console.log(JSON.stringify(pedido));

  const url = `${uri}/createorder`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pedido),
    });

    if (response.status === 409) {
      return { error: true, message: "Token no válido" };
    }

    const data = await response.json();
    if (data.error) {
      return data;
    }

    return data.data;
  } catch (error) {
    return { error: true, message: "Error al crear el pedido." };
  }
};

export const getCountOrdersAdminFilter = async (token, filtros) => {
  const datos = {
    id: filtros._id,
    order_status: filtros.order_status,
    id_user: filtros.id_user,
    total_cost: filtros.total_cost,
  };

  const url = `${uri}/countordersadminfilter`;

  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    });

    if (response.status == 409) {
      return { error: true, message: "Token no válido" };
    }
    
    const data = await response.json();
    return data.data;

    
 
};

export const getAllOrdersAdminLimitFilters = async (
  token,
  limit,
  offset,
  filtros
) => {
  const datos = {
    limit,
    offset,
    id: filtros._id,
    order_status: filtros.order_status,
    id_user: filtros.id_user,
    total_cost: filtros.total_cost,
  };

  const url = `${uri}/ordersadminlimitfilter`;

  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    });

    if (response.status == 409)
      return { error: true, message: "Token no valido" };
    const data = await response.json();
    return data.data;
};



export const updateOrder = async (token, orderId, orderStatus) => {
  // Obtener el token de autenticación
  const url = `${uri}/updateorder`; // URL del endpoint en tu servidor

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Incluir el token de autenticación si es necesario
      },
      body: JSON.stringify({
        orderId: orderId,
        order_status: orderStatus
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al actualizar la orden');
    }

    const updatedOrder = await response.json();
    return updatedOrder; // Devuelve el objeto de la orden actualizada
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
