import './Products.css'
import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { useNavigate } from 'react-router-dom';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js';

//aqui tengo que hacer el boton de filtro
export function Products ({products}){
    const {addToCart, removeFromCart, cart} =useCart()
    const navigate = useNavigate();

    const checkProductInCart =(product) =>{
     // console.log("producto" + JSON.stringify(product))

        return cart.some(item=>item._id==product._id)
    }
    const handleProductClick = (productId) => {
      navigate(`/product/${productId}`);
    }
    // console.log(products)
   return (
    <main className='products'>
    <ul>
      {products.map(p => {
        const isProductInCart = checkProductInCart(p);

        return (
          <li key={p._id}>
            <img
              src={p.images[0]}
              alt={p.sku}
              onClick={() => handleProductClick(p._id)}
              style={{ cursor: 'pointer' }}
            />
            <div>
              <strong onClick={() => handleProductClick(p._id)} style={{ cursor: 'pointer' }}>
                {p.name}
              </strong> - {p.price}€
            </div>
            <div>
              <button
                style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                onClick={() => {
                  isProductInCart
                    ? removeFromCart(p)
                    : addToCart(p)
                }}
              >
                {
                  isProductInCart
                    ? <RemoveFromCartIcon />
                    : <AddToCartIcon />
                }
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  </main>
   )


}

// Define la validación de props utilizando PropTypes
// Products.propTypes = {
//     products: PropTypes.array.isRequired // La prop 'products' debe ser un array y es requerida
//   };