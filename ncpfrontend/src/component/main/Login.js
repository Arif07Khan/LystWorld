import React, { useState } from "react";
import { Formik,ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Link, useNavigate} from "react-router-dom";



const validationSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("*Email is required"),
  password: yup.string().required("*Password is required"),
});


const Login = ({isLogging}) => {
  const url = "http://localhost:5000";
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();
  
  

  const userLogin = async (formdata,{resetForm}) => { 
    setIsLoading(true);
    const response = await fetch(url + "/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
     if(response.status === 200){
      Swal.fire({
        icon:"success",
        title:"Welcome 🎇🎉",
        text:" You are Logined",
      });
      const data = await response.json();
      sessionStorage.setItem('user', JSON.stringify(data));
      navigate('/main/listplatform')
    } 
    else if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email or password is incorrect",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
    setIsLoading(false);
    resetForm();
  };


  return (
    <div className="h-screen flex flex-row md:flex-col ">
      <div className="flex w-full bg-gradient-to-tr from-blue-800 to-purple-700 justify-evenly items-center">
        <div className="flex flex-col ml-1 ">
          <span className='rounded-2xl text-2xl text-white font-bold p-1 w-min bg-gradient-to-r from-purple-800 to-sky-800 italic' >LstyWorld</span>
          <p className="text-white mt-1">
            The most popular Listing website where you
            <p>all can find best no code platforms for your website website.</p>
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center items-center bg-white">
        <Formik initialValues={{
          email: "",
          password: "",
        }}
            validationSchema={validationSchema}
            onSubmit={userLogin}>
          {({ values,  handleChange, handleSubmit,handleBlur }) => (
            <form className="bg-white" onSubmit={handleSubmit}>
              <h1 className="text-gray-800 font-bold text-xl mb-1 ">Hello Again!</h1>
              <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  onBlur={handleBlur}
                />
              </div>
              <div className="text-red-500 ml-4">
                <ErrorMessage name="email" />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="********"
                  onBlur={handleBlur}
                  autoComplete="off"
                />
              </div>
              <div className="text-red-500 ml-4">
                <ErrorMessage name="password" />
              </div>
              {
                isLoading ? (
                  <button
                    className="bg-purple-700 text-white font-bold py-2 px-4 rounded-2xl mt-4 w-full"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="bg-purple-700 text-white font-bold py-2 px-4 rounded-2xl mt-4 w-full"
                    type="submit"
                  >
                    Login
                  </button>
                )
              }
              <Link to="/main/reset/" className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                Forgot Password ?
              </Link>
            </form>

          )}
        </Formik>
      </div>
    </div>


  );
};


export default Login;
