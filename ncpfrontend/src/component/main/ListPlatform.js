import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import app_config from "../../config";
import Reloader from "./Reloader";
import Slider from "./Slider";
import "./listPlatform.css";



const ListPlatform = () => {
  const [name, setName] = useState("");
  const url = app_config.url;
  const [platformList, setPlatformList] = useState([]);
  const [search, setSearch] = useState([]);
  const [listLoading, setListLoading] = useState(false)
  const [nameList, setNameList] = useState([])
  
  
  const getDataFromBackend = (cd) => {
    setListLoading(true)
    fetch(url + "/platform/showall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlatformList(data)
        cd(data);
        setListLoading(false)
      });
  };

  useEffect(() => {
    getDataFromBackend((data) => {
      setPlatformList(data);
      setSearch(data);  
    });
  }, []);

  const searchByName = ({resetForm}) => {
    if(!name){
      getDataFromBackend(() => {});
      toast.error("Please enter a platform name");
      return;
    }
      getDataFromBackend((data) => {
        const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(name.toLowerCase()));
        console.log(filteredData);
        setPlatformList(filteredData);
        setNameList(data.filter((item) => item.title))
        if (filteredData.length > 0) {
          setPlatformList(filteredData);
        }  else{
          toast.error("No platform found");
          setPlatformList(search)
          setName("")
        }
      });
      resetForm()
  };



 
  const displayPlatforms = () => {
    return (
      <div className="h-max p-0 m-0">
        <Slider></Slider>
        <div className="flex justify-center mt-10 ml-10">
            <input
              type="search"
              className="focus:outline-none bg-white w-[300px] md:w-1/3 py-2 pl-5  placeholder:text-zinc-600  text-lg text-zinc-800  font-serif rounded-full " 
              value={name}
              onChange={e => {
                if(e.target.value === ""){
                  getDataFromBackend(() => {});
                }
                setName(e.target.value)
              }}
              placeholder="Search"
              onKeyDown={e => {
                if(e.key === "Enter"){
                  searchByName(e)
                }
              }}
            
              />
              <button>
                <i className="fas fa-search text-2xl text-zinc-800 ml-2" onClick={searchByName}></i>
              </button>
              </div>
             {!listLoading?
              <div className="flex flex-wrap justify-center mx-14">
        <div  className="grid lg:grid-cols-4 gap-10 mb-10">
          {platformList.map(({ _id, title, concise, thumbnail, link }) => (
            <div 
              className="max-w-md hover:rounded-lg overflow-hidden shadow-xl shadow-slate-200 bg-gray-50  mt-5 hover:scale-105 hover:transition hover:hover:text-emerald-900 hover:shadow-xl hover:shadow-slate-500 hover:cursor-pointer hover:duration-500 hover:ease-in-out hover:bg-purple-100"  
              key={_id}
            >
              <img
                className="w-fit h-[200px] rounded-xl  shadow-xl shadow-slate-200 m-1"
                src={url + "/" + thumbnail}
                alt="Platform"
              />
              <div className="px-3 py-3">
                <div className="font-bold text-xl overflow-hidden ">{title}</div>
                <p className="text-gray-700 text-serif mb-3 list_concise">{concise}</p>
              </div>
              <div className="flex flex-wrap justify-evenly mb-2">
                <a href={link} className="bg-gray-300 py-1 px-5 rounded-full hover:shadow-md hover:shadow-slate-600 " target="_blank">
                <i className="fas fa-globe" aria-hidden="true"></i>
                </a>
                <Link
                  to={"/main/viewplatform/" + _id}
                  className="py-1 px-5 mt-1 bg-blue-500 hover:bg-blue-400 rounded-full text-gray-100 hover:shadow-md hover:shadow-gray-500 hove font-semibold">
                  <i className="fas fa-eye" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        </div>:
        <div className="h-screen">
         <Reloader/>
        </div>
             }
      </div>
    );
    }
  ;
  return( <div  className="container-fluid  p-0 m-0">
    
    {displayPlatforms()}
    </div>)
}


export default ListPlatform;
