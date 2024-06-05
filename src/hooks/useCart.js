// ./src/hooks/useCart.js
import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
    const context = useContext(CartContext);
    //console.log(context)

    if (context === undefined) {
        throw new Error('useCart debe ser usado en CartProvider, este es undefined');
    }

    return context;
}