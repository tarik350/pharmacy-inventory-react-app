import { useEffect, useState } from "react";
import { countryCode } from "../constants";

const NewsFeed = () => {
  const [appData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [active, setActive] = useState(0);

  const fetchNews = async (code) => {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${code}&category=health&apiKey=e09a4a6eee8a4f6684d1d6427225b1f4`
    );
    const data = await res.json();
    setData(data.articles);
  };
  useEffect(() => {
    fetchNews("ng");
  }, []);

  return (
    <div className=" ">
      <div>
        <h1 className="text-6xl font-bold font-poppins uppercase my-12  border-b-[2px] pb-12">
          news feed
        </h1>
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
              className={`border-2 m-4 px-8 py-2 rounded-full hover:bg-red-300 transition-all delay-75 cursor-pointer ${
                active === index ? "bg-red-400" : ""
              } `}
            >
              {code.name}
            </div>
          );
        })}
      </div>
      <div>
        {appData.map((item, index) => {
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
        })}
      </div>
    </div>
  );
};

export default NewsFeed;
