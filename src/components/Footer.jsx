import './Footer.css'
import {useCart} from '../hooks/useCart'

export function Footer ({filters, usuario}) {
   //const { filters } = useFilters()
   const {cart} =useCart()

   console.log(JSON.stringify(cart))

  return (
    <footer className='footer'>
      {JSON.stringify(filters,null,2)}
      {JSON.stringify(usuario,null,2)}
      {/* {
        JSON.stringify(cart,null,2)
      } */}
      {/* <h4>Prueba técnica de React ⚛️ － <span>@midudev</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5> */}
    </footer>
  )
}
