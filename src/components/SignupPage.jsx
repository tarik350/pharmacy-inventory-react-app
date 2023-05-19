import { useState, useRef, useEffect } from "react";
import Button from "./utils/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignupPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [passwordVisibility, setPassordVisibility] = useState("password");

  const togglePasswordVisibility = () => {
    if (passwordVisibility === "password") {
      setPassordVisibility("text");
    } else setPassordVisibility("password");
  };
  return (
    <div className="flex justify-center items-center">
      <div className="m-12 w-max rounded-xl flex  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
        <div className="flex flex-col relative  bg-white w-full   m-[3px] border-2 p-12  shadow-2xl rounded-lg ">
          <div className="title flex justify-center my-4 ">
            <h2 className="text-4xl text-primary font-bold uppercase font-poppins ">
              Sign up
            </h2>
          </div>

          <div className="flex  bg-white flex-col w-[400px]">
            <input
              ref={emailRef}
              type="text"
              className="text-field"
              placeholder="name"
            />
            <input
              ref={emailRef}
              type="text"
              className="text-field"
              placeholder="email"
            />
            <input
              ref={emailRef}
              type="text"
              className="text-field"
              placeholder="pharmacy name"
            />
            <input
              ref={emailRef}
              type="text"
              className="text-field"
              placeholder="location"
            />
            <input
              ref={emailRef}
              type="text"
              className="text-field"
              placeholder="email"
            />
            <div className="flex-1 relative">
              <input
                ref={passwordRef}
                type={passwordVisibility}
                className="text-field"
                placeholder="password"
              />
              <button
                onClick={() => {
                  togglePasswordVisibility();
                }}
                className="absolute right-4 top-4"
              >
                {passwordVisibility === "password" ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible />
                )}
              </button>
            </div>
            <Button className="" title="signup" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
