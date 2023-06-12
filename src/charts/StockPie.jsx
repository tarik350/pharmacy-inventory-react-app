import { useState } from "react";

import { expireYear } from "../constants";
import { GET_STOCK } from "../gql/queries";
import { useQuery } from "@apollo/client";
import { Card } from "../components";
const StockPie = () => {
  const { data, loading, error } = useQuery(GET_STOCK, {
    variables: { stock: 12 },
  });

  data && console.log(data);

  return (
    data && (
      <div className="w-full ">
        <Card>
          <div className="mb-[50px] flex flex-col items-center justify-center">
            <h4 className="heading-four mb-5">stocks running out</h4>
            <table className="w-full">
              <thead className="">
                <tr>
                  <th>name</th>
                  <th>stock</th>
                  <th>catagory</th>
                  <th>expire year</th>
                </tr>
              </thead>
              {data.medicine.map((med, index) => {
                console.log(med);
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{med.medicine_name}</td>
                      <td>{med.amount_in_stock}</td>
                      <td>{med.catagory}</td>
                      <td>{med.expire_date}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </Card>
      </div>
    )
  );
};

export default StockPie;
