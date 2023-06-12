import Card from "../components/utils/Card";
import React from "react";
import { Pie, Bar, Line, PolarArea, Radar } from "react-chartjs-2";
import FilledCard from "../components/utils/FilledCard";
const LineChart = ({ chartData }) => {
  return (
    <Card>
      <div className="m-auto flex flex-col items-center  ">
        <h2 style={{ textAlign: "center" }}>Line Chart</h2>
        <div className="w-[300px] h-[300px] ">
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
    </Card>
  );
};

export default LineChart;
