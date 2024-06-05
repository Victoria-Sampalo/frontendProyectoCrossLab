import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productId } from '../lib/data';
import { useCart } from '../hooks/useCart';

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
        
        <div>
            <div>
              <button onClick={goBack}>VOLVER</button>
            </div>
          <picture>
           <img src={product.images[0]} alt={`${product.sku}`} 
           style={{ 
            width: '300px', 
            height: '300px', 
            objectFit: 'cover' 
          }} />
          </picture>
          <div>
            <div>
              <div>
                <p>Name</p>
                <p>{product.name}</p>
              </div>
              <div>
                <p>SKU</p>
                <p>{product.sku}</p>
              </div>
              <div>
                <p>Category</p>
                <p>{product.category}</p>
              </div>
              <div>
                <p>Price</p>
                <p>{product.price}</p>
              </div>
            </div>
            <div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
            <div>
              <p>Brand</p>
              <p>{product.brand}</p>
            </div>
            <div>
              <button onClick={handleAddToCart}>
                AÑADIR AL CARRITO POR: {(product.price * quantity).toFixed(2)} €
              </button>
              <div>
                <button onClick={increaseQuantity}>+</button>
                <p>{quantity}</p>
                <button onClick={decreaseQuantity}>-</button>
              </div>
            </div>
            <div>
              <button onClick={goBack}>VOLVER</button>
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
