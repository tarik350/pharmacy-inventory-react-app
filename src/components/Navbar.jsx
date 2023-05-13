import { useState } from "react";
import { navList } from "../constants";
import { Link } from "react-router-dom";

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
    <header className=" w-full relative   h-[100px] p-[50px] flex flex-col justify-between   items-center   text-black ">
      <div className="">
        <Link to="/">
          <h1>logo</h1>
        </Link>
      </div>
      <nav className="flex-1 flex justify-center items-center ">
        <ul className="flex flex-col  justify-center ">
          {navList.map((item, index) => {
            return (
              <li
                key={index}
                className={`${
                  index === navList.length - 1 ? "" : "mr-4 md:mr-8"
                }`}
              >
                <Link
                  className="uppercase text-[14px] text-black hover:text-secondary transition-all "
                  to={item.link}
                >
                  <div>{item.name}</div>
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
