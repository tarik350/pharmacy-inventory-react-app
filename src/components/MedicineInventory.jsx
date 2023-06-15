import React, { useState, useEffect, useContext } from "react";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import Card from "./utils/Card";
import { HiOutlinePlus } from "react-icons/hi";
import { BsSearch, BsWindowDash, BsWindowDesktop } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit, AiOutlineConsoleSql } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ShowModalContext from "../state/show-modal";
import { SEARCH_MED } from "../gql/queries";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

const GET_MEDICINE = gql`
  {
    medicine {
      medicine_name
      amount_in_stock
      brand_name
      catagory
      description
      generic_name
      id
      manufacturer
      price
      sku
      user_id
      expire_date
      weight
    }
  }
`;

// const DELETE_MED = gql`
//   mutation ($id: uuid!) {
//     delete_medicine(where: { id: { _eq: $id } }) {
//       returning {
//         medicine_name
//         price
//         id
//       }
//     }
//   }
// `;

const DELETE_MED = gql`
  mutation ($id: uuid!) {
    delete_medicine_by_pk(id: $id) {
      medicine_name
      id
      price
    }
  }
`;

const MedicineInventory = () => {
  const showModalContext = useContext(ShowModalContext);
  const deleteMedicinesIdState = showModalContext.deletedMedicineIds;
  const addMedicineToDeleteList = showModalContext.addList;
  const removeMedicineFromDeleteList = showModalContext.removeList;
  const clearList = showModalContext.clearList;

  const [showProgress, setShowProgress] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (!autorized) {
      navigate("/login");
    } else {
      console.log("authorized");
    }
  }, []);

  let deleteMedicinesId = [];

  const autorized = localStorage.getItem("token");
  const navigate = useNavigate();

  const [
    deleteMutationFunction,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_MED);

  const [
    searchMed,
    { loading: lazyLoading, error: lazyError, data: lazyData },
  ] = useLazyQuery(SEARCH_MED);

  const deleteSingleMedicine = async (id) => {
    console.log("delete started");
    await deleteMutationFunction({
      variables: {
        id: id,
      },
    })
      .then((value) => {
        window.location.reload(false);
        console.log(`medincne deleted successfull: ${value}`);
      })
      .catch((err) => {
        setMessage("medicine deleted successfully");
        setFlag("success");
      });
  };

  if (deleteLoading) {
    console.log("delet loading");
  }

  const handleSearchChange = (event) => {
    if (event.target.value.length === 0) {
      window.location.reload(false);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      //write logic for serch
      await searchMed({
        variables: {
          name: event.target.value,
        },
      });
      setSearch(true);
    }
  };

  const { refetch, loading, error, data } = useQuery(GET_MEDICINE, {
    pollInterval: 5,
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
    console.log(`deletd state: ${deleteMedicinesIdState}`);

    if (deleteMedicinesIdState.length !== 0) {
      for (let id in deleteMedicinesIdState) {
        console.log(` deleting :${deleteMedicinesIdState[id]}`);
        /// we have to make this on the back end with cusome logic to handle it

        //create a custom login and send it the array
        //and at the back end loop over each value and delete
        deleteMutationFunction({
          variables: {
            id: deleteMedicinesIdState[id],
          },
        }).then((value) => {
          window.location.reload(false);

          console.log("delete successfully");
        });
      }
      clearList();
    } else {
      //show message
      console.log("nothing to delte");
    }
  };

  if (loading) return <div>loading</div>;
  if (lazyLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );

  return (
    data && (
      <div className="   text-[10px]   ">
        <div
          className={`${
            showModal
              ? "   rounded-xl  absolute h-screen w-screen  z-50   "
              : "hidden"
          }   `}
        >
          <div className=" flex modal-background flex-wrap justify-center items-center ">
            <div className="bg-white text-black p-[100px]  ">
              <p className="text-xl py-4 uppercase">
                {`are you sure you want to delete ${deleteMedicinesIdState.length} items`}{" "}
              </p>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => {
                    deleteMultipleMedicine();
                    setShowModal(false);
                    console.log("state updated");
                    // window.location.reload(true);
                  }}
                  className="btn px-4 py-2 mx-2 text-xl"
                >
                  yes
                </button>
                <button
                  className="btn px-4 py-2 mx-2 text-xl"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  no
                </button>
              </div>
            </div>
          </div>
        </div>
        <header className=" flex items-center justify-between my-[40px] mx-[40px]">
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
                onKeyDown={handleKeyDown}
                onChange={handleSearchChange}
                className="border-2 p-2 mr-2 border-primary w-64"
                placeholder="quick search"
              />
            </div>

            <button
              onClick={() => {
                navigate("/addmed");
              }}
              className="flex h-max items-center border-2 shadow-lg border-primary px-4 py-2 text-white bg-primary  font-extrabold uppercase"
            >
              <HiOutlinePlus className="mr-2" />
              add medicine
            </button>
          </div>
        </header>

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
                {search
                  ? lazyData &&
                    lazyData.medicine.length !== 0 &&
                    lazyData.medicine.map((item, index) => {
                      return (
                        <tbody className="" key={index}>
                          <tr className="">
                            <td>
                              <input
                                type="checkbox"
                                value={item.id}
                                onChange={(event) => {
                                  if (event.currentTarget.checked) {
                                    console.log("checked");
                                    console.log(event.currentTarget.value);

                                    // deleteMedicinesId.push(
                                    //   event.currentTarget.value
                                    // );
                                    addMedicineToDeleteList(
                                      event.currentTarget.value
                                    );
                                    console.log(
                                      `inserted : ${deleteMedicinesId}`
                                    );
                                  } else {
                                    // deleteMedicinesId = deleteMedicinesId.filter(
                                    //   (e) => e !== event.currentTarget.value
                                    // );
                                    removeMedicineFromDeleteList(
                                      event.currentTarget.value
                                    );
                                    console.log(
                                      `deleted : ${deleteMedicinesId}`
                                    );
                                  }
                                }}
                              />
                            </td>
                            <td className="">{item.medicine_name}</td>
                            <td className="">{item.generic_name}</td>
                            <td className="">{item.sku}</td>
                            <td className="">{item.weight}</td>
                            <td className="">{item.catagory}</td>
                            <td className="">{item.manufacturer}</td>
                            <td className="">{item.brand_name}</td>
                            <td className="">{item.price}</td>
                            <td className="">{item.amount_in_stock}</td>
                            <td className="">{item.expire_date}</td>
                            <td className="">active</td>
                            <td className="w-[10px]  cursor-pointer group  hover:bg-red-600 hover:text-white transition-all delay-75">
                              <div
                                onClick={() => {
                                  console.log("delete single");
                                  deleteSingleMedicine(item.id);
                                }}
                                className=" cursor-pointer"
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
                    })
                  : data.medicine.map((item, index) => {
                      return (
                        <tbody className="" key={index}>
                          <tr className="">
                            <td>
                              <input
                                type="checkbox"
                                value={item.id}
                                onChange={(event) => {
                                  if (event.currentTarget.checked) {
                                    console.log("checked");
                                    console.log(event.currentTarget.value);

                                    // deleteMedicinesId.push(
                                    //   event.currentTarget.value
                                    // );
                                    addMedicineToDeleteList(
                                      event.currentTarget.value
                                    );
                                    console.log(
                                      `inserted : ${deleteMedicinesId}`
                                    );
                                  } else {
                                    // deleteMedicinesId = deleteMedicinesId.filter(
                                    //   (e) => e !== event.currentTarget.value
                                    // );
                                    removeMedicineFromDeleteList(
                                      event.currentTarget.value
                                    );
                                    console.log(
                                      `deleted : ${deleteMedicinesId}`
                                    );
                                  }
                                }}
                              />
                            </td>
                            <td className="">{item.medicine_name}</td>
                            <td className="">{item.generic_name}</td>
                            <td className="">{item.sku}</td>
                            <td className="">{item.weight}</td>
                            <td className="">{item.catagory}</td>
                            <td className="">{item.manufacturer}</td>
                            <td className="">{item.brand_name}</td>
                            <td className="">{item.price}</td>
                            <td className="">{item.amount_in_stock}</td>
                            <td className="">{item.expire_date}</td>
                            <td className="">active</td>
                            <td className="w-[10px]  cursor-pointer group  hover:bg-red-600 hover:text-white transition-all delay-75">
                              <div
                                onClick={() => {
                                  console.log("delete single");
                                  deleteSingleMedicine(item.id);
                                }}
                                className=" cursor-pointer"
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

              <div
                className={`${flag === "error" && "text-red-600 "} ${
                  flag === "success" && "text-green-600"
                } text-black font-bold text-[18px] py-4 `}
              >
                {loading ? "sending" : message}
              </div>
              <div className="flex items-center self-end">
                <div className="error">
                  <p>{}</p>
                </div>
                <button
                  onClick={() => {
                    console.log("delete clicked");
                    // openModal();
                    // setList(deleteMedicinesId);
                    // deleteMedicinesId = [];
                    if (deleteMedicinesIdState.length !== 0) {
                      setShowModal(true);
                      console.log(`state array : ${deleteMedicinesIdState}`);
                    }

                    // deleteMultipleMedicine();
                  }}
                  className="  bg-[red] my-3 text-[14px] text-white px-4 py-2 font-bold "
                >
                  {showProgress ? <CircularProgress /> : "delete"}
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
