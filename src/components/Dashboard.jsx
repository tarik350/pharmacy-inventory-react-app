import React from "react";
import TotalMedicines from "./dashboard Items/TotalMedicines";
import Catagory from "./dashboard Items/Catagory";

const Dashboard = () => {
  return (
    <div className="my-12  ">
      <div className="">
        <TotalMedicines />
      </div>
      <div className="">
        <Catagory />
      </div>
    </div>
  );
};

export default Dashboard;
