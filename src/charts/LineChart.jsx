import Card from "../components/utils/Card";
import React from "react";
import { Pie, Bar, Line, PolarArea, Radar } from "react-chartjs-2";
import FilledCard from "../components/utils/FilledCard";
const LineChart = ({ chartData }) => {
  return (
    <FilledCard>
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <div className="w-[300px] h-[400] ">
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
    </FilledCard>
  );
};

export default LineChart;
