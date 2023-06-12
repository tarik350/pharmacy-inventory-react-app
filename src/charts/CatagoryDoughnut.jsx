import { useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../store/Data";
import PieChart from "./PieCharts";
import { Doughnut, Line, Pie } from "react-chartjs-2";
// import LineChart from "./LineChart";
// import DoughnutChart from "./DoughnutChart";
import { cardHeaderClasses } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { medicineCatagory } from "../constants";

import Card from "../components/utils/Card";

const MEDICINECATAGORY = gql`
  query getCatagory($id: uuid!, $cat: String!) {
    medicine(
      where: { medicine_user: { id: { _eq: $id } }, catagory: { _eq: $cat } }
    ) {
      medicine_name
    }
  }
`;

//this is a catagory chart
const CatagoryDoughnut = () => {
  const count = [];
  const catagoryData = [];
  const uid = localStorage.getItem("id");

  for (let i = 0; i < medicineCatagory.length; i++) {
    const { data, loading, error } = useQuery(MEDICINECATAGORY, {
      variables: {
        id: uid,
        cat: medicineCatagory[i].toLowerCase(),
      },
    });
    // data && count.push(data.medicine.length);
    catagoryData.push({
      id: i,
      name: medicineCatagory[i],
      count: data ? data.medicine.length : 0,
    });
  }

  const [chartData, setChartData] = useState({
    //this will the catagory name for our case
    //catagory.name
    labels: catagoryData.map((data) => data.name),
    datasets: [
      {
        label: "count",
        //this will be teh number of medicins in the catagory
        data: catagoryData.map((data) => data.count),
        //we have to add 2 more for this b/c there are 7 catagories
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#7209b7",
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
      {/* <LineChart chartData={chartData} /> */}
      <DoughnutChart chartData={chartData} />
    </div>
  );
};

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

export default CatagoryDoughnut;
