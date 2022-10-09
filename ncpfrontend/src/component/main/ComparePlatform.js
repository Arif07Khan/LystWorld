import React, { useEffect, useState } from 'react'
import app_config from '../../config'

const ComparePlatform = () => {
  
  const [name, setName] = useState("");
  const url=app_config.url;
  const [platformList, setPlatformList] = useState([]);
  const [filterList, setFilterList] = useState([])
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
        // if(filterList.includes(filteredData[0]._id))
        setFilterList([...filterList, filteredData[0]])
        
      })
    }


    useEffect(() => {
      getDataFromBackend( (data) => {
        console.log(data);
        setPlatformList(data);
        setNameList(data.map((item)=>item.title));
        console.log(data.map((item)=>item.title));
      } ) ; 
    }, []);
    
    const removeList=(id)=>{
      setFilterList([])
    }

    const diaplayData=()=>{
      return<div className='container-fluid h-max w-fit mx-5 mt-10'>
          <div className='grid grid-cols-3 gap-5 '>
            
        {filterList.map(({_id,title,describe,plan,offer,category}, )=>(
          <div className='bg-white rounded-xl px-5 py-2 shadow-xl hover:transition hover:duration-500 hover:ease-in-out hover:scale-105 hover:cursor-pointer'>
          <div className='flex justify-end'>
          <i class="fa fa-xing" aria-hidden="true" onClick={removeList} ></i>
          </div>
              <div className='text-lg my-2  hover:transition hover:duration-500 hover:translate-x-2'><strong className='text-gray-800 text-xl'>Name:</strong> &nbsp;{title}</div>
              <div className='my-2 '><strong className='text-gray-800'>Description:</strong> &nbsp;{describe}</div>
              <div className='my-2'><strong className='text-gray-800'>Plan:</strong> &nbsp;{plan}</div>
              <div className='my-2'><strong className='text-gray-800'>Offer:</strong> &nbsp;{offer}</div>
              <div className='my-2'><strong className='text-gray-800'>Category:</strong> &nbsp;{category}</div>
              </div>
              ))}
              </div>
        </div>
        }

      
      
        

  

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='flex justify-center'>
        <input  type="search" list="nameList" className="w-50 mt-2 py-2 placeholder:text-stone-500 outline-double transition-all  rounded-md shadow-xl shadow-slate-400"  value={name} onChange={e => setName(e.target.value)} placeholder='Search Here' accept='text'/>
        <button className='bg-slate-400 h-10 mt-2 ml-2 rounded-full text-gray-900 px-2 shadow-lg ' onClick={searchByName}  ><i className=" fas fa-thin fa-magnifying-glass"></i></button>
        <datalist id="nameList">
          {nameList.map((item, index) => (
            <option key={index} value={item.title}>{item.title}</option>
            ))}
        </datalist>
      </div>
      <div className='flex w-full' >
        <div className='mx-auto'> 
        {diaplayData()}
        </div>
      </div>
    </div>
    

  )
}

export default ComparePlatform