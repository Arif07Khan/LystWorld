import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import app_config from "../../config";
import Reloader from "./Reloader";


const ListPlatform = () => {
  const [name, setName] = useState("");
  const url = app_config.url;
  const [platformList, setPlatformList] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false)
  
  
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
    setLoading(true);
    if(!name){
      getDataFromBackend(() => {});
      setLoading(false);
      return;
    }
      getDataFromBackend((data) => {
        const filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(name.toLowerCase())
        );
        console.log(filteredData);
        setPlatformList(filteredData);
        if (filteredData.length > 0) {
          setPlatformList(filteredData);
          setLoading(false);
        }  else{
          toast.error("No data found");
          setLoading(false);
          setPlatformList(search)
          setName("")
          resetForm()
        }
        setLoading(false);
      });
      resetForm()
  };


  const displayPlatforms = () => {
    return (
      <div className="w-fit h-screen">
        {!listLoading? 
        <div className="flex justify-center  sticky top-16 ">
            <input
              type="search"
              className="focus:outline-none bg-white w-1/3 py-2 pl-5  placeholder:text-zinc-600  text-lg text-zinc-800  font-serif rounded-full " 
              value={name}
              onChange={e => {
                if(e.target.value === ""){
                  getDataFromBackend(() => {});
                }
                setName(e.target.value)
              }}
              placeholder="Search Here"
              onKeyDown={e => {
                if(e.key === "Enter"){
                  searchByName(e)
                }
              }}
              />{
                loading ? <i className="fas fa-sharp fa-solid fa-gear fa-spin h-4 w-4 mt-3 ml-3" ></i>
                :null
              }
              </div>:null}
             {!listLoading?
        <div  className="flex flex-wrap justify-around ">
          {platformList.map(({ _id, title, concise, thumbnail, link }) => (
            <div 
              className="max-w-sm mt-4 rounded-lg overflow-hidden shadow-lg  shadow-slate-700 bg-gray-50 "
              key={_id}
            >
              <img
                className="w-fit h-fit rounded-xl p-1"
                src={url + "/" + thumbnail}
                alt="Platform"
              />
              <div className="px-3 py-3">
                <div className="font-bold text-xl">{title}</div>
                <p className="text-gray-700 text-base mb-3">{concise}</p>
              </div>
              <div className="flex flex-wrap justify-evenly mb-3 ">
                <a
                  href={link}
                  rel="noreferrer" 
                  target="_blank"
                  className="py-1.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-gray-50 rounded-lg shadow-md shadow-gray-500 hover:shadow-none font-semibold"
                >
                  <i className="fa fa-thin fa-globe"></i>&nbsp;Visit
                </a>
                <Link
                  to={"/main/viewplatform/" + _id}
                  className="py-1.5 px-4 bg-blue-500 hover:bg-blue-400 rounded-lg text-gray-100 shadow-md shadow-gray-500 hover:shadow-none font-semibold"
                >
                  More Info.
                </Link>
              </div>
            </div>
          ))}
        </div>:
        <div className="h-screen">
         <Reloader/>
        </div>
             }
      </div>
    );
    }
  ;
  return( <div  className="container-fluid  p-0 m-0">{displayPlatforms()}</div>)
}


export default ListPlatform;
