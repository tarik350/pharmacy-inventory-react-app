import React from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import Card from "../components/utils/Card";

function PieChart({ chartData }) {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center">
        <h2 style={{ textAlign: "center" }}>Catagory</h2>
        <div className="w-[300px] h-[300px] ">
          <Pie
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Catagory with pie chart",
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </Card>
  );
}
export default PieChart;
