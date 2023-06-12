import { useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../store/Data";
import PieChart from "./PieCharts";
import { Line, Pie } from "react-chartjs-2";
import LineChart from "./LineChart";
import { expireYear } from "../constants";
import { GET_MED_COUNT_FOR_EXPIRE_DATE } from "../gql/queries";
import { useQuery } from "@apollo/client";
import { getMergedStatus } from "antd/es/_util/statusUtils";
import { data } from "autoprefixer";
import { experimentalStyled } from "@mui/material";

const CustomeLineChart = () => {
  const count = [];
  const expireDate = [];
  for (let i = 0; i < expireYear.length; i++) {
    const { data, loading, error } = useQuery(GET_MED_COUNT_FOR_EXPIRE_DATE, {
      variables: {
        year: expireYear[i],
      },
    });

    // data && count.push(data.medicine.length);

    data &&
      expireDate.push({
        year: expireYear[i],
        count: data.medicine.length,
      });
  }

  // console.log(expireDate);

  const [chartData, setChartData] = useState({
    labels: expireDate.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          //   &quot;#ecf0f1",
          "#50AF95",
          "#50AF95",
          "#50AF95",
          "#50AF95",
          "#50AF95",
          "#50AF95",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="App">
      {/* <PieChart chartData={chartData} /> */}
      <PieChart chartData={chartData} />
    </div>
  );
};

export default CustomeLineChart;
