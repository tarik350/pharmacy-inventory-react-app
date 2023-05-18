import React from "react";

const SignupPage = () => {
  const componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };

  componentDidMount();
  return <div>signup page</div>;
};

export default SignupPage;
