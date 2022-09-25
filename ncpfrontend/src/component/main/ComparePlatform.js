import React, { useEffect, useState } from 'react'
import app_config from '../../config'

const ComparePlatform = () => {
  
  const [name, setName] = useState("");
  const url=app_config.url;
  const [platformList, setPlatformList] = useState([]);
  const [nameList, setNameList] = useState([])
  
  const getDataFromBackend=(cb)=>{
  
    fetch(url+'/platform/showall').then(res=>res.json())
    .then(data => {
      cb(data);
      
    })
   
    };

    const searchByName =() => {
      
      getDataFromBackend((data)=>{
        const filteredData = data.filter((item)=>item.title.toLowerCase().includes(name.toLowerCase()));
        console.log(filteredData);
        setPlatformList(filteredData);
        setNameList(filteredData.map((item)=>item.title));
        
      })
    }

    useEffect(() => {
      getDataFromBackend( (data) => {
        console.log(data);
        setPlatformList(data);
      } ) ; 
    }, []);

  const displayPlatform=()=>{
    {
    return platformList.map((item)=>{
      <div className='w-1/2'>
        <div className='bg-gradient-to-tr from-slate-400 to-teal-200 px-2 shadow-2xl shadow-gray-500'>
          <h1 className='text-center mt-2 text-2xl font-bold' >{item.title}</h1>
          <img src={url+'/'+item.thumbnail} alt="platform" className='w-full h-96 object-cover' />
          <p className='text-center mt-2 text-2xl font-bold'>{item.concise}</p>
        </div>
      </div>
    }) 
  }
  }

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='flex justify-center'>
        <input type="search" className="w-50 mt-2 py-2 placeholder:text-stone-500 outline-double transition-all  rounded-md shadow-xl shadow-slate-400"  value={name} onChange={e => setName(e.target.value)} placeholder='Search Here' accept='text'/>
        <button className='bg-slate-400 h-10 mt-2 ml-2 rounded-full text-gray-900 px-2 shadow-lg ' onClick={searchByName}><i className=" fas fa-thin fa-magnifying-glass"></i></button>
      </div>
      <div className='flex w-full' >
        <div className='mx-auto'>
          {displayPlatform()}
        </div>
      </div>
    </div>
    

  )
}

export default ComparePlatform