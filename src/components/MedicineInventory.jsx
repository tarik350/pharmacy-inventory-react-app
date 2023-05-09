import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Card from "./utils/Card";
import { HiOutlinePlus } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

const GET_MEDICINE = gql`
  query get_med {
    medicine {
      name
      price
      id
      brandName
      amountInStock
    }
  }
`;

const DELETE_FUNCTION = gql`
  mutation ($id: uuid!) {
    delete_medicine_by_pk(id: $id) {
      name
      id
      price
      brandName
    }
  }
`;

const MedicineInventory = () => {
  const { loading, error, data } = useQuery(GET_MEDICINE, {
    pollInterval: 500,
  });

  const [mutateFunction, { deleteData, deleteLoading, deleteError }] =
    useMutation(DELETE_FUNCTION);

  const handleDelete = async (id) => {
    mutateFunction({
      variables: {
        id: id,
      },
    }).then((value) => {
      console.log(value);
      alert("medicine deleted successfull");
    });
  };

  if (loading) return "loading...";
  if (error) return `error : ${error}`;

  return (
    <div className="   ">
      <div className=" h-[100px] flex items-center justify-between mb-[]">
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
      <div className="border-2 p-4">
        <table className="table-auto   w-full">
          <tr>
            <th className="">Name</th>
            <th className="">brand name</th>
            <th className="">price</th>
            <th className="">stock</th>

            {/* <th>Catagory</th>
            <th>manufacturer</th>
            <th>price</th>
            <th>store</th>
            <th>expire date</th>
            <th>status</th> */}
            <th className="border-none bg-transparent "></th>
            <th className="border-none bg-transparent"></th>
          </tr>
          {data.medicine.map((item, index) => {
            return (
              <tr key={item.id} className="">
                <td className="">{item.name}</td>
                <td className="">{item.brandName}</td>
                <td className="">{item.price}</td>
                <td className="">{item.amountInStock}</td>
                <td className="w-[10px]  cursor-pointer group  hover:bg-red-600 hover:text-white transition-all delay-75">
                  <div
                    className=""
                    onClick={(event) => {
                      handleDelete(item.id);
                    }}
                  >
                    <RiDeleteBin6Line className="text-red-600 group-hover:text-white text-xl transition-all delay-75" />
                  </div>
                </td>{" "}
                <td className="w-[10px]  cursor-pointer group hover:bg-blue-600 transition-all delay-75 ">
                  <AiFillEdit className="text-blue-600 group-hover:text-white text-xl transition-all delay-75" />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default MedicineInventory;
