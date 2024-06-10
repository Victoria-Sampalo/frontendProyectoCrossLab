import './Products.css'
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';
import { useImageExists } from '../hooks/useImageExists.js'; 

export function Products({ products }) {
    const {addToCart, removeFromCart, cart} = useCart();
    const navigate = useNavigate();

    const checkProductInCart = (product) => {
        return cart.some(item => item._id === product._id);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <main className='products'>
            <ul>
                {products.map(p => {
                    const isProductInCart = checkProductInCart(p);
                    const categoryImageJpgUrl = `/images/${p.category}.jpg`;
                    const categoryImageWebpUrl = `/images/${p.category}.webp`;

                    const imageJpgExists = useImageExists(categoryImageJpgUrl);
                    const imageWebpExists = useImageExists(categoryImageWebpUrl);

                    const imageUrl = imageJpgExists 
                        ? categoryImageJpgUrl 
                        : (imageWebpExists 
                            ? categoryImageWebpUrl 
                            : p.images[0]);

                    return (
                        <li key={p._id}>
                            <img
                                src={imageUrl}
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
                                <p>{p.category}</p>
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

Products.propTypes = {
    products: PropTypes.array.isRequired 
};
