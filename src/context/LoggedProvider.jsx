// ./src/context/login.jsx
import { createContext,useReducer,useState } from "react";
import { borrarToken, obtenerToken } from "../lib/serviceToken.js";

//1.Crear contexto
export const LoggedContext = createContext();



//2.crear provider
export function LoggedProvider({children}){

    const [logged, setLogged] = useState({
        estaLogueado: false,
        user: {}
    })
    // const cambiarLogged=(user)=>{
    //     const auxLogged= structuredClone(logged)
    //     auxLogged['estaLogueado']=true
    //     auxLogged['user']=user
    //     setLogged(auxLogged)
    // }
    const cambiarLogged = (user) => {
        setLogged({
          estaLogueado: true,
          user: user
        });
      };

    // const logout=()=>{
    //     const auxLogged= {}
    //     auxLogged['estaLogueado']=false
    //     auxLogged['user']={}
    //     borrarToken()
    //     setLogged(auxLogged)
    // }
    const logout = () => {
        setLogged({
          estaLogueado: false,
          user: {}
        });
        borrarToken();
      };
//Cosas que queremos que se puedan acceder desde ese contexto
    return(
        <LoggedContext.Provider value={{
            logged,
            cambiarLogged,
            logout
        }}>
            {children}
        </LoggedContext.Provider>
    )
}


