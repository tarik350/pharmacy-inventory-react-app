import { useEffect, useState } from "react";
import { countryCode } from "../constants";
import { CircularProgress } from "@mui/material";
import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";
import { AiFillWarning } from "react-icons/ai";

const NewsFeed = () => {
  const [appData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [active, setActive] = useState(0);
  const [message, setmessage] = useState(null);

  const newsApiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  const fetchNews = async (code) => {
    setIsLoading(true);
    setTimeout(() => {
      setmessage("some error occured");
      setIsLoading(false);
    }, 10000);
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${code}&category=health&apiKey=${newsApiKey}}`
    );
    const data = await res.json();
    setIsLoading(false);
    setData(data.articles);
  };

  useEffect(() => {
    fetchNews("ng");
  }, []);

  return (
    <div className="mx-[40px] my-[40px] ">
      <div className="">
        <h1 className="font-bold font-poppins  uppercase heading-one">
          news feed
        </h1>
        <div className="h-[1px] mb-8 mx-4 w-full bg-gray-500"></div>
      </div>
      <div className="flex">
        {countryCode.map((code, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setActive(index);
                fetchNews(code.code);

                console.log(index);
              }}
              className={`border-2 mx-4 px-8  py-2 flex justify-center items-center w-max rounded-full hover:bg-red-300 transition-all delay-75 cursor-pointer ${
                active === index ? "bg-red-400" : ""
              } `}
            >
              {code.name}
            </div>
          );
        })}
      </div>
      <div>
        {isLoading ? (
          appData ? (
            appData.map((item, index) => {
              return (
                <div key={index} className="border-2 m-4 p-2">
                  <div className="text-xl  font-extrabold ">{item.title}</div>
                  <div>{item.description}</div>

                  <div>{item.content}</div>
                  <div>{item.publishedAt}</div>
                  <div className="text-blue-400 ">
                    <a
                      target="_blank"
                      className="underline uppercase"
                      href={item.url}
                    >
                      go to source
                    </a>
                  </div>

                  <div
                    className="  font-extralight text-gray-400 italic
              "
                  >
                    {item.author} from {item.source.name}
                  </div>
                </div>
              );
            })
          ) : (
            <div></div>
          )
        ) : (
          <div className="flex relative justify-center items-center h-screen ">
            <div className="absolute top-[400px] ">
              {message ? (
                <div className="flex ites text-[20px] font-bold text-red-500 ">
                  {message}
                  <div className="px-2 flex items-center">
                    <AiFillWarning />
                  </div>
                </div>
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
