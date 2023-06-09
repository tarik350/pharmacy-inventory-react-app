import { Navbar, Home, AddMedicine } from "./components";
// import AddMedicine from "./components/AddMedicine";
import { useState, useContext } from "react";
import MedicineInventory from "./components/MedicineInventory";
import { paddingX } from "./styles";
import { Route, Routes } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ShowNavBar from "./components/utils/ShowNavBar";
import Test from "./components/Test";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("token") !== null
  );

  // const token = localStorage.getItem("token");
  console.log(`is logged in : ${isLoggedIn}`);

  ///i think i have to use a global varibale that is accessed accross the
  ///entire app that lets me know if the user has logged in or not

  ///i set that value to true on LoginPage component

  ///and set the value to false when logout button is clicked

  ///everytime the value changes we have to reset the app and rebuild the entire app

  return (
    <div className="flex  ">
      <ShowNavBar>
        <div className="bg-gray-200  flex-1 h-[920px] my-8 mx-4 rounded-xl ">
          <Navbar />
        </div>
      </ShowNavBar>
      <div className="flex-1 ">
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addmed" element={<AddMedicine />}></Route>
          <Route path="/inventory" element={<MedicineInventory />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
