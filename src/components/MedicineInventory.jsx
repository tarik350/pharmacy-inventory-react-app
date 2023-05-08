import React from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "./utils/Card";

const GET_MEDICINE = gql`
  query MyQuery {
    medicine {
      name
      price
      brandName
      id
      amountInStock
    }
  }
`;

const MedicineInventory = () => {
  const { loading, error, data } = useQuery(GET_MEDICINE);
  if (loading) return "loading...";
  if (error) return `error : ${error}`;
  return (
    <div className="   mx-[200px]">
      {data.medicine.map((item, index) => {
        return (
          <Card key={item.id} className=" flex-1 ">
            <div>
              <div className=" font-extrabold text-2xl">{item.name}</div>
              <div>{item.brandName}</div>

              <div>{item.price}</div>
            </div>
            <div className="flex ">
              <div className="bg-red-600 w-max h-max px-4 py-2 rounded-full cursor-pointer text-white mr-4">
                delete
              </div>
              <div className="bg-blue-600 w-max cursor-pointer h-max px-4 py-2 rounded-full text-white">
                edit
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MedicineInventory;
