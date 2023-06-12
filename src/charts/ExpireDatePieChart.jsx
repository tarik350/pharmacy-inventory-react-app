import { useState } from "react";

import { Data } from "../store/Data";
// import PieChart from "./PieCharts";

import { expireYear } from "../constants";
import { GET_MED_COUNT_FOR_EXPIRE_DATE } from "../gql/queries";
import { useQuery, gql } from "@apollo/client";
import LineChart from "./LineChart";
import { Card } from "../components";
import { Pie } from "react-chartjs-2";
import { experimentalStyled } from "@mui/material";

//this is a catagory chart
const ExpireDatePieChart = () => {
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
    //this will the catagory name for our case
    //catagory.name
    labels: expireDate.map((data) => data.year),
    datasets: [
      {
        label: "count",
        //this will be teh number of medicins in the catagory
        data: expireDate.map((data) => data.count),
        //we have to add 2 more for this b/c there are 7 catagories
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#7209b7",
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
      <PieChart chartData={chartData} />
      {/* <LineChart chartData={chartData} /> */}
      {/* <DoughnutChart chartData={chartData} /> */}
    </div>
  );
};

function PieChart({ chartData }) {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center">
        <h2 style={{ textAlign: "center" }}>Expire year</h2>
        <div className="w-[300px] h-[300px] ">
          <Pie
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "expire year to medicine count ratio",
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
export default ExpireDatePieChart;
