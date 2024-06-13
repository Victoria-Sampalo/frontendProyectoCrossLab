import React, { useState, useEffect } from "react";
import { crearProducto } from "../lib/data";
import { allCategories } from '../services/api';
import { obtenerToken } from "../lib/serviceToken";
import styles from "../styles/Login.module.css";
import '../styles/formStyles.css';
const CrearProductoForm = ({ onClose }) => {
  const [datosProducto, setDatosProducto] = useState({
    name: "",
    price: 0,
    brand: "",
    category: "",
    description: "",
    images: [],
    stock: 0,
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const token = obtenerToken();
      const devs = await allCategories();

     // console.log(devs.data)
     
      setCategories(devs.data);

    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosProducto({
      ...datosProducto,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setDatosProducto({
      ...datosProducto,
      images: urls,
    });
  };

  const handleCrearProducto = async (e) => {
    e.preventDefault();
    const token = obtenerToken();
    const respuesta = await crearProducto(token, datosProducto);

    if (!respuesta.error) {
      console.log("Producto creado exitosamente:", respuesta);
      onClose(); // Cerrar el formulario después de crear el producto
    } else {
      console.error("Error al crear el producto:", respuesta.message);
      // Manejar el error según sea necesario
    }
  };

  return (
    <div className="formContainer">
      <div>
         <h3>Crear Nuevo Producto</h3>
      <button className="btnClose" onClick={onClose}>
        X
      </button>
      </div>

    
      <form onSubmit={handleCrearProducto}>
      <div className='primera-columna'>

 <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={datosProducto.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="price">price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={datosProducto.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="brand">brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={datosProducto.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={datosProducto.stock}
            onChange={handleChange}
            required
          />
        </div>
</div>
<div className='segunda-columna'>

        <div className="inputGroup">
          <label htmlFor="category">Categoría</label>
          <select
          value={datosProducto.category}
          id='category'
          name='category'
          onChange={handleChange}
          required>
            <option value=''>Select category</option>
            {categories.map((dev)=>(
              <option key={dev} value={dev}> {dev}</option>
            ))}

          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="images">Imágenes</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            required
          />
          <div className="preview-images">
            {datosProducto.images.map((url, index) => (
              <img key={index} src={url} alt={`Imagen ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={datosProducto.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Crear Producto
        </button>


</div>
       
        
        
      </form>
    </div>
  );
};

export default CrearProductoForm;
