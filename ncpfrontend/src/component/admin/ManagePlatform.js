import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import app_config from '../../config';
import { motion } from "framer-motion";



const ManagePlatform = () => {
  const url=app_config.url;
  
  const [platformArray, setPlatformArray] = useState([]);
  
  const getDataFromBackend=()=>{
    fetch(url+'/platform/showall').then(res=>res.json()).then(data=>{
        console.log(data);
        setPlatformArray(data)
    });
};
useEffect(() => {
  getDataFromBackend() ; 
}, []);
const deletePlatform=async (id)=>{
  const res=await fetch(url+"/platform/delete/"+id,{
    method:"DELETE",
  })
  if(res.status===200){
    toast.success('Successfully deleted!')
    getDataFromBackend();
  }
};

const displayPlatforms = () => { 

    
return (<table className=" align-middle mb-0 bg-white">
<thead className="">
  <tr className='border-2 border-gray-300'>
    <th colspan={1} className='text-center border-r-2 border-gray-300'>Details</th>
    <th colspan={1} className='text-zinc-800 border-r-2 border-gray-300'>Offers</th>
    <th colspan={1} className='text-zinc-800 border-r-2 border-gray-300'>Plans</th>
    <th colspan={1} className='text-zinc-800 border-r-2 border-gray-300'>Category</th> 
    <th colSpan={2} className="text-zinc-800 text-center">Delete</th> 
  </tr>
</thead>
<tbody>
  {platformArray.map(({_id,title,describe,concise,offer,plan1,plan2,plan3,createdAt,category,thumbnail,link})=>(
  <tr key={"_id"} className="border-2 border-gray-300 px-3">
    <td className="border-2 border-gray-300 pl-10 pr-10">
      <div className="flex flex-wrap ">
        <img src={url+'/'+thumbnail} alt="NoCode" className='w-72 outline mt-3 outline-1 rounded-md shadow-md shadow-slate-700'/>
        <div className='mt-3' >
          <p className="font-semibold mb-4 text-gray-700 text-lg"><strong className='font-bold text-gray-900'>Title:</strong>&nbsp;{title}</p>
          <p className="font-semibold mb-3 text-gray-700 text-md"><strong className='font-bold text-lg text-gray-900'>Description:</strong>&nbsp;{describe}</p>
          <p className="font-semibold mb-3 text-gray-700 text-md"><strong className='font-bold text-lg text-gray-900'>Concise:</strong>&nbsp;{concise}</p>
          <p className="text-gray-500 mb-0 ">ID:&nbsp;{_id}</p>
          <p className="text-gray-500 mb-0">CreatedAt:&nbsp;{createdAt}</p>
          <p className="text-gray-500 mb-0">Link:&nbsp;{link}</p>
        </div>
      </div>
    </td>
    
    <td className='border-2 border-gray-300 px-5'>
      <span className="text-gray-800">
        {offer}
      </span>
    </td>      
    
    <td className='border-2 border-gray-300 px-5'>
       <p className="text-gray-800">
        1.{plan1}
       </p>
        <p className="text-gray-800">
        2.{plan2}
        </p>
        <p className="text-gray-800">
        3.{plan3}
        </p>
    </td>
    <td className="border-2 border-gray-300 px-4"> 
      <span className="text-gray-800">
        {category}
      </span>
    </td>
    <td className='pl-5'>
      <motion.div whileTap={{scale:0.8}}>
      <button type="button" className="px-3 py-1 mr-2 bg-sky-200 text-gray-800 hover:bg-sky-300 rounded-lg shadow-md shadow-gray-500 hover:shadow-none" >
       <Link to={"/admin/updateplatform/"+_id}>
        <i className='fas fa-edit'></i>
       </Link>
      </button>
      </motion.div>
    </td>
    <td className="pr-5">
      <motion.div whileTap={{scale:0.8}}>
      <button type="button" className="px-3 py-1 mx-2 bg-red-200 text-gray-800 hover:bg-red-300 rounded-lg shadow-md shadow-gray-500 hover:shadow-none" onClick={()=>{deletePlatform(_id)}}>
        <i className='fas fa-trash'></i>
      </button>
      </motion.div>
    </td>
  </tr>
 
  ))}
  
</tbody>
</table>
)
}

return (
  
  <div className='p-0 m-0'>
<div >
    <div >{displayPlatforms()}</div></div>
  </div>
)
}

export default ManagePlatform