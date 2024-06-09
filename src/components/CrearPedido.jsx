import React, { useState } from 'react';
import { obtenerToken } from "../lib/serviceToken";
import {crearPedidoAdmin} from '../lib/serviceOrders';
import styles from "../styles/Login.module.css";
import { textErrors } from "../lib/textErrors";
import {
    validText,
    validEmpresa,
  } from "../lib/valid";

const CrearPedido = () => {
  const [datos, setDatos] = useState({
    id_user: '', // Puedes obtener el ID del usuario de la sesión o de otra manera
    total_cost: '',
    order_date: '',
    list_products: [],
    order_status: '',
    shipping_address: '',
    payment_method: '',
    shipping_date: '',
    delivery_date: ''
  });
  const [errores, setErrores] = useState({
        id_user: null, // Puedes obtener el ID del usuario de la sesión o de otra manera
    total_cost: null,
    order_date: null,
    list_products: [],
    order_status: null,
    shipping_address: null,
    payment_method: null,
    shipping_date: null,
    delivery_date: null
  });

  const handleChange = (e) => {
    let auxErrores = { ...errores };
    let auxDatos = { ...datos };
    auxErrores["mensajeError"] = null;
    let valido = false;

    
    // if (e.target.name === "development") valido = validEmpresa(e.target.value, 1, 50);
    // if (e.target.name === "company") valido = validEmpresa(e.target.value, 1, 50);
    // if (e.target.name === "concept") valido = validText(e.target.value, 1, 200, false);

    auxDatos[e.target.name] = e.target.value;
    setDatos(auxDatos);

    if (!valido) {
      auxErrores[e.target.name] = textErrors(e.target.name);
    } else {
      auxErrores[e.target.name] = null;
    }
    setErrores(auxErrores);
  };


  const crearpedido = async () => {
    let valido = true;
    let auxErrores = { ...errores };
    for (const key in datos) {
      if (datos[key] == null) {
        auxErrores[key] = textErrors("vacio");
        setErrores(auxErrores);
        valido = false;
      }
    }

    if (valido) {
      console.log("--------------------------------------");
      console.log(datos);
      const token = obtenerToken();
      
      // Llama a la función createInvoice con los datos de la factura
      const nuevoPedido = await crearPedidoAdmin(token, datos);
      console.log("Pedido creado: ", nuevoPedido);

      if (nuevoPedido.error) {
        auxErrores["mensajeError"] = nuevoPedido.message;
        setErrores(auxErrores);
      } else {
        setMensaje("Pedido creado con éxito.");
        setTimeout(() => navigate("/"), 2000); // Redirige después de 2 segundos
      }
    }
  };

  

  return (
    <div className={styles.cajaForm}>
      <h2>CREATE ORDER</h2>
     
        <div className={styles.cajaInputs}>
          <label htmlFor="id_user">User ID</label>
          <input
            type="text"
            id="id_user"
            name="id_user"
            value={datos.id_user}
            onChange={handleChange}
          />
          {/* Mensaje de error si corresponde */}
        </div>
        <div className={styles.cajaInputs}>
          <label htmlFor="total_cost">Total Cost</label>
          <input
            type="number"
            id="total_cost"
            name="total_cost"
            value={datos.total_cost}
            onChange={handleChange}
          />
          {/* Mensaje de error si corresponde */}
        </div>
        {/* Otros campos del formulario... */}
        <button onClick={crearpedido}>CREATE ORDER</button>
    </div>
  );
};

export default CrearPedido;
