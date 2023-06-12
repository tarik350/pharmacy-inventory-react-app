import React from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import Card from "../components/utils/Card";

function DoughnutChart({ chartData }) {
  return (
    <Card>
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <div className="w-[300px] h-[400] ">
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </Card>
  );
}
export default DoughnutChart;
