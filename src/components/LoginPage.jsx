import { useState, useRef, useEffect } from "react";

import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Card from "./utils/Card";
import Button from "./utils/Button";
import { BsEmojiLaughing } from "react-icons/bs";
import useDidMountEffect from "./utils/useDidMountEffect";

const login = gql`
  query myQuery($email: String!) {
    login(email: $email) {
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
  // const [password, setPassword] = useState("");

  useDidMountEffect(() => {
    console.log(`email setted to : ${email}`);

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
  }, [email]);

  // useEffect(, [email]);

  const { data, error, loading, refetch } = useQuery(login, {
    enabled: false,
    variables: {
      email,
    },
  });
  const navigate = useNavigate();
  //   const { enabled, setEnabled } = useState(false);

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const handleLogin = async () => {
    setEmail(emailRef.current.value);
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
          <div className="flex items-center justify-center bg-white flex-col w-[300px]">
            <input
              ref={emailRef}
              type="text"
              className="text-field"
              placeholder="email"
            />
            <input
              ref={passwordRef}
              type="password"
              className="text-field"
              placeholder="password"
            />
            <Button className="" title="Login" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
