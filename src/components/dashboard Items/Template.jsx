import React from "react";
import FilledCard from "../utils/FilledCard";

const Template = ({ title, description, flag }) => {
  return (
    <div className="relative my-10">
      <div
        className={`${
          flag === "total" ? "" : "w-max"
        }  bg-white shadow-4xl border-[1px] border-black  rounded-lg h-[80px] px-2   flex flex-col justify-center`}
      >
        <div className="flex justify-center items-center relative top-[-55px]">
          <FilledCard flag={flag}>
            <div className="flex items-center justify-center  flex-col px-12 py-4 text-white ">
              <h2 className="heading-three"> {title}</h2>
            </div>
          </FilledCard>
        </div>
        <div className="self-center absolute top-[50px]">
          <p className="heading-four">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Template;
