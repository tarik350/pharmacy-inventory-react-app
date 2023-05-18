import { useState } from "react";

import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Card from "./utils/Card";
import Button from "./utils/Button";

const login = gql`
  {
    login(email: "test2") {
      id
      token
    }
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  //   const { enabled, setEnabled } = useState(false);
  const { data, error, loading, refetch } = useQuery(login, {
    enabled: false,
  });

  //   const handleLogin = useCallback(() => {
  //     // Api request here
  //   }, []);
  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const handleLogin = async () => {
    console.log("login");
    refetch().then((value) => {
      console.log(value);
      localStorage.setItem("token", value.data.login.token);

      navigateHome();
    });
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
            <input type="text" className="text-field" placeholder="email" />
            <input
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
