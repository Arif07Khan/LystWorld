import {  Formik } from 'formik'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import app_config from '../../config'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'



const AddPlatform = () => {
  const [selFile, setSelFile] = useState("");
  const [fieldArray, setFieldArray] = useState([])

  const url=app_config.url;
 

  const addPlatform = async (formdata) => {
    formdata.thumbnail=selFile;
    console.log(formdata);
    
 const response=await fetch(url+'/platform/add',{
  method:'POST',
  body:JSON.stringify(formdata),
  headers:{'Content-Type':'application/json'}
})
if(response.status===200){

  Swal.fire({
    icon:"success",
    title:"Nice",
    text:"Platform Added",
  })
}else{
  Swal.fire({
    icon:"error",
    title:"Oops",
    text:"Something went wrong"
  })
  console.log(formdata);
}
}

const uploadFile = (e) => {
  const file = e.target.files[0];
  setSelFile(file.name);
  const fd = new FormData();
  fd.append("myfile", file);
  fetch(url + "/util/uploadfile", {
    method: "POST",
    body: fd,
  }).then((res) => {
    if (res.status === 200) {
      toast.success("Image Uploaded!!");
    }
  });
};

const valuesInput = {
  
    title:"",
    describe:"",
    concise:"",
    offer:[''],
    plan1:'',
    plan2:'',
    plan3:'',
    category:"",
    link:"",
    createdAt:new Date(),
  
}

  return (
    <div className=' flex justify-center '>
      <div className="mt-10  w-1/2 rounded-lg bg-gradient-to-tr from-slate-400 to-teal-200 px-2 shadow-2xl shadow-gray-500">
        <h1 className='text-center mt-2 text-2xl font-bold'>Add Platform</h1>
      <Formik initialValues={ valuesInput } onSubmit={addPlatform} > 
      {({ values,handleChange,handleSubmit })=>(
      <form  className="mt-2" onSubmit={handleSubmit} action="">
      <div className='flex flex-col' >
        <label className='mt-1 font-semibold' htmlFor="title">TITLE:-</label>
        <input className= "mb-2 rounded-lg px-2 py-1" type="text" value={values.title} onChange={handleChange} id="title" name='title' placeholder='Enter Here'/>
      </div>
      <div className='flex flex-col' >
        <label className='mt-1 font-semibold' htmlFor="describe">DESCRIPTION:-</label>
        <textarea className= "mb-2 rounded-lg px-2 py-1" type="text" value={values.describe} onChange={handleChange} id="describe" name='describe' placeholder='Enter Here'/>
      </div>
      <div className='flex flex-col'>
        <label className='mt-1 font-semibold' htmlFor="concise">Concise:-</label>
        <textarea className= "mb-2 rounded-lg px-2 py-1" type="text" value={values.concise} onChange={handleChange} id="concise" name="concise" placeholder='Enter Here'/>
      </div>
      <div className='flex flex-col'>
        <label className='mt-1 font-semibold' htmlFor="offer">PLAN:-</label>
        <input className="mb-2 rounded-lg px-2 py-1" type="text" value={values.plan1} onChange={handleChange} id="plan1" name='plan1' placeholder='Enter Here'/>
        <input className="mb-2 rounded-lg px-2 py-1" type="text" value={values.plan2} onChange={handleChange} id="plan2" name='plan2' placeholder='Enter Here'/>
        <input className="mb-2 rounded-lg px-2 py-1" type="text" value={values.plan3} onChange={handleChange} id="plan3" name='plan3' placeholder='Enter Here'/>
      </div>
      <div className='flex flex-col'>
        <label className='mt-1 font-semibold' htmlFor="offer">OFFER:-</label>
        <input className="mb-2 rounded-lg px-2 py-1" type="text" value={values.offer} onChange={handleChange} id="offer" name='offer' placeholder='Enter Here'/>
      </div>
      <div className='flex flex-col' >
        <label className='mt-1 font-semibold' htmlFor="category">CATEGORY:-</label>      
        <input className="mb-2 rounded-lg px-2 py-1" type="text" value={values.category} onChange={handleChange} id="category" name='category'  placeholder='Enter Here'/>
      </div>
      <div className='flex flex-col' >
        <label className='mt-1 font-semibold' htmlFor="link">Link:-</label>      
        <input className="mb-2 rounded-lg px-2 py-1" type="text" value={values.link} onChange={handleChange} id="link" name='link'  placeholder='Enter Here'/>
      </div>
      <div className='flex flex-col' >
        <label className='mt-1 font-semibold' htmlFor="images">IMAGES:-</label>
        <input className="bg-white rounded-lg mb-2" type="file"  onChange={uploadFile}  />
      </div>
      <motion.div whileTap={{scale:.8}} className='flex justify-center items-center mt-2 mb-2'>
      <button type='submit'  className='px-5 py-1 bg-blue-900 text-white rounded-full hover:bg-blue-600 mb-2'>Submit</button>
      </motion.div>
    
      </form>
      )}
      </Formik>
      </div>
      </div>
  )
}

export default AddPlatform