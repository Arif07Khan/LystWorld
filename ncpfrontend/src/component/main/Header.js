import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./photo/logo.jpg";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'




const Header = () => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  )
 const logout = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    toast.success("Logout Successfully");
    window.location.reload();
  };
  
  const isLogging=()=>{
      if(currentUser){
        return(
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <img className="w-10 h-10 rounded-full" src={currentUser.profileImage} alt="profile" />
              <span className="text-white font-bold">{currentUser.name}</span>
            </div>
            <button className="bg-red-500 text-white font-bold py-1 px-2 rounded" onClick={logout}>Logout</button>
          </div>
        )
      }
      else{return(null)}
  }
  return (
  <motion.header initial={{x:"-100vw",opacity:0}} animate={{x:"0",opacity:1}} transition={{duration:1,type:"spring",damping:20,stiffness:150}} className=" sticky top-0 z-10 w-screen  bg-gradient-to-r from-teal-700 to-slate-500">
  <div className=" flex flex-wrap flex-col md:flex-row items-center px-2" >
    <Link to="home" className="flex font-medium items-center text-gray-100 hover:text-cyan-400 mb-2 md:mb-0  mr-3">
        <img src={logo} alt="logo"  className="h-10 w-10 rounded-lg mt-1" />
      <span className="ml-3 text-xl ">LstyWorld</span>
    </Link>
    <nav  className="lg:ml-auto lg:mr-auto font-semibold flex flex-wrap  items-center text-base justify-center text-gray-100">
      <motion.div whileTap={{scale:.8}}>
      <NavLink to="home" className="mr-5 hover:text-sky-200 ">Home</NavLink>
      </motion.div>
      <motion.div whileTap={{scale:.8}}>
      <NavLink to="listplatform" className="mr-5 hover:text-sky-200">All PlatForm</NavLink>
      </motion.div>
      <motion.div whileTap={{scale:.8}}>
      <NavLink to="compareplatform" className="mr-5 hover:text-sky-200">Compare PlatForm</NavLink>
      </motion.div>
      <motion.div whileTap={{scale:.8}}>
      <NavLink to="contactus" className="mr-5 hover:text-sky-200">Contact Us</NavLink>
      </motion.div>
      <motion.div whileTap={{scale:.8}}>
      <NavLink to="login" className="mr-5 hover:text-sky-200">Login</NavLink>
      </motion.div>
      <motion.div whileTap={{scale:.8}}>
      <NavLink to="signup" className="mr-5 hover:text-sky-200">Sign Up</NavLink>
      </motion.div>
    </nav>
    <div className="mr-4">
   {
     isLogging()
    }
    </div>
  </div>
    </motion.header>
  );
};

export default Header;