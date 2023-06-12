import React from "react";

const Card = ({ children }) => {
  return (
    <div className="flex mx-[40px] justify-center  items-center  ">
      <div className="flex flex-1  rounded-xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
        <div className=" flex-col relative  bg-white w-full   m-[3px] border-2 p-12  shadow-2xl rounded-lg ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
