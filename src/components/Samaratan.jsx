// // import { Navbar, Home } from "./components";
// import AddMedicine from "./components/AddMedicine";

// import MedicineInventory from "./components/MedicineInventory";
// import { Route, Routes } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import SignupPage from "./components/SignupPage";

import { Navbar, Home, AddMedicine, MedicineInventory } from "../components";

import { Route, Routes, useLocation } from "react-router-dom";

const Samaratan = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  return (
    <div>
      <div>
        <div className="  font-poppins h-screen ">
          <div className=" flex w-full h-full ">
            <div className="flex-initial w-[300px] bg-gray-100">
              <Navbar />
            </div>

            <div className="flex-1  m-4">
              <Home />
            </div>
            {/* <div className="flex-1 w-full">
      <Routes>
        <Route path="/inventory" element={<MedicineInventory />}></Route>
      </Routes>
    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Samaratan;
