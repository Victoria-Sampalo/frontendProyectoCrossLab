import { createContext, useState } from "react";

//Este es el contexto que tenemos que consumir
export const FiltersContext= createContext()

//Creo provider, para proveer el contexto
//Nos provee de acceso al contexto
export function FiltersProvider({ children}){
    const [filters,setFilters]= useState({
        minPrice:0,
      categoru:'all'
    })
    return(
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}></FiltersContext.Provider>
    )
}
