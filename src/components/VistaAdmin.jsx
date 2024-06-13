// ./src/components/VistaAdmin.jsx
import React, { useState } from 'react';
import GestionProductos from './GestionProductos.jsx';
import GestionPedidos from './GestionPedidos.jsx';
import GestionUsuarios from './GestionUsuarios.jsx';
import '../styles/VistaAdmin.module.css';

const VistaAdmin = () => {
  const [currentView, setCurrentView] = useState('productos');

  const renderView = () => {
    switch (currentView) {
      case 'productos':
        return <GestionProductos />;
      case 'pedidos':
        return <GestionPedidos />;
      case 'usuarios':
        return <GestionUsuarios />;
      default:
        return <GestionProductos />;
    }
  };

  return (
    <div className="vista_admin_container">
      <h2>Dashboard Admin</h2>
      <div>
        <button onClick={() => setCurrentView('productos')}>PRODUCTS</button>
        <button onClick={() => setCurrentView('pedidos')}>ORDERS</button>
        <button onClick={() => setCurrentView('usuarios')}>USERS</button>
      </div>
      <div>
        {renderView()}
      </div>
    </div>
  );
};

export default VistaAdmin;
