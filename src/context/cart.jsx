// ./src/context/cart.jsx
import { createContext,useReducer,useState } from "react";
import { Products } from "../components/Products";
import { cartReducer, cartInitialState } from '../reducers/cart.js'

//1.Crear contexto
export const CartContext= createContext()


function useCartReducer(){
    const [state,dispatch] = useReducer(cartReducer,cartInitialState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
      })
    
      const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
      })

      const removeOneItemFromCart = product => dispatch({
        type: 'REMOVE_ONE_ITEM_FROM_CART',
        payload: product
    })
    
      const clearCart = () => dispatch({ type: 'CLEAR_CART' })
    
      return { state, addToCart, removeFromCart, clearCart, removeOneItemFromCart }
}

//2.crear provider
export function CartProvider({children}){
    const { state, addToCart, removeFromCart, clearCart, removeOneItemFromCart } = useCartReducer()

    const [cart,setCart] =useState([])

   
//Cosas que queremos que se puedan acceder desde ese contexto
    return(
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            removeOneItemFromCart,
            clearCart 
        }}
        >
            {children}
        </CartContext.Provider>
    )
}


