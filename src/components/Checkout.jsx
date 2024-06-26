// ./src/components/Checkout.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/formStyles.css'; 
import { useCart } from '../hooks/useCart';
import { crearPedidoNormal } from '../lib/serviceOrders';
import { LoggedContext } from '../context/LoggedProvider';

const Checkout = () => {
    const { cart, clearCart, addToCart, removeFromCart, removeOneItemFromCart } = useCart();
    const { logged } = useContext(LoggedContext);

    const [mensaje, setMensaje] = useState(null);
    const [datos, setDatos] = useState({
        id_user: logged.user._id,
        shipping_address: logged.user.billing_address,
        payment_method: ''
    });
    const [tarjetaDatos, setTarjetaDatos] = useState({
        credit_card_number: '',
        credit_card_expiry: '',
        credit_card_cvc: ''
    });
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!logged.estaLogueado) navigate('/login');
        if (cart.length < 1) navigate('/');
    }, [logged, cart, navigate]);

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    
    const handleTarjetaChange = (e) => {
        setTarjetaDatos({ ...tarjetaDatos, [e.target.name]: e.target.value });
    };

    const handleCheckout = async () => {
        let valido = true;
        let auxErrores = {};

        for (const key in datos) {
            if (datos[key] === '' && key !== 'order_status') {
                auxErrores[key] = "Este campo es obligatorio";
                valido = false;
            }
        }

          // Validación específica para tarjeta de crédito
          if (datos.payment_method === 'tarjeta-credito') {
            for (const key in tarjetaDatos) {
                if (tarjetaDatos[key] === '') {
                    auxErrores[key] = "Este campo es obligatorio";
                    valido = false;
                }
            }
        }

        if (valido) {
            const token = localStorage.getItem('token');
            const list_cart = cart.map(item => ({
                productId: item.sku,
                quantity: item.quantity,
                price: item.price
            }));

            const total_cost = list_cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
            const orderData = {
                ...datos,
                list_products: list_cart,
                total_cost,
            };


            console.log(orderData);

            const response = await crearPedidoNormal(token, orderData);

            if (response.error) {
                auxErrores["mensajeError"] = response.message;
                setErrores(auxErrores);
            } else {
                setMensaje("Pedido realizado con éxito.");
                clearCart();
                setTimeout(() => navigate('/'), 2000); // Redirige después de 2 segundos
            }
        }

        setErrores(auxErrores);
    };

    return (
        <div className="formContainer">
            <h2 className="formTitle">Checkout</h2>
       
            <h3 className="formTitle">Carrito Actual</h3>
            <ul>
                {cart.map((p) => (
                    <li key={p.sku}>
                        <div>
                            <strong>{p.name}</strong> - {p.price}€
                        </div>
                        <footer>
                            <small>Qty: {p.quantity}</small>
                            <button onClick={() => addToCart(p)}>+</button>
                            <button onClick={() => removeFromCart(p)}>-</button>
                            <button onClick={() => removeOneItemFromCart(p)}>Quitar</button>
                        </footer>
                        <div>
                            <small>Precio: {p.quantity * p.price} €</small>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="inputGroup">
                <strong>Total: {cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)} €</strong>
            </div>
            <div className="inputGroup">
                <label htmlFor="shipping_address">Dirección de Envío</label>
                <input
                    type="text"
                    id="shipping_address"
                    name="shipping_address"
                    onChange={handleChange}
                    value={datos.shipping_address}
                />
                <span className="errorMessage">{errores.shipping_address}</span>
            </div>
            <div className="inputGroup">
                <label htmlFor="payment_method">Método de Pago</label>
                <select
                    id="payment_method"
                    name="payment_method"
                    onChange={handleChange}
                    value={datos.payment_method}
                >
                    <option value="">Seleccione un método de pago</option>
                    <option value="tarjeta-credito">Tarjeta de crédito</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="contrareembolso">Contrareembolso</option>
                </select>
                <span className="errorMessage">{errores.payment_method}</span>
            </div>
            
            {datos.payment_method === 'tarjeta-credito' && (
                <div>
                    <div className="inputGroup">
                        <label htmlFor="credit_card_number">Número de Tarjeta</label>
                        <input
                            type="text"
                            id="credit_card_number"
                            name="credit_card_number"
                            onChange={handleTarjetaChange}
                            value={tarjetaDatos.credit_card_number}
                        />
                        <span className="errorMessage">{errores.credit_card_number}</span>
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="credit_card_expiry">Fecha de Expiración</label>
                        <input
                            type="text"
                            id="credit_card_expiry"
                            name="credit_card_expiry"
                            onChange={handleTarjetaChange}
                            value={tarjetaDatos.credit_card_expiry}
                        />
                        <span className="errorMessage">{errores.credit_card_expiry}</span>
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="credit_card_cvc">CVC</label>
                        <input
                            type="text"
                            id="credit_card_cvc"
                            name="credit_card_cvc"
                            onChange={handleTarjetaChange}
                            value={tarjetaDatos.credit_card_cvc}
                        />
                        <span className="errorMessage">{errores.credit_card_cvc}</span>
                    </div>
                </div>
            )}

            {datos.payment_method === 'transferencia' && (
                <div>
                    <p>Su pedido estará en pendiente de pago hasta no recibir la transferencia, deberá enviarnos un correo electrónico a info@crosslab.com con la confirmación de transferencia para proceder. Por favor, realice una transferencia a la siguiente cuenta bancaria:  </p>
                    
                    <p>Banco: XYZ</p>
                    <p>IBAN: ES00 0000 0000 0000 0000</p>
                    <p>SWIFT: XYZABC</p>
                      </div>
            )}

            {datos.payment_method === 'contrareembolso' && (
                <p>El pedido será pagado al repartidor con efectivo. Por favor, tenga el importe exacto.</p>
            )}

            <p>Los envíos se realizan en un periodo de 7 a 10 días hábiles.</p>
            <button onClick={handleCheckout}>Realizar Pedido</button>
            {mensaje && <p>{mensaje}</p>}
            <span className="errorMessage">{errores.mensajeError}</span>
        </div>
    );
};

export default Checkout;
