import React from 'react'
import { Formik,ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import * as Yup from 'yup';
import app_config from '../../config';

const validationSchema = Yup.object({
  name: Yup.string("").matches(/^[aA-zZ\s]+$/, "Name must be in alphabets").required('*Name is required'),
  username: Yup.string().length(10,"Atleast 10 character").matches(  ).required('*UserName is required'),
  email: Yup.string().email('Email is invalid').required('*Email is required'),
  password: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  "Password must contain at least 8 characters, one uppercase, one number and one special case character").required("*Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'),null], 'Passwords must match').required("*Password must match")
});

const SignUp = () => {
  const url = app_config.api_url;
  const navigate=useNavigate();

 const userSubmit = async(formdata,{resetForm}) => {
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
}else{
  Swal.fire({
    icon:"error",
    title:"Oops",
    text:"Something went wrong"
  })
}
resetForm();
navigate('/main/login');
};

  return (
    <div className="h-screen md:flex ">
    <div className="flex w-full bg-gradient-to-tr from-blue-800 to-purple-700  justify-around items-center ">
      <div className=" flex flex-col box-border w-2/3">
        <h1 className="text-gray-200  text-2xl font-sans ">Welcome to <strong  className='rounded-2xl p-0.5  bg-gradient-to-r from-purple-800 to-sky-800 italic' >LstyWorld</strong></h1>
        <p className="text-white mt-1">
          Here you can find all the platform that do not require coding for your work purpose
          <p><strong >No Code Platform </strong> are those where you just need to drag and drop the components and your website will be developed </p>
        </p>
      </div>
    </div>
    <div className="flex w-full justify-evenly items-center bg-white">
      <Formik initialValues={{
      name:"",
      username:"",
      email:"",
      password:"",
      confirmPassword:"",
      createAt:new Date(),
      }} 
      validationSchema={validationSchema}
      onSubmit={userSubmit}>
        {({ values, handleChange, handleSubmit,handleBlur }) => (
      <form className="bg-white" onSubmit={handleSubmit}>
        <img href="photo" hidden></img>
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hey!</h1>
        <p className="text-sm font-normal text-gray-600 mb-5">Sign Up Here</p>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <i className="fa fa-thin fa-circle-user">:-</i>
          <input
            className="pl-2 outline-none border-none"
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
        <ErrorMessage name="name" component="div" className="text-red-500" />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-3">
       <i className="fa fa-thin fa-user">:-</i>
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Enter UserName"
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        <div className='ml-5'>
        <ErrorMessage name="username" component="div" className="text-red-500" />
        </div>
        <div className="flex items-center border-2 py-2 px-3  rounded-2xl mt-3">
        <i className="fa-thin fa-at">:-</i>
          <input
            className="pl-2 outline-none border-none"
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
        <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>
        <div className="flex items-center border-2 py-2 px-3 mt-3 rounded-2xl">
        <i className="fa fa-thin fa-lock">:-</i>
          <input
            className="pl-2 outline-none border-none"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter PassWord"
           onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        <div className='ml-5'>
        <ErrorMessage name="password" component="div" className="text-red-500" />
        </div>
        <div className="flex items-center border-2 py-2 px-3 mt-3 rounded-2xl">
        <i className="fa fa-thin fa-lock">:-</i>
          <input
            className="pl-2 outline-none border-none"
            type="password"
            name="confirmPassword"
            placeholder="Confirm PassWord"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        <div className='ml-5'>
        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
        </div>
        <button
          type="submit"
          className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          Sign Up
        </button>
      </form>
        )}
      </Formik>
    </div>
  </div>
  )
}

export default SignUp