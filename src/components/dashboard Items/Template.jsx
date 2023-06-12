import React from "react";
import FilledCard from "../utils/FilledCard";

const Template = ({ title, description, flag }) => {
  return (
    <div>
      <div className="relative p-12">
        <div
          className={`${
            flag === "total" ? "" : "w-max"
          }  bg-white shadow-4xl p-4 border-[1px] border-black  rounded-lg  h-max flex flex-col justify-center`}
        >
          <div className="flex justify-center items-center relative top-[-60px]">
            <FilledCard>
              <div className="flex items-center justify-center flex-col px-12 py-4 text-white ">
                <h2 className="heading-two"> {title}</h2>
              </div>
            </FilledCard>
          </div>
          <div className="self-center">
            <p className="heading-three">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
