import { pharma_woman } from "../assets";
import Card from "./utils/Card";

const Home = () => {
  return (
    <main className="flex items-center h-full">
      <section className="flex">
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
            <button className="bg-black text-white px-6 py-4 mr-2">
              Get Started
            </button>
            <p>
              not just an inventory system,{" "}
              <span className="block">1 up for your buisness</span>
            </p>
          </div>
        </div>
        <div className=" w-[500px] h-[500px] overflow-hidden rounded-full">
          <img
            className=" object-contain  "
            src={pharma_woman}
            alt="pharmcist woman"
          />
        </div>
        {/* for some rectangular card for the ui */}
        <div>
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default Home;
