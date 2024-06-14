import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productId } from '../lib/data';
import { useCart } from '../hooks/useCart';
import { useImageExists } from '../hooks/useImageExists.js'; 

import '../styles/DetalleProducto.css';
import { FaArrowLeft } from "react-icons/fa";

const DetalleProducto = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addToCart, products } = useCart();
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const respuesta = await productId(id);
      if (respuesta.error) {
        navigate('/notfound');
      } else {
        setProduct(respuesta);
      }

      if (products) {
        const selectedProduct = products.find(x => x._id === id);
        if (selectedProduct) {
          setQuantity(selectedProduct.quantity || 0);
        }
      }
    };

    fetchData();
  }, [id, navigate, products]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(0, quantity - 1));
  const goBack = () => navigate('/');

  return (
    <>
      {product ? (
        
        <div className='detalleproducto-container'>
            <div className='btn-volver'>
              <button onClick={goBack}> <FaArrowLeft /> VOLVER</button>
           </div>
           
           <div className='contenedor-producto'>

           <picture>
           <img src={product.images[0]} alt={`${product.sku}`} title={`${product.name}`} 
           />
          </picture>
            
            <div className='contenedor-info-producto'>
              <div>
              <h2>{product.name}</h2>
              <div>
                
                <h3>{product.price} €</h3>
                <span className='btn-span'>{product.category}</span>
                <p>{product.brand}</p>
                <p>{product.description}</p>
              </div>
              </div>
             
             
              <div className='contenedor-mandos'>
                <button onClick={increaseQuantity}>+</button>
                <p>{quantity} Uds</p>
                <button onClick={decreaseQuantity}>-</button>
              </div>

              <button onClick={handleAddToCart}>
                AÑADIR AL CARRITO POR: {(product.price * quantity).toFixed(2)} €
              </button>
           
              
            </div>
          </div>
        </div>
      ) : (
        <p>Troubles to upload product selected</p>
      )}
    </>
  );
};

export default DetalleProducto;
