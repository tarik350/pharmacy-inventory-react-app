import React from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import Card from "../components/utils/Card";

function DoughnutChart({ chartData, title, subtitle }) {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center">
        <h2 style={{ textAlign: "center" }}>Medicine Catagory</h2>
        <div className="w-[300px] h-[400] ">
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "medicine count to catagory ratio",
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
export default DoughnutChart;
