import { useState, useRef, useEffect } from "react";
import Button from "./utils/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation, gql } from "@apollo/client";
import { pharma_woman } from "../assets";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const SIGNUP = gql`
  mutation (
    $email: String!
    $name: String!
    $password: String!
    $pharmacy_name: String!
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      pharmacy_name: $pharmacy_name
    ) {
      id
      token
    }
  }
`;
const SignupPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const pharmacyNameRef = useRef(null);
  const locationRef = useRef(null);

  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [passwordVisibility, setPassordVisibility] = useState("password");

  const togglePasswordVisibility = () => {
    if (passwordVisibility === "password") {
      setPassordVisibility("text");
    } else setPassordVisibility("password");
  };

  const [signupMutation, { data, loading, error }] = useMutation(SIGNUP);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    signupMutation({
      variables: {
        email: data.email,
        name: data.name,
        password: data.password,
        pharmacy_name: data.pharmacyName,
      },
    })
      .then((value) => {
        console.log("sinup successful");
        console.log(value.data.signup.token);

        console.log(`value.data.signup.token}`);
        localStorage.setItem("token", value.data.signup.token);
        localStorage.setItem("id", value.data.signup.id);

        navigate("/");
      })
      .catch((err) => {
        console.log(`some error : ${err}`);
      });
    // handleLogin(data.email, data.password);
  });

  const signupUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const pharmacyName = pharmacyNameRef.current.value;
    const location = locationRef.current.value;

    if (name && email && password && pharmacyName && location) {
    } else {
      //all feilds should be provided
      //ena location add emyaregebet fildem yasfelegal after integrating google map
      console.log("all fields should be provided");
    }
  };

  // if (loading) return <div>loading...</div>;
  if (error) console.warn(error);

  const gotoLogin = () => {
    navigate("/login");
  };

  return (
    // <div className="flex justify-center items-center">
    <div className="flex justify-center items-center h-screen">
      <div className="flex  justify-between items-center w-full">
        {/* this is for login fields */}
        <div className="flex flex-1 flex-col ml-12 items-stretch  ">
          <div className="title flex  flex-col  self-start my-[80px] ">
            <h2 className="text-4xl text-primary font-bold uppercase font-poppins ">
              Dont have an Account?
            </h2>
            <p className="text-gray-500 text-xl">
              Please sign in with simple steps
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex  bg-white flex-col w-[500px]">
              <div className="mb-4">
                <label className="">Name*</label>
                <input
                  ref={nameRef}
                  type="text"
                  className={`${
                    errors.name ? "text-field-error" : "text-field-signup"
                  } `}
                  placeholder="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "*required",
                    },
                  })}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="">Email*</label>

                <input
                  ref={emailRef}
                  type="text"
                  className={`${
                    errors.email ? "text-field-error" : "text-field-signup"
                  } `}
                  placeholder="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "*please enter a proper email",
                    },
                    required: {
                      value: true,
                      message: "*required",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="">Pharmacy Name*</label>
                <input
                  ref={pharmacyNameRef}
                  type="text"
                  // className="text-field-signup"
                  className={`${
                    errors.pharmacyName
                      ? "text-field-error"
                      : "text-field-signup"
                  } `}
                  placeholder="pharmacy name"
                  {...register("pharmacyName", {
                    required: {
                      value: true,
                      message: "*required",
                    },
                  })}
                />
                {errors.pharmacyName && (
                  <span className="error-message">
                    {errors.pharmacyName.message}
                  </span>
                )}
              </div>
              {/* <div className="mb-4">
                <label className="">Location*</label>
                <input
                  ref={locationRef}
                  type="text"
                  className="text-field-signup"
                  // className={`${
                  //   errors.name ? "text-field-error" : "text-field-signup"
                  // } `}
                  placeholder="location"
                />
              </div> */}
              <LoadScript
                googleMapsApiKey={"AIzaSyDgNVT-sCtfUn1TPAuF8ompxW_gMlA5uLY"}
                libraries={["places"]}
              >
                <StandaloneSearchBox
                  onLoad={(ref) => (inputRef.current = ref)}
                  onPlacesChanged={handlePlaceChanged}
                >
                  <div className="mb-4">
                    <lable>enter you location name</lable>
                    <input
                      type="text"
                      className={`${
                        errors.password
                          ? "text-field-error"
                          : "text-field-signup"
                      } `}
                      placeholder="Location"
                      {...register("location", {
                        required: {
                          value: true,
                          message: "*requried",
                        },
                      })}
                    />
                    {errors.location && (
                      <span className="error-message">
                        {errors.location.message}
                      </span>
                    )}
                  </div>
                </StandaloneSearchBox>
              </LoadScript>

              <div className="flex-1 relative mb-4">
                <div className="mb-4">
                  <label className="">Password*</label>
                  <input
                    ref={passwordRef}
                    type={passwordVisibility}
                    // className="text-field-signup"
                    className={`${
                      errors.password ? "text-field-error" : "text-field-signup"
                    } `}
                    placeholder="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "*required",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="error-message">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    togglePasswordVisibility();
                  }}
                  className="absolute right-4 top-12"
                >
                  {passwordVisibility === "password" ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </button>
              </div>
              {error && <>{error.message}</>}
              <div className="flex justify-between">
                <button
                  className="mr-[10px] flex justify-center  uppercase py-[20px] rounded-xl flex-1  text-white bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
                  title="sighup"
                  onClick={() => {
                    onSubmit();
                    // signupUser();
                  }}
                >
                  {loading ? (
                    <CircularProgress size="1rem" style={{ color: "white" }} />
                  ) : (
                    "signup"
                  )}
                </button>
                <div className="flex-1 p-[2px]  rounded-2xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
                  <button
                    onClickCapture={() => {
                      gotoLogin();
                    }}
                    className="w-full h-full uppercase rounded-2xl bg-white"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1">
          <img src={pharma_woman} alt="pharmacy woman" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
