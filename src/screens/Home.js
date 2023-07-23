import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { UseGlobal } from "../context/GlobalContext";

function Home() {
  const { placesList } = UseGlobal()

  
  return (
    <div className="flex flex-col w-full h-screen gap-5 lg:pt-14 md:pt-14 sm:pt-5 xs:pt-5 xxs:pt-5">
      <div className="flex w-full items-center justify-between">
        <p className="TitleIntro text-xl font-bold">Stays in Finland</p>
        <p className="TitleIntro">12+ stays</p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 ">
        {placesList.map((item,index) => {
          return (
            <div
            key={index}
              style={{
                width: "297.75px",
                height: "282.86px",
                objectFit: "cover",
              }}
              className="flex flex-col rounded-xl gap-2 "
            >
              <img
                className="w-full h-full rounded-xl"
                alt=""
                src={item.photo}
              />
              <div className="flex w-full justify-between items-center px-1">
                <div className="flex gap-3 items-center">
                {item.superHost && <span className="border border-black rounded-xl p-1">SUPER HOST</span>}
                <p className="typeText truncate text-gray-500 text-md">{item.type}</p>
                </div>
                <div className="flex items-center">
                <StarIcon className="text-[#eb5757]"/>
                  <p>{item.rating}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
