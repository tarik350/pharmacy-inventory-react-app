import { Navbar, Home } from "./components";
import AddMedicine from "./components/AddMedicine";

import MedicineInventory from "./components/MedicineInventory";
import { paddingX } from "./styles";
import { Route, Routes } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import LoginPage from "./components/LoginPage";

const login = gql`
  {
    login(email: "test") {
      id
      token
    }
  }
`;

const getMed = gql`
  {
    users {
      id
      name
    }
  }
`;

const App = () => {
  return (
    <div className="  font-poppins h-screen ">
      <div className=" flex w-full h-full ">
        <div className="flex-initial w-[300px] bg-gray-100">
          <Navbar />
        </div>
        <button
          onClick={() => {
            handleTest();
          }}
        >
          test
        </button>

        <div className="flex-1 m-4">
          <Routes className="  ">
            <Route path="/login" element={<LoginPage />}></Route>
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
