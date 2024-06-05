// ./src/context/cart.jsx
import { createContext,useReducer,useState } from "react";
import { Products } from "../components/Products";

//1.Crear contexto
export const CartContext= createContext()



//2.crear provider
export function CartProvider({children}){

    const [cart,setCart] =useState([])

    const addToCart= (product)=>{
        //check si el producto ya está
        const productInCartIndex=cart.findIndex(item=> item._id ===product._id)

        if(productInCartIndex >=0){
            //Hago un nuevo carrito, hace copias profundas de arrays y de los objetos
            const newCart=structuredClone(cart)
            newCart[productInCartIndex].quantity +=1
            return setCart(newCart)
        }

        //producto no está en el carrito
        setCart(prevState =>([
            ...prevState,
            {
                ...product,
                quantity:1
            }
        ]))
    }


    const removeFromCart = product =>{
        const productInCartIndex=cart.findIndex(item=> item._id ===product._id)
        console.log("dentro de remove ")
        if(productInCartIndex >=0){
            //Hago un nuevo carrito, hace copias profundas de arrays y de los objetos
            const newCart=structuredClone(cart)
            newCart.splice(productInCartIndex, 1)
            return setCart(newCart)
        }
    }

    const clearCart= ()=>{
        setCart([])
    }
//Cosas que queremos que se puedan acceder desde ese contexto
    return(
        <CartContext.Provider value={{

            cart, 
            addToCart,
            removeFromCart,
            clearCart 
        }}
        >
            {children}
        </CartContext.Provider>
    )
}


