import {
  Navbar,
  Home,
  AddMedicine,
  NewsFeed,
  MedicineDescription,
  MedicineInventory,
  LoginPage,
  SignupPage,
  ShowNavBar,
  PrivacyPolicy,
  TermsAndCondition,
  About,
  Support,
} from "./components";
import { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
// import Test from "./charts/CustomeDonutChart";
import PlaceComponent from "./map/place.component";
import Dashboard from "./components/Dashboard";

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
        <div className="bg-gray-200 w-[300px] h-[920px] my-8 mx-4 rounded-xl ">
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
          <Route path="/news" element={<Dashboard />}></Route>
          <Route path="/description" element={<MedicineDescription />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/privacy" element={<PrivacyPolicy />}></Route>
          <Route path="/terms" element={<TermsAndCondition />}></Route>
          <Route path="/support" element={<Support />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
