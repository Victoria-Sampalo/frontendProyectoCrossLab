import React from 'react';
import { useLogin } from '../hooks/useLogin';
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logoCrossLab.svg'; // Ajusta la ruta según tu estructura de carpetas


function Header() {
  const { logged, cambiarLogged, logout } = useLogin();
  const navigate = useNavigate();

  const icono = () => {
    if (logged.estaLogueado) {
      return <button onClick={() => logout()}>LOGOUT</button>;
    } else {
      return <Link to="/login"><FaRegUserCircle /></Link>;
    }
  };

  return (
    <header>
        <Link to="/">
        <img src={logo} alt="Logo CrossLab" style={{ width: '100px', height: '100px' }} />
        </Link>
      <nav>
        <ul>
          <li><a href="/">HOME | </a></li>
          {/* <li><a href="/about"> ABOUT |</a></li> */}
          {logged.estaLogueado && <li><Link to="/account">ACCOUNT</Link></li>}
          <li>{icono()}</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
