import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Card from "./utils/Card";
import { HiOutlinePlus } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit, AiOutlineConsoleSql } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const GET_MEDICINE = gql`
  {
    medicine {
      amount_in_stock
      brand_name
      id
      name
      price
    }
  }
`;

const DELETE_MED = gql`
  mutation ($id: uuid!) {
    delete_medicine(where: { id: { _eq: $id } }) {
      returning {
        name
        price
        id
      }
    }
  }
`;

const DELETE_FUNCTION = gql`
  mutation ($id: uuid!) {
    delete_medicine_by_pk(id: $id) {
      name
      id
      price
    }
  }
`;

const MedicineInventory = () => {
  const [showMessage, setShowMessage] = useState(false);
  let deleteMedicinesId = [];

  const autorized = localStorage.getItem("token");
  const navigate = useNavigate();

  const [deleteMutationFunction, { deleteData, deleteLoading, deleteError }] =
    useMutation(DELETE_FUNCTION);

  const handleDelete = async (id) => {
    deleteMutationFunction({
      variables: {
        id: id,
      },
    }).then((value) => {
      // setDeleteState(true);
    });
  };

  ///how to  check if there is a row selected and show or not show the delete button
  ///dynamically
  ///i have to read more about react state and hooks

  useEffect(() => {
    if (!autorized) {
      navigate("/login");
    } else {
      console.log("authorized");
    }
  }, []);
  const { refetch, loading, error, data } = useQuery(GET_MEDICINE, {
    // pollInterval: 10,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-[red]">{error.message}</p>
      </div>
    );
  }

  const deleteMultipleMedicine = () => {
    if (deleteMedicinesId.length !== 0) {
      console.log("deleting");

      for (let id in deleteMedicinesId) {
        console.log(` deleting :${deleteMedicinesId[id]}`);
        /// we have to make this on the back end with cusome logic to handle it

        //create a custom login and send it the array
        //and at the back end loop over each value and delete

        deleteMutationFunction({
          variables: {
            id: deleteMedicinesId[id],
          },
        }).then((value) => {
          console.log("delete successfully");
        });
      }
    } else {
      //show message
      console.log("nothing to delte");
    }
  };

  return (
    data && (
      <div className="   text-[10px] ">
        <div className=" flex items-center justify-between my-[40px] mx-[40px]">
          <div>
            <h1 className="text-black font-extrabold text-[28px]">Medicine</h1>
            <p className="text-gray-500">Here is the medicine list.</p>
          </div>
          {/* search field and add button */}
          <div className="flex">
            <div className="relative flex items-center">
              <BsSearch className="absolute right-5 " />
              <input
                type="text"
                className="border-2 p-2 mr-2 border-primary w-64"
                placeholder="quick search"
              />
            </div>

            <button className="flex h-max items-center border-2 shadow-lg border-primary px-4 py-2 text-white bg-primary  font-extrabold uppercase">
              <HiOutlinePlus className="mr-2" />
              add medicine
            </button>
          </div>
        </div>
        <div className="flex flex-1 m-[40px]  rounded-xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
          <div className=" flex-col relative  bg-white w-full   m-[3px] border-2  p-2  shadow-2xl rounded-lg ">
            <div className=" flex flex-col">
              <table className="table-auto   w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th className="">Name</th>
                    <th className="">Generic name</th>
                    <th className="">SKU</th>
                    <th className="">Weight</th>
                    <th className="">Catagory</th>
                    <th className="">Manufacturer</th>
                    <th className="">Brand name</th>
                    <th className="">price</th>
                    <th className="">stock</th>
                    <th className="">Expire date</th>
                    <th className="">status</th>

                    {/* <th>Catagory</th>
              <th>manufacturer</th>
              <th>price</th>
              <th>store</th>
              <th>expire date</th>
              <th>status</th> */}
                    <th className="border-none bg-transparent "></th>
                    <th className="border-none bg-transparent"></th>
                  </tr>
                </thead>
                {data.medicine.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr className="">
                        <td>
                          <input
                            type="checkbox"
                            value={item.id}
                            onChange={(event) => {
                              if (event.currentTarget.checked) {
                                console.log("checked");
                                deleteMedicinesId.push(
                                  event.currentTarget.value
                                );
                                console.log(deleteMedicinesId);
                              } else {
                                deleteMedicinesId = deleteMedicinesId.filter(
                                  (e) => e !== event.currentTarget.value
                                );
                                console.log(`deleted : ${deleteMedicinesId}`);
                              }
                            }}
                          />
                        </td>
                        <td className="">{item.name}</td>
                        <td className="">{item.brand_name}</td>
                        <td className="">{item.price}</td>
                        <td className="">{item.amount_in_stock}</td>
                        <td className="">place holder</td>
                        <td className="">place holder</td>
                        <td className="">place holder</td>
                        <td className="">place holder</td>
                        <td className="">place holder</td>
                        <td className="">place holder</td>
                        <td className="">place holder</td>
                        <td className="w-[10px]  cursor-pointer group  hover:bg-red-600 hover:text-white transition-all delay-75">
                          <div
                            className=""
                            onClick={(event) => {
                              handleDelete(item.id);
                            }}
                          >
                            <RiDeleteBin6Line className="text-red-600 group-hover:text-white text-xl transition-all delay-75" />
                          </div>
                        </td>
                        <td className="w-[10px]  cursor-pointer group hover:bg-blue-600 transition-all delay-75 ">
                          <AiFillEdit className="text-blue-600 group-hover:text-white text-xl transition-all delay-75" />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className="flex items-center self-end">
                <div className="error">
                  <p>{}</p>
                </div>
                <button
                  onClick={() => {
                    console.log("delete clicked");
                    deleteMultipleMedicine();
                  }}
                  className="  bg-[red] my-3 text-[14px] text-white px-4 py-2 font-bold "
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // if (loading) return "loading...";
  // if (error) {
  //   return `error : ${error}`;
  // }
};

export default MedicineInventory;
