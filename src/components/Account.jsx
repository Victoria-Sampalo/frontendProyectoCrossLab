import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LoggedContext } from '../context/LoggedProvider';
import VistaNormal from './VistaNormal';
import VistaAdmin from './VistaAdmin';

const Account = () => {
    const { logged } = useContext(LoggedContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (logged) {
            setIsLoading(false);
        }
    }, [logged]);

    if (isLoading) {
        return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se obtiene la información del usuario
    }

    if (!logged.estaLogueado) {
        return <Navigate to="/login" />; // Redirige al login si no está logueado
    }

    return (
        <div>
            <h1>ACCOUNT</h1>
            {logged.user.type === 'admin' ? <VistaAdmin /> : <VistaNormal />}
        </div>
    );
};

export default Account;
