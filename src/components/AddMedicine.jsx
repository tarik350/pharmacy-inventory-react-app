import { useState, useRef, useEffect, useReducer } from "react";
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
import { Editor } from "@tinymce/tinymce-react";
// import { DatePicker, Space } from "antd";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const priceRef = useRef(null);
  const brandNameRef = useRef(null);
  const stockAmountRef = useRef(null);
  const descriptionRef = useRef(null);
  const manufacturerRef = useRef(null);
  const skuRef = useRef(null);
  const weightRef = useRef(null);
  const statusRef = useRef(null);
  // const [price, setPrice] = useState("");

  const [addMedicineMutation, { data, loading, error }] =
    useMutation(ADD_MEDICINE);

  const [expireDate, setExpireDate] = useState("");
  const [catagory, setCatagory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicineName = medNameRef.current.value;
    const medicinePrice = priceRef.current.value;
    const medicineBrandName = brandNameRef.current.value;
    const amountInStock = stockAmountRef.current.value;
    const description = descriptionRef.current.getContent({ format: "text" });
    const sku = skuRef.current.value;
    const weight = weightRef.current.value;
    const status = statusRef.current.value;

    const manufacturer = manufacturerRef.current.value;

    // const userId = localStorage.getItem("id");

    console.log(`catagory selected : ${catagory}`);
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
    <div className="container">
      <div className="mx-[40px] my-[40px]">
        <div className="">
          <h1 className="text-black font-extrabold text-[28px]">
            Add Medicine.
          </h1>
          <p className="text-gray-500">
            You can add a medicine by fil these field.
          </p>
        </div>
      </div>
      <div className="flex mx-[40px] justify-center items-center   ">
        <div className="flex flex-1  rounded-xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
          <div className=" flex-col relative  bg-white w-full   m-[3px] border-2 p-12  shadow-2xl rounded-lg ">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              {/* first row */}
              <div className="containerDiv flex flex-col justify-center ">
                <div className="mb-8 flex">
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
                        ref={skuRef}
                        placeholder="SKU"
                      />
                    </div>
                  </div>

                  <div className="grow">
                    <div className="mr-4 ">
                      <label className="lable">Expire Date</label>

                      <DatePicker
                        className="rounded-md w-full text-[14px] grow  border focus:outline-none focus:border-primary  border-gray-400  px-3 py-[10px] "
                        popperProps={{
                          positionFixed: true, // use this to make the popper position: fixed
                          strategy: "fixed",
                        }}
                        portalId="root"
                        selected={expireDate}
                        selectsStart
                        startDate={expireDate}
                        placeholderText="Start Date"
                        // popoverAttachment={
                        //   smallScreen ? "bottom center" : undefined
                        // }
                        // popoverTargetAttachment={
                        //   smallScreen ? "top center" : undefined
                        // }
                        // popoverTargetOffset={smallScreen ? "0px 0px" : undefined}
                        // endDate={endDate}
                        onChange={(date) => {
                          console.log(`date is : ${date}`);
                          // setStartDate(date);
                          setExpireDate(date);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* second row */}
                <div className="mb-8 flex items-center">
                  <div className="mr-4 grow">
                    <label className="lable">Catagory</label>
                    <select
                      className="text-field"
                      name="dog-names"
                      id="dog-names"
                      value={catagory}
                      onChange={(value) => {
                        // console.log(`value is: ${value.target.value}`);
                        setCatagory(value.target.value);
                      }}
                    >
                      <option>select</option>
                      <option value="rigatoni">Rigatoni</option>
                      <option value="dave">Dave</option>
                      <option value="pumpernickel">Pumpernickel</option>
                      <option value="reeses">Reeses</option>
                    </select>
                  </div>
                  <div className="mr-4 grow">
                    <label className="lable">Manufacturer</label>
                    <input
                      className="text-field"
                      ref={manufacturerRef}
                      placeholder="Manufacturer"
                    />
                  </div>
                  <div className="flex items-center relative   mr-4">
                    <div className="grow">
                      <label className="lable">Price</label>
                      <input
                        className="text-field"
                        ref={priceRef}
                        placeholder="Price"
                      />
                    </div>
                    <p className="absolute right-0 px-2 top-8 text-gray-300">
                      Birr
                    </p>
                  </div>

                  <div className="grow">
                    <label className="lable ">Stock</label>
                    <input
                      type="number"
                      className="text-field"
                      ref={stockAmountRef}
                      placeholder="Stock"
                    />
                  </div>
                </div>
                {/* third row  */}

                <div className="mb-8 flex ">
                  <div className="mr-4">
                    <label className="lable ">Weight</label>
                    <input
                      type="text"
                      className="text-field"
                      ref={weightRef}
                      placeholder="Weight"
                    />
                  </div>
                  <div className="mr-4">
                    <label className="lable">Status</label>
                    <input
                      className="text-field"
                      ref={statusRef}
                      placeholder="Status"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="lable">Medicine description</label>
                <div className="z-0">
                  <Editor
                    apiKey="utllbsqr2qw8jfn1o7uj4rijs3puf8wd44tmv0ndfwsoyr5o"
                    // ref={descriptionRef}
                    onInit={(evt, editor) => (descriptionRef.current = editor)}
                    // outputFormat="text"
                    // initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                      height: 200,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </div>
              {/* end of text field */}

              <div className="self-end mt-12 bg-gradient-to-r w-max p-[2px]  from-indigo-500 via-purple-500 to-pink-500   justify-end">
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
    </div>
  );
};

// Define mutation

export default AddMedicine;
