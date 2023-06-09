import { useState } from "react";
import { navList } from "../constants";
import { Link } from "react-router-dom";
import { logo } from "../assets";

import { IoChevronForward } from "react-icons/io5";
const Navbar = () => {
  const [alignment, setAlignment] = useState("justify-start");
  const toggleTheme = () => {
    if (alignment === "justify-start") {
      setAlignment("justify-end");
    } else {
      setAlignment("justify-start");
    }
  };
  return (
    <header className=" w-full relative  h-full  p-[50px] flex flex-col    items-center   text-black ">
      <div className="">
        <Link to="/">
          <div className="border-4 border-gray-400 overflow-hidden  rounded-full flex justify-center items-center w-[130px] h-[130px] ">
            <img className=" object-cover" src={logo} />
          </div>
        </Link>
      </div>
      <nav className=" flex justify-center items-center mt-[100px] ">
        <ul className="flex flex-col  justify-center ">
          {navList.map((item, index) => {
            return (
              <li
                key={index}
                className={`${
                  index === navList.length - 1 ? "" : "mr-4  md:mr-8"
                }`}
              >
                <Link
                  className="uppercase text-[17px]   text-black hover:text-secondary transition-all "
                  to={item.link}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <div className="my-2  px-2"> {item.name}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
