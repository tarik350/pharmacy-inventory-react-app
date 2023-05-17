import { useState } from "react";

import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
    <div>
      <input className="p-4 m-2 border-2" type="text" />
      <input className="p-4 m-2 border-2 border-black" type="text" />
      <button onClick={() => handleLogin()} className="border-2">
        login
      </button>
    </div>
  );
};

export default LoginPage;
