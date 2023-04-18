import { useState } from "react";
import { navList } from "../constants";
import { Link } from "react-router-dom";

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
    <header className=" w-full  h-[100px] p-[50px] flex items-center   text-black ">
      <div className="flex-1">
        <Link to="/">
          <h1>logo</h1>
        </Link>
      </div>
      <nav className="">
        <ul className="flex ">
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
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* <div
        onClick={toggleTheme}
        className={`${alignment} w-[50px] h-[20px] rounded-xl  p-[3px] mx-[10px] bg-[red] flex   items-center transition-all duration-100 delay-75 ease-in-out`}
      >
        <div className="w-[18px] h-[18px]  rounded-full  bg-black"></div>
      </div> */}
    </header>
  );
};

export default Navbar;
