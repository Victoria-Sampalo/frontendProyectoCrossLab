import React from 'react';
import { useLogin } from '../hooks/useLogin';
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import {  Link, useNavigate } from 'react-router-dom';


function Header() {
  const {logged, cambiarLogged, logout}=useLogin()
  // Inicializar el hook de navegación
  const navigate = useNavigate();
 console.log("En header "+ JSON.stringify(logged))
 const icono = ()=>{
  if(logged.estaLogueado){
    return <button onClick={()=>logout()}>CERRAR SESIÓN</button> 
    //<FaUserCircle onClick={()=>logout()}/>
  }else{
    return <Link to="/login"><FaRegUserCircle /></Link>
    
  }
 }

  return (
    <header style={headerStyle}>
      <h1>C</h1>
      <nav>
        <ul style={navStyle}>
          <li><a href="/">HOME</a></li>
          <li><a href="/about">ABOUT</a></li>
          <li>{icono()}</li>
        </ul>
      </nav>
    </header>
  );
}

// Estilos para el encabezado y la navegación
const headerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px 0',
  textAlign: 'center',
};

const navStyle = {
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
};

export default Header;
