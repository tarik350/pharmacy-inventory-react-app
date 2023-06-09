import { useState } from "react";
import { navList } from "../constants";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import {
  AiFillFileAdd,
  AiFillHome,
  AiFillPlusCircle,
  AiOutlineAppstoreAdd,
  AiTwotoneAppstore,
} from "react-icons/ai";

import { IoChevronForward } from "react-icons/io5";
const Navbar = () => {
  const [alignment, setAlignment] = useState("justify-start");
  const [showMedicineMenu, setShowMedicineMenu] = useState(false);
  const [active, setActive] = useState(-1);

  const toggleTheme = () => {
    if (alignment === "justify-start") {
      setAlignment("justify-end");
    } else {
      setAlignment("justify-start");
    }
  };
  return (
    <header className=" w-full relative  h-full  flex flex-col     text-black ">
      <div className="border-b-2 pb-4 pl-4 pt-4 flex items-center">
        <div className="pr-2 ">
          <Link to="/">
            <div className="border-[2px] border-gray-400 overflow-hidden  rounded-full flex justify-center items-center w-[50px] h-[50px] ">
              <img className=" object-cover" src={logo} />
            </div>
          </Link>
        </div>
        <div>
          <p>username</p>
          <p>user email</p>
        </div>
      </div>
      <nav className=" flex justify-center items-center pl-4  mt-[100px] ">
        <ul className="flex flex-col  justify-center ">
          {navList.map((item, index) => {
            return (
              <li
                key={index}
                className={`${
                  index === navList.length - 1 ? "" : "mr-4  md:mr-8"
                }`}
                onClick={() => setActive(index)}
              >
                <Link
                  className={`${
                    active === index ? "text-secondary" : ""
                  } uppercase text-[17px]   text-black hover:text-secondary transition-all `}
                  to={item.link && item.link}
                >
                  <div
                    onClick={() => {
                      if (item.name === "medicine") {
                        if (showMedicineMenu === false) {
                          setShowMedicineMenu(true);
                        } else {
                          setShowMedicineMenu(false);
                        }
                      }
                    }}
                    className="flex items-center"
                  >
                    {item.icon}
                    <div className="my-2  px-2"> {item.name}</div>
                    {item.expand && (
                      <div className="pl-[50px]">{item.expand}</div>
                    )}
                  </div>
                </Link>
                {showMedicineMenu && item.name === "medicine" && (
                  <div className="pl-[35px]">
                    <ul>
                      <li>
                        <Link
                          className=" text-[17px]   text-black hover:text-secondary transition-all "
                          to="/addmed"
                        >
                          <p>add medince</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className=" text-[17px]   text-black hover:text-secondary transition-all "
                          to="/inventory"
                        >
                          <p>medince list</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
