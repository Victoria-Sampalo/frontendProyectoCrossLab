
// components/SinProduct.jsx
import { useState } from 'react'
import './SinProducts.css'

//resetFilters
export function SinProducts({resetFilters }){
    const handleResetFilters = () => {
        
        resetFilters(); // Llama a la función para reiniciar los filtros
    };

    

    return(
        <div className='sinproducts'>
            <h3>Resultado no encontrado</h3>
            <p>Búscalo con otro término</p>
            <button onClick={handleResetFilters}>LIMPIAR TODOS LOS FILTROS</button>
        </div>
    )
}