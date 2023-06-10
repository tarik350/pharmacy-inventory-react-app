import { useState } from "react";

import { navList } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import {
  AiFillFileAdd,
  AiFillHome,
  AiFillPlusCircle,
  AiOutlineAppstoreAdd,
  AiTwotoneAppstore,
} from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";
const Navbar = () => {
  const [alignment, setAlignment] = useState("justify-start");
  const [showMedicineMenu, setShowMedicineMenu] = useState(false);
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  const toggleTheme = () => {
    if (alignment === "justify-start") {
      setAlignment("justify-end");
    } else {
      setAlignment("justify-start");
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    //show modal before navigating to login page
    navigate("/login");

    // setLoginStatus(false);
  };
  return (
    <header className=" w-full relative  h-full  flex flex-col  shadow-sm rounded-xl  text-black ">
      <div className="border-b-2  border-gray-400 pb-4 pl-4 pt-4 flex items-center">
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
      <nav className=" flex flex-col justify-between  h-full  mt-[100px] ">
        <ul className="flex flex-col self-start  pl-4   justify-center ">
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
                      </li>{" "}
                      <li>
                        <Link
                          className=" text-[17px]   text-black hover:text-secondary transition-all "
                          to="/description"
                        >
                          <p>medince desciption</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex justify-center mb-4">
          <div className="px-8 py-2 w-max   flex justify-center items-center border-2  border-primary text-primary  ml-2 ">
            <MdLogout />
            <button className="ml-2" onClick={() => handleLogout()}>
              LOG OUT
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
