import React from "react";
import TotalMedicines from "./dashboard Items/TotalMedicines";
import Catagory from "./dashboard Items/Catagory";
import CustomeDonutChart from "../charts/CustomeDonutChart";
import Card from "./utils/Card";
import CustomeLineChart from "../charts/CustomeLineChart";
import CustomePieChart from "../charts/CustomePieChart";

const Dashboard = () => {
  return (
    <div className="my-12 grid grid-cols-3  gap-[40px] ">
      <div className=" col-span-3">
        <TotalMedicines />
      </div>
      <div className=" col-span-2">
        <Card>
          <Catagory />
        </Card>
      </div>
      <div className="flex items-center">
        <CustomeDonutChart />
      </div>

      <CustomePieChart />
      <CustomeLineChart />
      <CustomeDonutChart />
    </div>
  );
};

export default Dashboard;
