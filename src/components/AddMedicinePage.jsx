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
import Select from "react-select";

import { resultKeyNameFromField } from "@apollo/client/utilities";
import { Editor } from "@tinymce/tinymce-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { message } from "antd";
import { IoConstructOutline } from "react-icons/io5";
import Base from "antd/es/typography/Base";

const ADD_MEDICINE = gql`
  mutation (
    $stock: Int!
    $brandName: String!
    $catagory: String!
    $genericName: String!
    $manufacturer: String!
    $medicineName: String!
    $price: Int!
    $sku: String!
    $userId: uuid!
    $weight: String!
    $description: String!
    $expireDate: String!
  ) {
    insert_medicine(
      objects: {
        amount_in_stock: $stock
        brand_name: $brandName
        catagory: $catagory
        generic_name: $genericName
        manufacturer: $manufacturer
        medicine_name: $medicineName
        price: $price
        sku: $sku
        user_id: $userId
        weight: $weight
        description: $description
        expire_date: $expireDate
      }
    ) {
      returning {
        brand_name
        generic_name
        medicine_name
      }
    }
  }
`;

const AddMedicine = () => {
  const autorized = localStorage.getItem("token");
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState("");
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
  const genericNameRef = useRef(null);
  const skuRef = useRef(null);
  const weightRef = useRef(null);
  const statusRef = useRef(null);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9ca3af",
      minHeight: "30px",
      height: "45px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "40px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,

      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "40px",
    }),
  };
  const options = [
    { value: "Tablet", label: "Tablet" },
    { value: "Capsules", label: "Capsules" },
    { value: "Liquid", label: "Liquid" },
    { value: "Topical medicines", label: "Topical medicines" },
    { value: "Suppositories", label: "Suppositories" },
    { value: "Drops", label: "Drops" },
    { value: "Inhalers", label: "Inhalers" },
    { value: "Injections", label: "Injections" },
  ];

  const [addMedicineMutation, { data, loading, error }] =
    useMutation(ADD_MEDICINE);

  const [expireDate, setExpireDate] = useState("");
  const [catagory, setCatagory] = useState("");

  const handleAddSubmit = async (e) => {
    const medicineName = medNameRef.current.value;
    const medicinePrice = priceRef.current.value;
    const medicineBrandName = brandNameRef.current.value;
    const amountInStock = stockAmountRef.current.value;

    const sku = skuRef.current.value;
    const weight = weightRef.current.value;
    const price = priceRef.current.value;
    const genericName = genericNameRef.current.value;
    const status = statusRef.current.value;

    const manufacturer = manufacturerRef.current.value;

    console.log(`catagory selected : ${catagory}`);
    if (medicineBrandName && medicineName && medicinePrice && amountInStock) {
    } else {
    }
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const addMedicineToBackend = handleSubmit((data) => {
    const userId = localStorage.getItem("id");
    const description = descriptionRef.current.getContent({ format: "text" });

    addMedicineMutation({
      variables: {
        stock: data.stock,
        brandName: data.brandName,
        medicineName: data.medicineName,
        medicinePrice: data.price,
        userId: userId,
        catagory: data.catagory.value,
        manufacturer: data.manufacturer,
        weight: data.weight,
        sku: data.sku,
        description: description,
        genericName: data.genericName,
        price: data.price,
        expireDate: data.expiredDate,
      },
    })
      .then((value) => {
        setMessage("medicine added successfully");
        setFlag("success");
        //notify user
        console.log(`medince added successfully`);
        console.log("lsjkdflsjdflsjdflj");
        console.log(value.data.insert_medicine.returning[0]);
      })
      .catch((err) => {
        setMessage(`error sending the message: ${err.message}`);
        setFlag("error");
        //notify users
        console.log(`eror: ${err}`);
      });
  });

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
            <from onSubmit={(e) => e.preventDefault()}>
              <div className="container grid grid-cols-4 gap-y-[30px] gap-4">
                {/* <div className="first row flex mb-4"> */}
                <div className="mr-4 grow">
                  <label className="lable">Medicine Name</label>
                  <input
                    className="text-field"
                    ref={medNameRef}
                    placeholder="medicine name"
                    {...register("medicineName", {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  {errors.medicineName && (
                    <span className="error-message">
                      {errors.medicineName.message}
                    </span>
                  )}
                </div>
                <div className="mr-4 grow">
                  <label className="lable">Generic Name</label>
                  <input
                    className="text-field"
                    ref={genericNameRef}
                    placeholder="generic name"
                    {...register("genericName", {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  {errors.genericName && (
                    <span className="error-message">
                      {errors.genericName.message}
                    </span>
                  )}
                </div>
                <div className="mr-4 grow">
                  <label className="lable">Medicine brand</label>
                  <input
                    className="text-field"
                    ref={brandNameRef}
                    placeholder="brand name"
                    {...register("brandName", {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  {errors.brandName && (
                    <span className="error-message">
                      {errors.brandName.message}
                    </span>
                  )}
                </div>
                <div className="mr-4 ">
                  <label className="lable">Expire Date</label>
                  <Controller
                    control={control}
                    name="expiredDate"
                    rules={{ required: { value: true, message: "requried" } }}
                    render={({ field }) => (
                      <DatePicker
                        className="rounded-md w-full text-[14px] grow  border focus:outline-none focus:border-primary  border-gray-400  px-3 py-[10px] "
                        placeholderText="Select date"
                        onChange={(date) => {
                          field.onChange(date);
                        }}
                        selected={field.value}
                      />
                    )}
                  />
                  {errors.expiredDate && (
                    <span className="error-message">
                      {errors.expiredDate.message}
                    </span>
                  )}
                  {/* <DatePicker
                    className="rounded-md w-full text-[14px] grow  border focus:outline-none focus:border-primary  border-gray-400  px-3 py-[10px] "
                    portalId="root"
                    selected={expireDate}
                    // selectsStart
                    // startDate={expireDate}
                    placeholderText="Start Date"
                    onChange={(date) => {
                      console.log(`date is : ${date}`);
                      setExpireDate(date);
                    }}
                  />{" "} */}
                </div>

                <div className="mr-4 grow">
                  <label className="lable">Catagory</label>
                  <Controller
                    name="catagory"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "required",
                      },
                    }}
                    render={({ field }) => (
                      <Select
                        onMenuOpen={() => {
                          setMenuOpen(true);
                        }}
                        onMenuClose={() => {
                          setMenuOpen(false);
                        }}
                        {...field}
                        styles={customStyles}
                        isClearable
                        isSearchable={false}
                        classNamePrefix="dropdown"
                        options={options}
                      />
                    )}
                  />
                  {errors.catagory && (
                    <span className="error-message">
                      {errors.catagory.message}
                    </span>
                  )}
                </div>
                <div className="mr-4 grow">
                  <label className="lable">Manufacturer</label>
                  <input
                    className="text-field"
                    ref={manufacturerRef}
                    placeholder="Manufacturer"
                    {...register("manufacturer", {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  {errors.manufacturer && (
                    <span className="error-message">
                      {errors.manufacturer.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center relative   mr-4">
                  <div className="grow">
                    <label className="lable">Price</label>
                    <input
                      className="text-field"
                      ref={priceRef}
                      placeholder="Price"
                      {...register("price", {
                        required: {
                          value: true,
                          message: "required",
                        },
                      })}
                    />
                    {errors.price && (
                      <span className="error-message">
                        {errors.price.message}
                      </span>
                    )}
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
                    {...register("stock", {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  {errors.stock && (
                    <span className="error-message">
                      {errors.stock.message}
                    </span>
                  )}
                </div>
                <div className="mr-4">
                  <label className="lable ">Weight</label>
                  <input
                    type="text"
                    className="text-field"
                    ref={weightRef}
                    placeholder="Weight"
                    {...register("weight", {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  {errors.weight && (
                    <span className="error-message">
                      {errors.weight.message}
                    </span>
                  )}
                </div>
                <div className="mr-4">
                  <label className="lable">Status</label>
                  <input
                    className="text-field"
                    ref={statusRef}
                    placeholder="Status"
                    {...register("status", {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  {errors.status && (
                    <span className="error-message">
                      {errors.status.message}
                    </span>
                  )}
                </div>
                <div className="">
                  <label className="lable">SKU</label>
                  <input
                    className="text-field"
                    ref={skuRef}
                    placeholder="SKU"
                    {...register("sku", {
                      required: {
                        value: true,
                        message: "required",
                      },
                    })}
                  />
                  {errors.sku && (
                    <span className="error-message">{errors.sku.message}</span>
                  )}
                </div>
              </div>
              {/* CONTAINER END */}
              {/* text-field and button container */}
              <div className="flex flex-col mt-[30px] z-0">
                <div>
                  <label className="lable">Medicine description</label>
                  <div className="z-0">
                    <Editor
                      className="z-0"
                      apiKey="utllbsqr2qw8jfn1o7uj4rijs3puf8wd44tmv0ndfwsoyr5o"
                      // ref={descriptionRef}
                      onInit={(evt, editor) =>
                        (descriptionRef.current = editor)
                      }
                      // outputFormat="text"
                      // initialValue="<p>This is the initial content of the editor.</p>"
                      init={{
                        height: 250,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],

                        // toolbar:
                        //   "undo redo | formatselect | " +
                        //   "bold italic backcolor | alignleft aligncenter " +
                        //   "alignright alignjustify | bullist numlist outdent indent | " +
                        //   "removeformat | help",
                        toolbar: false,

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px z-index:0 }",
                      }}
                      onEditorChange={onchange}
                    />
                  </div>
                </div>
                <div
                  className={`${flag === "error" && "text-red-600 "} ${
                    flag === "success" && "text-green-600"
                  } text-black font-bold text-[18px] py-4 `}
                >
                  {loading ? "sending" : message}
                </div>

                <div className="self-end mt-12 bg-gradient-to-r w-max p-[2px]  from-indigo-500 via-purple-500 to-pink-500   justify-end">
                  <button
                    onClick={() => {
                      addMedicineToBackend();
                    }}
                    className="btn group px-[14px]   py-[12px]  "
                  >
                    <p className=" group-hover:bg-gradient-to-r  group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:inline-block group-hover:text-transparent group-hover:bg-clip-text">
                      add to inventory
                    </p>
                  </button>
                </div>
              </div>
            </from>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;

{
}
