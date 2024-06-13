import React, { useState, useEffect } from "react";
import { allCategories } from "../services/api";
import "./Filters.css";
import { SearchIcon } from "./Icons";
import { obtenerToken } from "../lib/serviceToken.js";
import { useNavigate } from "react-router-dom";

const FilterProductAdmin = ({ cambiarFiltros }) => {
  const [filters, setFilters] = useState({
    _id: null,
    name: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

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
    let auxFilters = { ...filters };
    auxFilters[e.target.name] = e.target.value;
    setFilters(auxFilters);
  };
  const modificarFiltros = () => {
    console.log(Object.values(filters));
    if (Object.values(filters).includes("i")) {
      console.log("pasa");
      setMessage("No existen productos para tu búsqueda");
      cambiarFiltros({});
    } else {
      setMessage(""); // Clear the message if filters are valid
      cambiarFiltros(filters);
    }
    //console.log(filters);
    console.log(message);
  };
  return (
    <section className="filters">
      <div>
        <input
          type="text"
          placeholder="Id product..."
          value={filters._id}
          name="_id"
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Name of product..."
          value={filters.name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div>
        <select
          value={filters.category}
          name="category"
          onChange={handleChange}
        >
          <option>Select category</option>
          {categories.map((dev) => (
            <option key={dev} value={dev}>
              {dev}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => modificarFiltros()}>{SearchIcon()}</button>

      {message && <p>{message}</p>}
    </section>
  );
};

export default FilterProductAdmin;
