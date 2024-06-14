const uri="https://back-mongoose.onrender.com/api";

// const uri="http://localhost:1000/api";


export const getPrueba = async () => {
  const url = `${uri}/users`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
  });
  console.log(response);
};

export const loggear = async (email, password) => {
  const datos = {
      email,
      password,
  };
  //  console.log(datos);
  //  console.log(uri);
  const url=`${uri}/login`
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
  });
  if(response.status==403) return {error:true,message:'Usuario o contraseña incorrecta'}
  const data = await response.json();
  // console.log(data);
  return data.data
}

export const tokenUser = async (token) => {
  if (token == null) return { error: true, message: "Token no valido" };
  else {
    const datos = {
      token,
    };

    const url = `${uri}/validtoken`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (response.status == 403)
      return { error: true, message: "Token no valido" };
    const data = await response.json();
    // console.log("----------------------------------------------")
    // console.log(data.data)
    // console.log("----------------------------------------------")

    return data.data;
  }
};


export const productId=async(id)=>{
  const url=`${uri}/product/${id}`
  const response = await fetch(url);
  const data = await response.json();
  if(data.error) return data
  return data.data
}




export const crearUsuarioAdmin = async (token, datos) => {
  const usuario = {
    name: datos.nombre,
    company: datos.empresa,
    CIF: datos.cif,
    phone: datos.telefono,
    email: datos.email,
    password: datos.password,
    user_type: datos.type == null ? "normal" : datos.type,
    user_status: datos.status == null ? false : datos.status,
  };
  const url = `${uri}/createuser`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usuario),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };

  const data = await response.json();
  console.log(data);
  if (data.error) return data;
  return data.data;
};


export const crearUsuarioNormal = async (token, datos) => {
  console.log(datos);
  const usuario = {
    user_name:datos.user_name,
    email: datos.email,
    password: datos.password,
    full_name:datos.full_name,
    billing_address:datos.billing_address,
    country:datos.country,
    phone: datos.phone,
    date_of_birth:datos.date_of_birth,
   
    user_type: "normal", // Tipo de usuario por defecto
  };
  const url = `${uri}/createuser`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usuario),
  });
  
  if (response.status == 409)
    return { error: true, message: "Token no válido" };

  const data = await response.json();
  console.log(data);
  if (data.error) return data;
  return data.data;
};

export const getCountProductsAdminFilters = async (token, filtros) => {
  const datos = {
    id: filtros._id,
    name: filtros.name,
    category: filtros.category,
  };
  const url = `${uri}/countproductsadminfilters`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};


export const getAllProductsAdminLimitFilters = async (token, limit, offset, filtros) => {
  const datos = {
    limit,
    offset,
    id: filtros._id,
    name: filtros.name,
    category: filtros.category,
  };

  const url = `${uri}/getallproductsadmin`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  if (response.status == 409)
    return { error: true, message: "Token no valido" };
  const data = await response.json();
  return data.data;
};



export const crearProducto = async (token, datos) => {
  const producto = {
    name: datos.name,
    price: datos.price,
    brand: datos.brand,
    category: datos.category,
    description: datos.description,
    images: datos.images,
    stock: datos.stock
  };

  console.log("lib data peticion llega ")
  console.log(producto)

  const url = `${uri}/createproduct`; 
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  if (response.status === 401) {
    return { error: true, message: "Token no válido" };
  }

  const data = await response.json();
  console.log(data);

  if (data.error) {
    return data;
  } else {
    return data; 
  }
};
