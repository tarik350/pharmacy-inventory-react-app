import { Navbar, Home } from "./components";
import AddMedicine from "./components/AddMedicine";

import MedicineInventory from "./components/MedicineInventory";
import { paddingX } from "./styles";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="  font-poppins">
      <Navbar />
      <div className=" m-10 ">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addmed" element={<AddMedicine />}></Route>
          <Route path="/inventory" element={<MedicineInventory />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
