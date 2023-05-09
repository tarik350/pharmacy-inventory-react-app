import { Navbar, Home } from "./components";
import AddMedicine from "./components/AddMedicine";

import MedicineInventory from "./components/MedicineInventory";
import { paddingX } from "./styles";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="  font-poppins h-screen ">
      <div className=" flex w-full h-full ">
        <div className="flex-initial w-64 bg-gray-100">
          <Navbar />
        </div>

        <div className="flex-1 m-4">
          <Routes className="  ">
            <Route path="/" element={<Home />}></Route>
            <Route path="/addmed" element={<AddMedicine />}></Route>
            <Route path="/inventory" element={<MedicineInventory />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
