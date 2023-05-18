import { useState, useRef, useEffect } from "react";

import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Card from "./utils/Card";
import Button from "./utils/Button";
import { BsEmojiLaughing } from "react-icons/bs";
import useDidMountEffect from "./utils/useDidMountEffect";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const login = gql`
  query myQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

// let email = "";

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");

  const [passwordVisibility, setPassordVisibility] = useState("password");

  useDidMountEffect(() => {
    console.log(`email setted to : ${email}`);

    ///this only runs when both email and passwrod are changed

    ///there are times where the email is corret  and you want to
    ///change the password but it does not work

    refetch()
      .then((value) => {
        console.log(`refetch running`);
        console.log(`value retrned from backend: ${value.data}`);

        if (value.data) {
          console.log(`user has data`);
          //if there is a data
          localStorage.setItem("token", value.data.login.token);
          navigateHome();
        } else {
          //if the user not found
          const errorMessage = value.errors[0].message;
          console.log(`erorr from auth: ${errorMessage}`);
        }
      })
      .catch((erorr) => {
        //user not found
        console.log(`erorr from apollo: ${erorr}`);
      });
  }, [email, password]);

  // useEffect(, [email]);

  const { data, error, loading, refetch } = useQuery(login, {
    enabled: false,
    variables: {
      email,
      password,
    },
  });
  const navigate = useNavigate();
  //   const { enabled, setEnabled } = useState(false);

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const handleLogin = async () => {
    //add validation to check if the email and password value are
    //diffrent from null
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
  };

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
              login
            </h2>
          </div>
          <div className="flex  bg-white flex-col w-[400px]">
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
            <Button className="" title="Login" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
