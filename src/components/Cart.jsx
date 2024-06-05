import React, { useState, useEffect, useId } from 'react';
import {ClearCartIcon, CartIcon, RemoveFromCartIcon} from './Icons'

import './Cart.css'
import { useCart } from '../hooks/useCart'


function CartItem( {images, price, name, quantity, addToCart, removeFromCart, clearCart, removeOneItemFromCart}){
    
   
    
    return(
        <>
        <li>
        {/* <img src={images[0]} 
        alt={title}/> */}
        <div>
            <strong>{name}</strong>- {price}€
        </div>
        <footer>
            <small>
                Qty: {quantity}</small>
            <button onClick={addToCart}>+</button>
            <button onClick={removeFromCart}>-</button>

            <button onClick={removeOneItemFromCart}><RemoveFromCartIcon/></button>
           
        </footer>
        <div>
           <small>
                Precio: {quantity*price} €</small>
           </div>
    </li>
   
        </>
        
    )
}

export function Cart(){
    const cartCheckboxId=useId()
    const {cart, clearCart, addToCart, removeFromCart, removeOneItemFromCart} = useCart()
    const [totalPrice, setTotalPrice] = useState(0);

    // Calcular el precio total del carrito
    useEffect(() => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    }, [cart]);

    return (
        <>
        <label className='cart-button' htmlFor={cartCheckboxId}>
            <CartIcon></CartIcon>
        </label>
        <input id={cartCheckboxId} type='checkbox' hidden/>

        <aside className='cart'>
            <h3>Carrito</h3>
            <ul>
                {cart.map((p)=> (
                    
                    <CartItem key={p.sku}
                    addToCart={()=>addToCart(p) } 
                    removeFromCart={()=>removeFromCart(p)}
                    removeOneItemFromCart={()=>removeOneItemFromCart(p)}
                    {...p}
                    />
                   
                   
                ))}
               
            </ul>
              <div>
                    <strong>Total: {totalPrice} €</strong>
                </div>
            <button onClick={clearCart}>
                <ClearCartIcon />
            </button>

        </aside>
        </>
    )
}