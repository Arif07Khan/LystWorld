import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import app_config from "../../config";
import Reloader from "./Reloader";
import Slider from "./Slider";



const ListPlatform = () => {
  const [name, setName] = useState("");
  const url = app_config.url;
  const [platformList, setPlatformList] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if(!name){
      getDataFromBackend(() => {});
      setLoading(false);
      return;
    }
      getDataFromBackend((data) => {
        const filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(name.toLowerCase()));
        console.log(filteredData);
        setPlatformList(filteredData);
        setNameList(data.filter((item) => item.title))
        setLoading(false);
        if (filteredData.length > 0) {
          setPlatformList(filteredData);
          setLoading(false);
        }  else{
          toast.error("No platform found");
          setLoading(false);
          setPlatformList(search)
          setName("")
        }
        setLoading(false);
      });
      resetForm()
  };



 
  const displayPlatforms = () => {
    return (
      <div className="h-max p-0 m-0">
        <Slider></Slider>
        <div className="flex justify-center  mb-5 mt-5">
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
              {
                loading ? <i className="fas fa-sharp fa-solid fa-gear fa-spin h-4 w-4 mt-3 ml-3" ></i>
                :null
              }
              </div>
             
           
             {!listLoading?
              <div className="flex flex-wrap justify-center">
        <div  className="grid lg:grid-cols-5 gap-5 mx-3">
          {platformList.map(({ _id, title, concise, thumbnail, link }) => (
            <div 
              className="max-w-md hover:rounded-lg overflow-hidden shadow-xl shadow-slate-200 bg-gray-50  mt-5 hover:scale-105 hover:transition hover:hover:text-emerald-900 hover:shadow-xl hover:shadow-slate-500 hover:cursor-pointer hover:duration-500 hover:ease-in-out hover:bg-purple-100"  
              key={_id}
            >
              <img
                className="w-2/3 h-2/3 rounded-xl  shadow-xl shadow-slate-200 m-1"
                src={url + "/" + thumbnail}
                alt="Platform"
              />
              <div className="px-3 py-3">
                <div className="font-bold text-xl">{title}</div>
                <p className="text-gray-700 text-serif mb-3">{concise}</p>
              </div>
              <div className="flex flex-wrap justify-evenly mb-3 ">
                <a href={link} className="bg-gray-300 px-5 pt-2 rounded-full hover:shadow-md hover:shadow-slate-600 " target="_blank">
                Visit &nbsp;<i class="fa fa-globe" aria-hidden="true"></i>
                </a>
                <Link
                  to={"/main/viewplatform/" + _id}
                  className="py-1.5 px-4 mt-1 bg-blue-500 hover:bg-blue-400 rounded-full text-gray-100 hover:shadow-md hover:shadow-gray-500 hove font-semibold"
                >
                  More Info.
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
