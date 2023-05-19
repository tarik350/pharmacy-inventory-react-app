import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavBar = ({ children }) => {
  const [showNavBar, setShowNavbar] = useState(false);
  const location = useLocation();
  useEffect(() => {
    console.log(`location: ${location.pathname}`);

    if (location.pathname === "/login") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <div>{showNavBar && children}</div>;
};

export default ShowNavBar;
