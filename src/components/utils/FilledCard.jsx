import React from "react";

const FilledCard = ({ children, flag }) => {
  return (
    <div className="flex justify-center items-center w-max    ">
      <div className="flex flex-1  rounded-xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
        <div
          className={`${
            flag === "total" ? "px-[400px]" : ""
          }  flex-col  relative   w-full    border-2 px-4 py-2  shadow-2xl rounded-lg `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FilledCard;
