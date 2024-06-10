// ./src/components/GestionProductos.jsx
import React, { useEffect, useState } from 'react';
import '../styles/listStyles.css'; 
import { useNavigate } from "react-router-dom";


const GestionProductos = () => {
  const [orders, setproducts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para mostrar/ocultar el formulario de creación
  const [offset, setOffset] = useState(0); //offset
  const [cantidad, setCantidad] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación
        const data=null;
        setproducts(data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchData();
  }, []);

  const cambiarPagina = (operador) => {
    if (operador == "+") {
      setOffset(offset + limit);
    } else {
      setOffset(offset - limit);
    }
  };




  return (
    <div>
      <h2 className="listTitle">PRODUCTS MANAGEMENT</h2>
      
    </div>
  );
};

export default GestionProductos;
