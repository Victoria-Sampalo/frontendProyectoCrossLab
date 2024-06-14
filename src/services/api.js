import { uri } from "./uri";

const URI=uri();


//Función que hace un fetch para traerme todos los productos
export const allProducts = async () => {
  // Función para realizar la petición

  try {
    // Realizar la solicitud usando fetch
    const url=`${URI}/products`;
     const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
      
  });
    // console.log(response)

    // Verificar si la respuesta es exitosa (status code 200)
    if (response.ok) {
      // Si la respuesta es exitosa, convertir la respuesta a JSON
      const jsonData = await response.json();
      // Actualizar el estado con los datos obtenidos
      // setData(jsonData);
      //  console.log(jsonData)
      return jsonData;
    } else {
      // Si la respuesta no es exitosa, lanzar un error
      throw new Error("Error al obtener los datos");
    }
  } catch (error) {
    // Manejar errores de la petición
    console.error("Error:", error);
  }
};

//Función que hace un fetch para traerme todos los productos filtrados
export const allProductsByFilters = async (filters,limit, offset) => {
  // Función para realizar la petición
  try {
    const url=`${URI}/productsbyfilters`;
    // Realizar la solicitud usando fetch
    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", // Tipo de contenido JSON
        },
        body: JSON.stringify(filters), // Convierte el objeto de filtros a formato JSON
      }
    );
    // Verificar si la respuesta es exitosa (status code 200)
    if (response.ok) {
      // Si la respuesta es exitosa, convertir la respuesta a JSON
      const jsonData = await response.json();
      // Actualizar el estado con los datos obtenidos
      // setData(jsonData);
      //  console.log(jsonData)
      return jsonData;
    } else {
      // Si la respuesta no es exitosa, lanzar un error
      throw new Error("Error al obtener los datos de filtros");
    }
  } catch (error) {
    // Manejar errores de la petición
    console.error("Error al obtener los datos de filtros:", error);
  }
};

// services/Api.js
//Hace un fech para traerme todas las categorias que existan
export const allCategories = async () => {
  // Función para realizar la petición
  

  try {
    // Realizar la solicitud usando fetch
    const url=`${URI}/categories`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    });
    // console.log(response)

    // Verificar si la respuesta es exitosa (status code 200)
    if (response.ok) {
      // Si la respuesta es exitosa, convertir la respuesta a JSON
      const jsonData = await response.json();
      // Actualizar el estado con los datos obtenidos
      // setData(jsonData);
      //  console.log(jsonData)
      return jsonData;
    } else {
      // Si la respuesta no es exitosa, lanzar un error
      throw new Error("Error al obtener los datos");
    }
  } catch (error) {
    // Manejar errores de la petición
    console.error("Error:", error);
  }
};
