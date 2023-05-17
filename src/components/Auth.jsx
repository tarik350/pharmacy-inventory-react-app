import { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { json } from "react-router-dom";

const Auth = () => {
  const {
    getAccessTokenSilently,
    getIdTokenClaims,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   getAccessTokenSilently().then((value) => {
  //     localStorage.setItem("token", value);
  //   });
  // }, []);

  // // console.log(user);
  // // console.log(isAuthenticated);

  // if (isLoading) return <div>loading ...</div>;
  // let accessToken = "";

  // const idToken = getIdTokenClaims().then((value) => console.log(value.__raw));
  // console.log(`id token: ${idToken}`);

  // if (error) return <div>{error.message}</div>;

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => loginWithRedirect()}
        className="px-8 py-2 border-2 rounded-full border-primary text-primary "
      >
        login
      </button>
    );
  } else {
    return (
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center ">
          <p>{user.name}</p>
          <div className="mx-2 overflow-hidden rounded-full border-2 w-[50px] h-[50px] flex justify-center items-center">
            <img className="  object-contain " src={user.picture} />
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="px-8 py-2 border-2 border-primary  bg-primary ml-2 text-white rounded-full"
        >
          LOG OUT
        </button>
      </div>
    );
  }
};

export default Auth;
