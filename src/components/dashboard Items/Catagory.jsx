import React from "react";
import { gql, useQuery } from "@apollo/client";
import Template from "./Template";
import { medicineCatagory } from "../../constants";

const MEDICINECATAGORY = gql`
  query getCatagory($id: uuid!, $cat: String!) {
    medicine(
      where: { medicine_user: { id: { _eq: $id } }, catagory: { _eq: $cat } }
    ) {
      medicine_name
    }
  }
`;

const Catagory = () => {
  const uid = localStorage.getItem("id");

  const count = [];

  for (let i = 0; i < medicineCatagory.length; i++) {
    const { data, loading, error } = useQuery(MEDICINECATAGORY, {
      variables: {
        id: uid,
        cat: medicineCatagory[i].toLowerCase(),
      },
    });
    data && count.push(data.medicine.length);
  }

  console.log(count);

  //   if (loading) return <div>loadign</div>;
  //   if (error) return <div>{error.message}</div>;
  //   data && console.log(data);

  return (
    <div className=" container grid grid-cols-4 gap-y-[10px]  ">
      {medicineCatagory.map((catagory, index) => {
        return (
          <div className="">
            <Template title={count[index]} description={catagory} />
          </div>
        );
      })}
    </div>
  );
};

export default Catagory;
