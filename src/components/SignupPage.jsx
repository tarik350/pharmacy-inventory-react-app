import { useState, useRef, useEffect } from "react";
import Button from "./utils/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation, gql } from "@apollo/client";
import { pharma_woman } from "../assets";
import { useNavigate } from "react-router-dom";

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
  const pharmacy_nameRef = useRef(null);
  const locationRef = useRef(null);

  const navigate = useNavigate();

  const [passwordVisibility, setPassordVisibility] = useState("password");

  const togglePasswordVisibility = () => {
    if (passwordVisibility === "password") {
      setPassordVisibility("text");
    } else setPassordVisibility("password");
  };

  const [signupMutation, { data, loading, error }] = useMutation(SIGNUP);

  const signupUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const pharmacy_name = pharmacy_nameRef.current.value;
    const location = locationRef.current.value;

    signupMutation({
      variables: {
        email: email,
        name: name,
        password: password,
        pharmacy_name: pharmacy_name,
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
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{`error is : ${error.message}`}</div>;

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

          <div className="flex  bg-white flex-col w-[500px]">
            <input
              ref={nameRef}
              type="text"
              className="text-field-signup"
              placeholder="name"
            />
            <input
              ref={emailRef}
              type="text"
              className="text-field-signup"
              placeholder="email"
            />
            <input
              ref={pharmacy_nameRef}
              type="text"
              className="text-field-signup"
              placeholder="pharmacy name"
            />
            <input
              ref={locationRef}
              type="text"
              className="text-field-signup"
              placeholder="location"
            />

            <div className="flex-1 relative">
              <input
                ref={passwordRef}
                type={passwordVisibility}
                className="text-field-signup"
                placeholder="password"
              />
              <button
                onClick={() => {
                  togglePasswordVisibility();
                }}
                className="absolute right-4 top-6"
              >
                {passwordVisibility === "password" ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible />
                )}
              </button>
            </div>
            <button
              onClick={() => {
                console.log("signing up user");
                signupUser();
              }}
              className=" uppercase py-[20px] rounded-xl flex-1  text-white bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
            >
              signup
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img src={pharma_woman} alt="pharmacy woman" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
