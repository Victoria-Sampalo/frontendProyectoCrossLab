// ./src/components/VistaAdmin.jsx
import React, { useState } from 'react';
import GestionProductos from './GestionProductos.jsx';
import GestionPedidos from './GestionPedidos.jsx';
import GestionUsuarios from './GestionUsuarios.jsx';

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
    <div>
      <h1>Panel de Administración</h1>
      <div>
        <button onClick={() => setCurrentView('productos')}>Gestión de Productos</button>
        <button onClick={() => setCurrentView('pedidos')}>Gestión de Pedidos</button>
        <button onClick={() => setCurrentView('usuarios')}>Gestión de Usuarios</button>
      </div>
      <div>
        {renderView()}
      </div>
    </div>
  );
};

export default VistaAdmin;
