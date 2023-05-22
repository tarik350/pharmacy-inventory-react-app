import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { inventoryFields } from "../constants";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";
import { resultKeyNameFromField } from "@apollo/client/utilities";

const ADD_MEDICINE = gql`
  mutation (
    $medicineName: String!
    $medicinePrice: Int!
    $userId: uuid!
    $brandName: String!
    $amountInStock: Int!
  ) {
    insert_medicine_one(
      object: {
        name: $medicineName
        price: $medicinePrice
        user_id: $userId
        brand_name: $brandName
        amount_in_stock: $amountInStock
      }
    ) {
      id
      medicine_user {
        id
        name
      }
    }
  }
`;

const AddMedicine = () => {
  const autorized = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!autorized) {
      navigate("/login");
    } else {
      console.log("authorized");
    }
  }, []);

  const medNameRef = useRef(null);
  const medPriceRef = useRef(null);
  const brandNameRef = useRef(null);
  const stockAmountRef = useRef(null);

  const [price, setPrice] = useState("");

  const [addMedicineMutation, { data, loading, error }] =
    useMutation(ADD_MEDICINE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicineName = medNameRef.current.value;
    const medicinePrice = medPriceRef.current.value;
    const medicineBrandName = brandNameRef.current.value;
    const amountInStock = stockAmountRef.current.value;
    const userId = localStorage.getItem("id");

    if (medicineBrandName && medicineName && medicinePrice && amountInStock) {
      addMedicineMutation({
        variables: {
          amountInStock: amountInStock,
          brandName: medicineBrandName,
          medicineName: medicineName,
          medicinePrice: medicinePrice,
          userId: userId,
        },
      })
        .then((value) => {
          //medicine added successfully notification
          console.log(`medince added successfully`);
        })
        .catch((err) => {
          // alert(`error: ${err}`);
          console.log(`eror: ${err}`);
        });
    } else {
      //notify users elegantly
      //that they have to insert all the fields
    }
  };

  // const get_medicines = gql`
  //   query MyQuery {
  //     medicine {
  //       id
  //       name
  //       price
  //       brandName
  //       created_at
  //       updated_at
  //     }
  //   }
  // `;

  // const { loading, error, data } = useQuery(get_medicines);

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;

  //mutaions

  return (
    <div className="flex justify-center items-center">
      <div className="m-12 rounded-xl flex bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
        <div className="flex flex-col relative  bg-white w-full   m-[3px] border-2 p-12  shadow-2xl rounded-lg ">
          <div className="title">
            <h2 className="text-4xl text-primary font-bold uppercase font-poppins ">
              Add medicine to inventory
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            {/* first row */}
            <div className="containerDiv flex flex-col w-full">
              <div className="mt-12 flex">
                <div className="mr-4 grow">
                  <label className="lable">Name</label>
                  <input
                    className="text-field"
                    ref={medNameRef}
                    placeholder="medicine name"
                  />
                </div>
                <div className="mr-4 grow">
                  <label className="lable">brand</label>
                  <input
                    className="text-field"
                    ref={brandNameRef}
                    placeholder="brand name"
                  />
                </div>
                <div className="flex items-center relative   mr-4">
                  <div className="grow">
                    <label className="lable">SKU</label>
                    <input
                      className="text-field"
                      ref={medPriceRef}
                      placeholder="SKU"
                    />
                  </div>
                </div>

                <div className="grow">
                  <label className="lable ">Weight</label>
                  <input
                    type="number"
                    className="text-field"
                    ref={stockAmountRef}
                    placeholder="Weight"
                  />
                </div>
              </div>
              {/* second row */}
              <div className="mt-12 flex">
                <div className="mr-4 grow">
                  <label className="lable">Catagory</label>
                  <input
                    className="text-field"
                    ref={medNameRef}
                    placeholder="Catagory"
                  />
                </div>
                <div className="mr-4 grow">
                  <label className="lable">Manufacturer</label>
                  <input
                    className="text-field"
                    ref={brandNameRef}
                    placeholder="Manufacurer"
                  />
                </div>
                <div className="flex items-center relative  grow  mr-4">
                  <div className="grow">
                    <label className="lable">price</label>
                    <input
                      className="text-field"
                      ref={medPriceRef}
                      placeholder="price"
                    />
                  </div>
                  <p className="ml-2 lable absolute right-0 top-7 text-gray-300 p-2">
                    {" "}
                    Birr
                  </p>
                </div>

                <div className="">
                  <label className="lable">amount in stock</label>
                  <input
                    type="number"
                    className="text-field"
                    ref={stockAmountRef}
                    placeholder="how many in stock?"
                  />
                </div>
              </div>
              {/* third row */}
              <div className="mt-12 flex">
                <div className="mr-4">
                  <label className="lable">Expire Date</label>
                  <input
                    className="text-field"
                    ref={medNameRef}
                    placeholder="Expire Date"
                  />
                </div>
                <div className="mr-4">
                  <label className="lable">Staus</label>
                  <input
                    className="text-field"
                    ref={brandNameRef}
                    placeholder="Status"
                  />
                </div>
              </div>
            </div>
            end of text field
            <div className=" bg-gradient-to-r w-max  rounded-full p-[2px]  from-indigo-500 via-purple-500 to-pink-500   justify-end">
              <button
                onClick={(event) => {
                  handleSubmit(event);
                  // const token = localStorage.getItem("token");
                  // console.log("submitting");
                  // if (token) {
                  //   handleSubmit(event);
                  // } else {
                  //   alert("you have to login first");
                  // }
                }}
                type="submit"
                className="btn group px-[14px]   py-[12px]  "
              >
                <p className=" group-hover:bg-gradient-to-r  group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:inline-block group-hover:text-transparent group-hover:bg-clip-text">
                  add to inventory
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Define mutation

export default AddMedicine;
