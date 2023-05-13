import React from "react";

const Auth = () => {
  return (
    <div className="">
      <div className="flex ">
        <button className="px-8 py-2 border-2 rounded-full border-primary text-primary ">
          login
        </button>
        <button className="px-8 py-2 border-2 border-primary  bg-primary ml-2 text-white rounded-full">
          {" "}
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Auth;
