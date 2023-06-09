import React from "react";
import FilledCard from "../utils/FilledCard";
import { gql, useQuery } from "@apollo/client";
import Template from "./Template";
import { CircularProgress } from "@mui/material";

const MEDICINE = gql`
  {
    medicine {
      medicine_name
    }
  }
`;

const TotalMedicines = ({ title, description }) => {
  const { data, loading, error } = useQuery(MEDICINE);
  if (loading)
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );

  //   data && console.log(data.medicine.length);
  const medCount = data.medicine.length;
  return (
    data && (
      <div className="w-full">
        <Template flag="total" title={medCount} description="Total Medince" />
      </div>
    )
  );
};

export default TotalMedicines;
