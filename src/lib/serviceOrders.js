export const getAllOrdersNormal = async (token, id) => {
    const datos = {
      id_user: id
    };

    console.log("id en service orders" + id) 
    
    const url = `${import.meta.env.VITE_API}/getuserorders`;
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