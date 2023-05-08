import React from "react";

const Card = ({ children }) => {
  return (
    <div className="rounded-lg m-12 flex items-center justify-center  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full shadow-xl m-[3px] rounded-lg p-12 flex items-center bg-white justify-between  ">
        {children}
      </div>
    </div>
  );
};

export default Card;
