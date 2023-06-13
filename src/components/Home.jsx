import { useEffect } from "react";
import { pharma_woman } from "../assets";
import Auth from "./Auth";
import Card from "./utils/Card";
import { useLocation, useNavigate } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";

const GETUSER = gql`
  query getUser($uid: uuid!) {
    users(where: { id: { _eq: $uid } }) {
      email
      name
      pharmacy_name
      phone_number
      users_locations {
        address
      }
    }
  }
`;
const Home = () => {
  const autorized = localStorage.getItem("token");
  const navigate = useNavigate();
  const uid = localStorage.getItem("id");

  const { data, error, loading } = useQuery(GETUSER, {
    variables: { uid },
  });

  useEffect(() => {
    // console.log(`autorized: ${autorized} `);
    if (!autorized) {
      navigate("/login");
    } else {
      // console.log("authorized");
    }
  }, []);

  return (
    data && (
      <main className="flex flex-col mx-[40px] justify-center items-center   ">
        <div className="self-end my-8">{/* <Auth /> */}</div>
        <section className="flex  justify-center items-center flex-2 ">
          <div className="w-1/2 grow">
            <div className="bg-black w-max text-white px-4 rounded-full py-[3px]  font-extralight ">
              welcome
            </div>
            <p className="text-[80px] font-poppins  font-bold leading-[130%] bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 bg-clip-text inline-block text-transparent">
              Manage your Pharmacy with Samaritan
            </p>

            <p className=" leading-[150%] italic text-[20px] my-8 text-gray-500">
              At our pharmacy, we strive to provide the best service and meet
              all your medication needs. Our comprehensive inventory system
              ensures that we have a wide range of medicines available to cater
              to your requirements
            </p>

            <div className="flex items-center">
              <button
                onClick={() => {
                  navigate("/addmed");
                }}
                className="bg-black text-white px-6 py-4 mr-6"
              >
                Get Started
              </button>
              <p>
                not just an inventory system,{" "}
                <span className=" block font-poppins  font-bold leading-[130%] bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 bg-clip-text  text-transparent">
                  1 up for your buisness
                </span>
              </p>
            </div>
          </div>
          <div className="ml-24 w-[500px] h-[500px] ">
            <img
              className=" object-contain  "
              src={pharma_woman}
              alt="pharmcist woman"
            />
          </div>
          {/* for some rectangular card for the ui */}
        </section>
      </main>
    )
  );
};

export default Home;
