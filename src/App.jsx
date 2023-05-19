import { Navbar, Home } from "./components";
import AddMedicine from "./components/AddMedicine";

import MedicineInventory from "./components/MedicineInventory";
import { paddingX } from "./styles";
import { Route, Routes } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import NewsFeed from "./components/NewsFeed";
import { pharma_woman } from "./assets";
import Samaratan from "./components/Samaratan";
import ShowNavBar from "./components/utils/ShowNavBar";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="flex">
      <ShowNavBar>
        <div className="bg-gray-100  h-screen">
          <Navbar />
        </div>
      </ShowNavBar>
      <div className="flex-1 mx-[50px]  my-12">
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addmed" element={<AddMedicine />}></Route>
          <Route path="/inventory" element={<MedicineInventory />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
