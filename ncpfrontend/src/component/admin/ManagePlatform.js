import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import app_config from '../../config';


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
    <th colspan={1} className='text-center border-r-2 border-gray-500'>Details</th>
    <th colspan={1} className='text-yellow-700 border-r-2 border-gray-500'>Offers</th>
    <th colspan={1} className='text-cyan-500 border-r-2 border-gray-500'>Plans</th>
    <th colspan={1} className='text-red-500 border-r-2 border-gray-500'>Category</th> 
    <th colSpan={2} className="text-indigo-500 text-center ">Delete</th> 
  </tr>
</thead>
<tbody>
  {platformArray.map(({_id,title,describe,concise,offer,plan,createdAt,category,thumbnail,link})=>(
  <tr key={"_id"} className="border-2 border-gray-300 px-3 ">
    <td className="pl-4 pr-10">
      <div className="flex flex-wrap ">
        <img src={url+'/'+thumbnail} alt="NoCode" className='w-72'/>
        <div className="">
          <p className="font-semibold mb-1 text-gray-900  ">Title: &nbsp;{title}</p>
          <p className="font-semibold mb-1 text-blue-500">Describe:&nbsp;{describe}</p>
          <p className="font-semibold mb-1 text-red-500">Concise:&nbsp;{concise}</p>
          <p className="text-gray-500 mb-0 ">ID:&nbsp;{_id}</p>
          <p className="text-gray-500 mb-0">CreatedAt:&nbsp;{createdAt}</p>
          <p className="text-gray-500 mb-0">Link:&nbsp;{link}</p>
        </div>
      </div>
    </td>
    
    <td className=''>
      <span className="text-yellow-700">
        {offer}
      </span>
    </td>      
    
    <td className=''>
       <span className="text-cyan-600">
        {plan}
      </span>
    </td>
    <td> <span className="text-red-600">
        {category}
      </span>
    </td>
    <td>
      <button type="button" className="px-3 py-1 mr-2 bg-orange-400 text-gray-800 hover:bg-orange-300 rounded-lg shadow-md shadow-gray-500" >
       <Link to={"/admin/updateplatform/"+_id}>Edit</Link>
      </button>
    </td>
    <td>
      <button type="button" className="px-3 py-1 mx-2 bg-red-400 text-gray-800 hover:bg-red-300 rounded-lg shadow-md shadow-gray-500" onClick={()=>{deletePlatform(_id)}}>
       Delete
      </button>
    </td>
  </tr>
 
  ))}
  
</tbody>
</table>
)
}

return (
  
  <div className='container-fluid listplatform-height p-0 m-0'>
<div className='row'>
  <h1 className='text-center h3'>List Of Platform</h1>
    <div className='col-md'>{displayPlatforms()}</div></div>
  </div>
)
}

export default ManagePlatform