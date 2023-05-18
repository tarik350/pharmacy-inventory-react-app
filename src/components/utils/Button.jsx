import React from "react";

const Button = ({ title, onClick }) => {
  return (
    <div className=" bg-gradient-to-r w-max self-end rounded-full p-[2px]  from-indigo-500 via-purple-500 to-pink-500   justify-end">
      <button
        onClick={onClick}
        // type="submit"
        className="btn group px-[14px]   py-[12px]  "
      >
        <p className=" group-hover:bg-gradient-to-r  group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:inline-block group-hover:text-transparent group-hover:bg-clip-text">
          {title}
        </p>
      </button>
    </div>
  );
};

export default Button;
