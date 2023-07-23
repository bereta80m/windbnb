import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MyDatos from "../instance/stays.json";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { UseGlobal } from "../context/GlobalContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from '@mui/icons-material/Close';

function SearchDialog({ IsOpen, CloseDialog }) {
  const [maxChildren, setMaxChildren] = useState(0)
  const [maxAdults, setMaxAdults] = useState(0)
  const {
    locationSearch,
    setLocationSearch,
    maxGuest,
    setMaxGuest,
    newList,
    HandleSearch,
    isdroppedOpen, setIsdroppedOpen
  } = UseGlobal();

  const handleSelected = (item, index) => {
    try {
      setMaxGuest(item.maxGuests);
      setLocationSearch(`${item.city}`);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    let Suma = maxAdults + maxChildren
    setMaxGuest(Suma)
  }, [maxChildren,maxAdults])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (IsOpen && e.target.classList.contains("Container_dialog")) {
        CloseDialog();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [IsOpen, CloseDialog]);

  return (
    <AnimatePresence>
      {IsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="Container_dialog top-0 left-0  flex flex-col fixed w-full h-screen bg-black/50 "
        >
          <div className="dialog_content text-white w-full bg-white  ">
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1 items-center justify-center gap-3 my-16 px-20 w-full ">
              <div className="border px-3 border-black rounded-xl">
                <p className="text-black text-xs font-semibold">Location</p>
                <input
                  type="text"
                  className="outline-none border-none text-black w-full p-1 "
                  placeholder="Location"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
              </div>

              <div
                className="MainDropButton flex flex-col border cursor-pointer  relative gap-2  border-black rounded-xl"
                onClick={() => setIsdroppedOpen((Prev)=>!Prev)}
              >
                <p className="text-black top-0  text-xs absolute font-semibold">
                  Guests
                </p>
                <p className="text-black/50 p-3 cursor-pointer">{maxGuest === 0 ? "Add guests" : maxGuest}</p>
                {isdroppedOpen ? (
                  <div className="flex flex-col border mt-14 px-5 py-2 gap-5 bg-white w-full h-60 absolute rounded-2xl shadow-lg ">
                    {/*<CloseIcon onClick={()=> setIsdroppedOpen(false)} className="absolute z-20 text-black right-0 m-2 cursor-pointer"/> */}
                    <div className="flex flex-col gap-3  text-black">
                      <p className="font-bold">Adults</p>
                      <p className="text-black/50 ">Ages 13 or above</p>
                      <div className="flex gap-5 w-60">
                      <RemoveIcon onClick={()=>setMaxAdults((Prev)=>Prev <= 1 ? Prev = 0 : Prev - 1 )} className="border border-black rounded-md "/>
                      {maxAdults}
                      <AddIcon onClick={()=>setMaxAdults((Prev)=>Prev + 1)} className="border border-black rounded-md "/>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3  text-black">
                      <p className="font-bold">Children</p>
                      <p className="text-black/50 ">Ages 2-12 </p>

                      <div className="flex gap-5  w-60">
                      <RemoveIcon onClick={()=>setMaxChildren((Prev)=>Prev <= 1 ? Prev = 0 : Prev - 1 )} className="border border-black rounded-md "/>
                      {maxChildren}
                      <AddIcon onClick={()=>setMaxChildren((Prev)=>Prev + 1)} className="border border-black rounded-md "/>
                      </div>
                    </div>
                    
                  </div>
                ): ""}
              </div>

              <div
                className="flex border px-3 w-44 p-3 cursor-pointer gap-2 items-center bg-[#eb5757] text-white rounded-xl"
                onClick={() => HandleSearch()}
              >
                <SearchIcon className="h-10 w-10 " />
                <p>Search</p>
              </div>
              <ul className="flex flex-col w-full text-black overflow-auto max-h-[60vh]">
                {newList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex gap-2 py-3 cursor-pointer hover:bg-gray-200 px-2 rounded-xl "
                      onClick={() => handleSelected(item, index)}
                    >
                      <LocationOnIcon />
                      <p>
                        {item.city}, {item.country}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchDialog;
