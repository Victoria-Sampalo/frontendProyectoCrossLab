export const getPrueba = async () => {
  const url = `${import.meta.env.VITE_API}/users`;
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
  console.log(datos);
  const url=`${import.meta.env.VITE_API}/login`
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
  });
  if(response.status==403) return {error:true,message:'Usuario o contraseña incorrecta'}
  const data = await response.json();
  console.log(data);
  return data.data
}

export const tokenUser = async (token) => {
  if (token == null) return { error: true, message: "Token no valido" };
  else {
    const datos = {
      token,
    };

    const url = `${import.meta.env.VITE_API}/validtoken`;
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
  const url=`${import.meta.env.VITE_API}/product/${id}`
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
  const url = `${import.meta.env.VITE_API}/createuser`;
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

