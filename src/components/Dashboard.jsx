import React from "react";
import TotalMedicines from "./dashboard Items/TotalMedicines";
import Catagory from "./dashboard Items/Catagory";
import CatagoryDoughnut from "../charts/CatagoryDoughnut";
import Card from "./utils/Card";
import CustomeLineChart from "../charts/CustomeLineChart";
import CustomePieChart from "../charts/CustomePieChart";
import ExpireDatePieChart from "../charts/ExpireDatePieChart";
import StockPie from "../charts/StockPie";

const Dashboard = () => {
  return (
    <div className="mx-[40px] my-[40px] grid grid-cols-3  gap-[40px] ">
      <div className=" col-span-3">
        <TotalMedicines />
      </div>
      <div className=" col-span-2">
        <Card>
          <Catagory />
        </Card>
      </div>
      <div className="flex items-end justify-end">
        <CatagoryDoughnut />
      </div>

      <ExpireDatePieChart />

      <div className="col-span-2 flex  ">
        <StockPie />
      </div>
      {/* <CatagoryDoughnut /> */}
    </div>
  );
};

export default Dashboard;
