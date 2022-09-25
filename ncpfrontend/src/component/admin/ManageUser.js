import React from 'react'
import { useState,useEffect } from 'react';
import toast from "react-hot-toast"


const ManageUser = () => {
  const url='http://localhost:5000';
    
  const [userArray, setUserArray] = useState([]);

  // const nums =[43,54,5,3,55];

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

    
    return (<table className="table align-middle mb-0 bg-white">
    <thead className="bg-light">
      <tr>
        <th>Profile</th>
        <th>Email</th>
        <th>Password</th>
        <th>Action</th> 
      </tr>
    </thead>
    <tbody>
      {userArray.map(({_id,name,username,email,password,createdAt})=>(
      <tr key={"_id"}>
        <td>
          <div className="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style={{ width: 45, height: 45 }}
              className="rounded-circle"
            />
            <div className="ms-3">
              <p className="fw-bold mb-1 text-danger">Name: &nbsp;{name}</p>
              <p className="fw-bold mb-1 text-success">UserName:&nbsp;{username}</p>
              <p className="text-muted mb-0">ID:&nbsp;{_id}</p>
              <p className="text-muted mb-0">CreatedAt:&nbsp;{createdAt}</p>
            </div>
          </div>
        </td>
        
        <td>
          <span className="badge badge-success rounded-pill d-inline">
            {email}
          </span>
        </td>
        <td> <span className="badge badge-success rounded-pill d-inline">
            {password}
          </span>
        </td>
        <td>
          <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={()=>{deleteUser(_id)}}>
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
    <div className='row'>
      <h1>Table data</h1>
        <div className='col-md'>{displayUsers()}</div></div>
  )
}

export default ManageUser