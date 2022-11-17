import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { Formik,ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import * as Yup from 'yup';
import app_config from '../../config';
import './signup.css';

const validationSchema = Yup.object({
  name: Yup.string("").matches(/^[aA-zZ\s]+$/, "Name must be in alphabets").min(4, "More than 3 character").required('*Name is required'),
  username: Yup.string().length(10, "Atleast 10 character").required('*UserName is required'),
  email: Yup.string().email('Email is invalid').required('*Email is required')
  .test('email', 'Email already exists', async (value) => {
    const response = await fetch(app_config.url + "/user/checkemail", {
      method: "POST",
      body: JSON.stringify({ email: value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log('email found')
      return false;
    } else if(response.status === 404){ 
      console.log('email not found')
      return true;
    }
    else if(response.status === 400){
      console.log('email not found')
      return true;
    }
  }),
  password: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  "Password must contain at least 8 characters, one uppercase, one number and one special case character").required("*Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'),null], 'Passwords must match').required("*Password must match")
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const url = app_config.url;
  const navigate=useNavigate();

 const userSubmit = async(formdata,{resetForm}) => {
    setLoading(true);
  const response=await fetch(url+'/user/add',{
  method:'POST',
  body:JSON.stringify(formdata),
  headers:{'Content-Type':'application/json'}
})
if(response.status===200){
  Swal.fire({
    icon:"success",
    title:"Nice ",
    text:" You are register",
  })
  navigate('/main/login');
}else{
  Swal.fire({
    icon:"error",
    title:"Oops",
    text:"Something went wrong"
  })
}

setLoading(false);

};

  return (
    <div className="h-screen md:flex ">
    <div className="flex w-full bg-gradient-to-tr from-blue-800 to-purple-700  justify-around items-center ">
      <div className=" flex flex-col box-border w-2/3">
        <h1 className="text-gray-200  text-2xl font-sans ">Welcome to <strong  className='rounded-2xl p-0.5  bg-gradient-to-r from-purple-800 to-sky-800 italic' >LstyWorld</strong></h1>
        <p className="text-white mt-1">
          Here you can find all the platform that do not require coding for your work purpose
          <span><strong >No Code Platform </strong> are those where you just need to drag and drop the components and your website will be developed</span>
        </p>
      </div>
    </div>
    <div className="flex w-full h-full justify-evenly items-center bg-white">
      <Formik initialValues={{
      name:"",
      username:"",
      email:"",
      password:"",
      confirmPassword:"",
      IsAdmin:false,
      createAt:new Date(),
      }} 
      validationSchema={validationSchema}
      onSubmit={userSubmit}>
        {({ values, handleChange, handleSubmit,handleBlur}) => (
      <form className="bg-white" onSubmit={handleSubmit}>
        <img href="photo" hidden></img>
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hey!</h1>
        <p className="text-sm font-normal text-gray-600 mb-5">Sign Up Here</p>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <i className="fa fa-thin fa-circle-user text-gray-600"></i>
          <input
            className="pl-4 outline-none border-none"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter Name"
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        <div className='ml-5'>
        <ErrorMessage name="name" component="div" className="text-red-500  " />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-3">
       <i className="fa fa-thin fa-user text-gray-600"></i>
          <input
            className="pl-4 outline-none border-none"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Enter Username"
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        <div className='ml-5'>
        <ErrorMessage name="username" component="div" className="text-red-500 " />
        </div>
        <div className="flex items-center border-2 py-2 px-3  rounded-2xl mt-3">
        <i className="fa-thin fa-at text-gray-600"></i>
          <input
            className="pl-4 outline-none border-none"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter Email"
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        <div className='ml-5'>
        <ErrorMessage name="email" component="div" className="text-red-500 " />
        </div>
        <div className="flex items-center border-2 py-2 px-3 mt-3 rounded-2xl">
        <i className="fa fa-thin fa-lock text-gray-600"></i>
          <input
            className="pl-4 outline-none border-none"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="*********"
           onBlur={handleBlur}
            autoComplete="off"
            
          />
        </div>
        <div className='ml-5'>
        <ErrorMessage name="password" component="div" className="text-red-500 " />
        </div>
        <div className="flex items-center border-2 py-2 px-3 mt-3 rounded-2xl">
        <i className="fa fa-thin fa-lock text-gray-600"></i>
          <input
            className="pl-4 outline-none border-none"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            
          />
        </div>
        <div className='ml-5'>
        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 " />
        </div>
        {!loading ? 
        <motion.div whileTap={{scale:0.8}}>
        <button
          type="submit"
          className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
          Sign Up
        </button>
          </motion.div>:
          <button
          type="submit"
          className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 disabled:opacity-50"
          >
         <i className="fas fa-spinner fa-spin mr-4" aria-hidden="true"></i>
          Loading...
        </button>
          }
          <div className="flex justify-end mr-3">
          <p className='text-gray-600 text-sm'>
          Already Register ? <Link to="/main/login" className='text-md text-blue-700 hover:text-blue-600 cursor-pointer'>Login</Link>
          </p>
          </div>
      </form>
        )}
      </Formik>
    </div>
  </div>
  )
}

export default SignUp