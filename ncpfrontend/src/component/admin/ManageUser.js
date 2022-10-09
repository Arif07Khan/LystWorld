import React from 'react'
import { useState,useEffect } from 'react';
import toast from "react-hot-toast"


const ManageUser = () => {
  const url='http://localhost:5000';
    
  const [userArray, setUserArray] = useState([]);


  const getDataFromBackend=()=>{
      fetch(url+'/user/showall').then(res=>res.json()).then(data=>{
          console.log(data);
          setUserArray(data)
      });
  };

  const deleteUser=async (id)=>{
    const res=await fetch(url+"/user/delete/"+id,{
      method:"DELETE",
    })
    if(res.status===200){
      toast.success('Successfully deleted!')
      getDataFromBackend();
    }
  };

  useEffect(() => {
    getDataFromBackend() ; 
}, []);


  const displayUsers = () => { 

    
    return (
    <table className="w-screen bg-white">
    <thead className="">
      <tr>
        <th className=''>Profile</th>
        <th>Email</th>
        <th>Action</th> 
      </tr>
    </thead>
    <tbody>
      {userArray.map(({_id,name,username,email,password,createdAt})=>(
      <tr key={"_id"} className="border-b-2 border-gray-300">
        <td className='p-2'>
          <div className="flex items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style={{ width: 45, height: 45 }}
              className="rounded-full mx-2"
            />
            <div className="ms-3">
              <p className="mb-1 text-red-500">Name: &nbsp;{name}</p>
              <p className="mb-1 text-purple-500">UserName:&nbsp;{username}</p>
              <p className="mb-0 text-red-900">ID:&nbsp;{_id}</p>
              <p className="mb-0 text-purple-900">CreatedAt:&nbsp;{createdAt}</p>
            </div>
          </div>
        </td>
        
        <td>
          <span className="">
            {email}
          </span>
        </td>
        <td>
          <button type="button" className="bg-red" onClick={()=>{deleteUser(_id)}}>
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
    <div className='container'>
      <h1>Table data</h1>
        <div className=''>{displayUsers()}</div>
        </div>
  )
}

export default ManageUser