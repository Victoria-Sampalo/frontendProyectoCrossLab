import React, { useState } from "react";
import "./Filters.css";
import { SearchIcon } from "./Icons";
import { useNavigate } from "react-router-dom";

const FilterOrder = ({ cambiarFiltros }) => {
  const [filters, setFilters] = useState({
    _id: "",
    order_status: "",
    id_user: "",
    total_cost: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    let auxFilters = { ...filters };
    auxFilters[e.target.name] = e.target.value;
    setFilters(auxFilters);
  };

  const modificarFiltros = () => {
    // Remove null or empty string filters
    let validFilters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key]) {
        acc[key] = filters[key];
      }
      return acc;
    }, {});

    if (Object.values(validFilters).includes("")) {
      setMessage("No existen órdenes para tu búsqueda");
      cambiarFiltros({});
    } else {
      setMessage("");
      cambiarFiltros(validFilters);
    }
  };

  return (
    <section className="filters">
      <div>
        <input
          type="text"
          placeholder="Id de la orden..."
          value={filters._id}
          name="_id"
          onChange={handleChange}
        />
      </div>

      <div>
        <select
          value={filters.order_status}
          name="order_status"
          onChange={handleChange}
        >
          <option value="">Seleccione estado de la orden</option>
          <option value="activo">Activo</option>
          <option value="preparado">Preparado</option>
          <option value="pendiente de pago">Pendiente de pago</option>
          <option value="enviado">Enviado</option>
          <option value="completo">Completo</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          placeholder="Id del usuario..."
          value={filters.id_user}
          name="id_user"
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Costo total..."
          value={filters.total_cost}
          name="total_cost"
          onChange={handleChange}
        />
      </div>

      <button onClick={() => modificarFiltros()}>{SearchIcon()}</button>

      {message && <p>{message}</p>}
    </section>
  );
};

export default FilterOrder;
