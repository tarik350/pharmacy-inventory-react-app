import { pharma_woman } from "../assets";
import Auth from "./Auth";
import Card from "./utils/Card";

const Home = () => {
  return (
    <main className="flex flex-col items-center  h-full">
      <div className="  self-end my-8">
        <Auth />
      </div>
      <section className="flex justify-center items-center flex-2 ">
        <div className="w-1/2">
          <div className="bg-black w-max text-white px-4 rounded-full py-[3px]  font-extralight ">
            welcome
          </div>
          <p className="text-[80px] font-poppins  font-bold leading-[130%] bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 bg-clip-text inline-block text-transparent">
            Manage your Pharmacy with Samaritan
          </p>

          <p className=" leading-[150%] my-8 text-gray-500">
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum{" "}
          </p>

          <div className="flex items-center">
            <button className="bg-black text-white px-6 py-4 mr-6">
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
  );
};

export default Home;
