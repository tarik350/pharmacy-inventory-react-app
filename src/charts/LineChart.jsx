import React from "react";
import { Pie, Bar, Line, PolarArea, Radar } from "react-chartjs-2";
const LineChart = ({ chartData }) => {
  return (
    <div className=" border-4 border-black w-max m-12">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <div className="w-[400px] h-[500] ">
        <Bar
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
    </div>
  );
};

export default LineChart;
