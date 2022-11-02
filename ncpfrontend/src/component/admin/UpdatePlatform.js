import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import app_config from '../../config';


const UpdatePlatform=()=>{
  const [platformUpdate, setPlatformUpdate] = useState("")
  const [loading, setLoading] = useState(false);
  
  const url=app_config.url;

  const {id} = useParams();
  console.log(id);

  const getdataformBackEnd =()=>{
    setLoading(true);
    fetch(url+'/platform/getbyid/'+id)
    .then((response) => {
      if(response.status===200){
        return response.json()
   }})
   .then((data)=>{
     console.log(data);
     setPlatformUpdate(data);
      setLoading(false);
   })
  }

   useEffect(() => {
    getdataformBackEnd(); 
}, []);




  const submitPlatform = async(formdata) => { 
    console.log(formdata);
    const res=await fetch(url+'/platform/update/'+id,{
      method:'PUT',
      body:JSON.stringify(formdata),
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(res.status===200){
      Swal.fire({
        icon:'success',
        title:'Updated',
        text:'User Updated'
      })
      getdataformBackEnd()
    }
   }

if(!loading){
  return <div className=' container flex flex-col items-center justify-evenly'>
  <div className=' w-50 mt-10 rounded-lg bg-gradient-to-tr from-slate-400 to-teal-200 px-2 shadow-2xl shadow-gray-500'>
     <h1 className='text-center mt-2 text-2xl font-bold' >Edit Platform</h1>
   <Formik initialValues={platformUpdate} onSubmit={submitPlatform} > 
   {({ values,handleChange,handleSubmit })=>(
     <form  className="mt-2" onSubmit={handleSubmit} action="">
   <div className='flex flex-col' >
     <label className='mt-1 font-semibold' htmlFor="title">TITLE:-</label>
     <input className= "mb-2 rounded-lg px-2 py-1 " type="text" value={values.title} onChange={handleChange} id="title" name='title' placeholder='Enter Here'/>
   </div>
   <div className='flex flex-col' >
     <label className='mt-1 font-semibold' htmlFor="describe">DESCRIPTION:-</label>
     <textarea className= "mb-2 rounded-lg px-2 py-1 "  type="text" value={values.describe} rows="3" cols="100" onChange={handleChange} id="describe" name='describe' placeholder='Enter Here'/>
   </div>
   <div className='flex flex-col' >
     <label className='mt-1 font-semibold' htmlFor="concise">Concise:-</label>
     <textarea className= " mb-2 rounded-lg px-2 py-1 "  type="text" value={values.concise} onChange={handleChange} id="concise" name='concise'  placeholder='Enter Here'/>
   </div>
   <div className='flex flex-col' >
     <label className='mt-1 font-semibold' htmlFor="offer">OFFER:-</label>
     <input className=" mb-2 rounded-lg px-2 py-1 " type="text" value={values.offer} onChange={handleChange} id="offer" name='offer' placeholder='Enter Here'/>
   </div>
   <div className='flex flex-col' >
     <label className='mt-1 font-semibold' htmlFor="plan">PLAN:-</label>
     <input className=" mb-2 rounded-lg px-2 py-1 " type="text" value={values.plan1} onChange={handleChange}  id="plan1" name='plan1' placeholder='Enter Here'/>
     <input className=" mb-2 rounded-lg px-2 py-1 " type="text" value={values.plan2} onChange={handleChange}  id="plan2" name='plan2' placeholder='Enter Here'/>
     <input className=" mb-2 rounded-lg px-2 py-1 " type="text" value={values.plan3} onChange={handleChange}  id="plan3" name='plan3' placeholder='Enter Here'/>
   </div>
   <div className='flex flex-col' >
     <label className='mt-1 font-semibold' htmlFor="category">CATEGORY:-</label>      
     <input className=" mb-2 rounded-lg px-2 py-1 " type="text" value={values.category} onChange={handleChange} id="category" name='category'  placeholder='Enter Here'/>
   </div> 
   <div className=' flex justify-center items-center mt-2 mb-2'>
   <button type="Submit" className='bg-blue-800 px-5 py-1 rounded-lg text-white hover:bg-blue-500' >Update</button>
   </div>
   </form>
   )}
   </Formik>
   </div>
    </div>

  }
}

export default UpdatePlatform;