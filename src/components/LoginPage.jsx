import { useState, useRef, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { NetworkStatus, gql, useLazyQuery, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import useDidMountEffect from "./utils/useDidMountEffect";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { pharma_woman } from "../assets";
import { RiContactsBookLine } from "react-icons/ri";
import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";

const login = gql`
  query myQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

const LoginPage = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async () => {
    console.log("login running ");

    if (email && password) {
      getLoginData({
        variables: {
          email,
          password,
        },
      })
        .then((value) => {
          if (value.data) {
            console.log(`user has data: ${value.data}`);

            //if there is a data
            localStorage.setItem("token", value.data.login.token);
            localStorage.setItem("id", value.data.login.id);

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
    } else {
      console.log("email and password can not be empty");
    }
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
        <div className="flex-1 flex flex-col  items-center ">
          <div className="title my-4   flex ">
            <h2 className="text-4xl  text-primary font-bold uppercase font-poppins ">
              login
            </h2>
          </div>
          <div className="flex  bg-white flex-col w-[500px]">
            <input
              // ref={emailRef}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              className="rounded-md w-full text-[16px] grow  border focus:outline-none focus:border-primary  border-gray-400  px-3 py-[20px]"
              placeholder="email"
            />
            <div className="flex-1 relative">
              <input
                // ref={passwordRef}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={passwordVisibility}
                className=" rounded-md my-4 w-full text-[16px] grow  border focus:outline-none focus:border-primary  border-gray-400  px-3 py-[20px] "
                placeholder="password"
              />
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
            <div className="error massage">
              {lazyError ? lazyError.message : ""}
            </div>
            <div className="flex justify-between">
              <button
                className="mr-[10px] flex justify-center  uppercase py-[20px] rounded-xl flex-1  text-white bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
                title="Login"
                onClick={() => {
                  handleLogin();
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
                  onClickCapture={() => {
                    gotoSignup();
                  }}
                  className="w-full h-full uppercase rounded-2xl bg-white"
                >
                  create account
                </button>
              </div>
            </div>
            {/* 
            <div className="flex">
              <p className="text-black">if you don't have an account</p>{" "}
              <button className="">signup</button>
            </div> */}
          </div>
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
