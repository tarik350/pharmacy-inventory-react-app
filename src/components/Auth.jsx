import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(true);

  // const {
  //   getAccessTokenSilently,
  //   getIdTokenClaims,
  //   loginWithRedirect,
  //   logout,
  //   user,
  //   isAuthenticated,
  //   isLoading,
  //   error,
  // } = useAuth0();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoginStatus(false);
  };

  const token = localStorage.getItem("token");
  console.log(`token from auth:${token}`);

  if (token) {
    //return log out
    return (
      <button
        onClick={() => handleLogout()}
        className="px-8 py-2 mx-2 border-2  border-primary text-primary  ml-2 rounded-full"
      >
        LOG OUT
      </button>
    );
  } else {
    //return login
    return (
      <button
        onClick={() => handleLogin()}
        className="px-12 uppercase  py-2 border-2 rounded-full border-primary  bg-primary  text-white "
      >
        login
      </button>
    );
  }

  // return (
  //   <div className="">
  //     {/* this can be used for showing user prfile information */}
  //     {/* <div className="flex items-center ">
  //         <p>{user.name}</p>
  //         <div className="mx-2 overflow-hidden rounded-full border-2 w-[50px] h-[50px] flex justify-center items-center">
  //           <img className="  object-contain " src={user.picture} />
  //         </div>
  //       </div> */}
  //   </div>
  // );
};

export default Auth;
