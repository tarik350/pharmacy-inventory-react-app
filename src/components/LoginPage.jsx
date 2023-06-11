import { useState, useRef, useEffect, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { NetworkStatus, gql, useLazyQuery, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { pharma_woman } from "../assets";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import ShowModalContext from "../state/show-modal";

//we should get user info here
const login = gql`
  query myQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      email
      name
    }
    location {
      address
    }
  }
`;

const LoginPage = () => {
  let navigate = useNavigate();

  const userContext = useContext(ShowModalContext);
  const addUser = userContext.addUser;

  // const methods = useForm();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const { register } = useFormContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    handleLogin(data.email, data.password);
  });

  ///the problem here is the query runs every time the component mounts
  ///i only want the query to excute when i click the click button i thout i have implemented that

  const [passwordVisibility, setPassordVisibility] = useState("password");

  // console.log(loading);

  // const { data, error, loading, refetch, networkStatus } = useQuery(login, {
  //   // enabled: false,
  //   notifyOnNetworkStatusChange: true,
  //   variables: {
  //     email,
  //     password,
  //   },
  // });

  const [
    getLoginData,
    { loading: lazyLoading, error: lazyError, data: lasyData },
  ] = useLazyQuery(login);

  // const addMedicineToDeleteList = showModalContext.addList;

  const handleLogin = async (email, password) => {
    console.log("login running ");

    getLoginData({
      variables: {
        email,
        password,
      },
    })
      .then((value) => {
        if (value.data) {
          // console.log(`user name: ${value.data.login.name}`);
          // console.log(`user email: ${value.data.login.email}`);
          // console.log(`user address: ${value.data.location[0].address}`);

          const name = value.data.login.name;
          const email = value.data.login.email;
          const address = value.data.location[0].address;

          const user = { name: name, email: email, address: address };
          console.log(`=-=-=-=-=-=-=-=-=- before call`);

          // addUser(user);
          addUser(user);

          //if there is a data
          localStorage.setItem("token", value.data.login.token);
          localStorage.setItem("id", value.data.login.id);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("address", address);

          // navigateHome();
          navigate("/");
        } else {
          //if the user not found

          const errorMessage = value.errors[0].message;
          console.log(`erorr from auth: ${errorMessage}`);
        }
      })
      .catch((err) => {
        console.log(`error is : ${err}`);
      });
  };

  const togglePasswordVisibility = () => {
    if (passwordVisibility === "password") {
      setPassordVisibility("text");
    } else setPassordVisibility("password");
  };

  const gotoSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex  justify-between items-center w-full">
        {/* this is for login fields */}
        <div className="flex-1 flex flex-col  ml-12 ">
          <div className="title    flex flex-col self-start my-[80px] ">
            <h2 className="text-4xl  text-primary font-bold uppercase font-poppins ">
              Welcome Back!
            </h2>
            <p className="">Please Log into your account</p>
          </div>
          <form noValidate onSubmit={(e) => e.preventDefault()}>
            <div className="flex   flex-col w-[500px]">
              <input
                // ref={passwordRef}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                className={`${
                  errors.email ? " border-[2px] border-red-600" : "border"
                }  rounded-md mt-4 w-full text-[16px] grow   focus:outline-none focus:border-primary  border-gray-400  px-3 py-[20px] `}
                placeholder="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please provide a valid email",
                  },
                  required: {
                    value: true,
                    message: "*required",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
              <div className="flex-1 relative">
                <input
                  // ref={passwordRef}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={passwordVisibility}
                  className={`${
                    errors.password ? " border-[2px] border-red-600" : "border"
                  }  rounded-md mt-4 w-full text-[16px] grow   focus:outline-none focus:border-primary  border-gray-400  px-3 py-[20px] `}
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "*required",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}

                <button
                  onClick={() => {
                    togglePasswordVisibility();
                  }}
                  className="absolute right-4 top-10 "
                >
                  {passwordVisibility === "password" ? (
                    <AiFillEye size="18px" />
                  ) : (
                    <AiFillEyeInvisible size="18px" />
                  )}
                </button>
              </div>

              <div className="flex justify-between mt-2 mb-12">
                <div className="flex ">
                  <input className="" type="checkbox" />
                  <p className="mx-[4px]">Remember me</p>
                </div>
                <div>
                  <button className="text-[red]">Forget password?</button>
                </div>
              </div>
              <div className="text-[20px] text-[red] w-max px-[22px] my-2">
                {lazyError ? <blink>{lazyError.message}</blink> : ""}
              </div>
              <div className="flex justify-between">
                <button
                  className="mr-[10px] flex justify-center  uppercase py-[20px] rounded-xl flex-1  text-white bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
                  title="Login"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  {/* login */}
                  {lazyLoading ? (
                    <CircularProgress size="1rem" style={{ color: "white" }} />
                  ) : (
                    "login"
                  )}
                </button>
                <div className="flex-1 p-[2px]  rounded-2xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
                  <button
                    type="submit"
                    onClickCapture={() => {
                      // e.preventDefault();
                      gotoSignup();
                    }}
                    className="w-full h-full uppercase rounded-2xl bg-white"
                  >
                    signup
                  </button>
                </div>
              </div>
              {/* 
            <div className="flex">
              <p className="text-black">if you don't have an account</p>{" "}
              <button className="">signup</button>
            </div> */}
            </div>
          </form>
        </div>
        {/* this is for the image */}
        <div className="flex-1">
          <img className="  " src={pharma_woman} alt="pharmcist woman" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
