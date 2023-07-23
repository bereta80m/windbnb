import { createContext,useContext, useEffect, useState } from "react";
import MyDatos from "../instance/stays.json";

const GlobalContext = createContext({});


function GlobalProvider({children}) {
  const [locationSearch, setLocationSearch] = useState("");
  const [maxGuest, setMaxGuest] = useState(0);
  const newList = MyDatos.filter((datos, index, array) =>
  locationSearch.toLowerCase() === "" ? datos : datos.city.toLowerCase().includes(locationSearch.toLowerCase()) || datos.country.toLowerCase().includes(locationSearch.toLowerCase()))
  const [placesList, setPlacesList] = useState([...MyDatos])
  const [isdroppedOpen, setIsdroppedOpen] = useState(false);

  const HandleSearch = (item)=>{
    if (locationSearch && maxGuest) {
      const newList2 = MyDatos.filter((datos, index, array) =>{
        let Country = datos.country.toLowerCase()
        let City = datos.city.toLowerCase()
        let MaxOfGuest = datos.maxGuests.toString().toLowerCase()
        return City.includes(locationSearch.toLowerCase()) && MaxOfGuest.includes(maxGuest.toString().toLowerCase()) || Country.includes(locationSearch.toLowerCase()) && MaxOfGuest.includes(maxGuest.toString().toLowerCase())
      })
      try {
        setPlacesList([...newList2])
       } catch (error) {
        console.log(error)
       }
    } else {
      setPlacesList([...newList])

    }
  }
  return (
    <GlobalContext.Provider value={{ locationSearch,isdroppedOpen, setIsdroppedOpen, setLocationSearch,maxGuest, setMaxGuest, newList,HandleSearch,placesList }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider


export const UseGlobal = ()=> useContext(GlobalContext)
