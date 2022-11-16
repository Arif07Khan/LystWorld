import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./photo/logo.jpg";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'
import "./header.css";




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


  

  const showProfile = () => {
    return (
  <nav className="profile_nav">
    <ul className="profile_ul">
      <li className="profile_li">
        <img src="images/profile.png" className="profile_img" />
        <ul className="profile_li-ul">
          <li className="sub-item">
          <span class="material-symbols-outlined">person</span>
            <span>{ currentUser.name }</span>
          </li>
          <li className="sub-item">
            <span class="material-symbols-outlined">rate_review</span>
            <NavLink to={"/user/managereview/"+currentUser._id}>ManageReview</NavLink>
          </li>
          <li className="sub-item">
          <span class="material-symbols-outlined">manage_accounts</span>
            <NavLink to={"/user/manageprofileuser/"+currentUser._id}>Update Profile</NavLink>
          </li>
          <li className="sub-item">
          <span class="material-symbols-outlined">logout</span>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
    );
  };


  return (
  <motion.header initial={{x:"-100vw",opacity:0}} animate={{x:"0",opacity:1}} transition={{duration:1,type:"spring",damping:20,stiffness:150}} className="sticky top-0 z-20  block bg-gradient-to-r from-teal-700 to-slate-500 py-1 ">
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
      <NavLink  to="compareplatform" className="mr-5 hover:text-sky-200 ">Compare PlatForm</NavLink>
      </motion.div>
      <motion.div whileTap={{scale:.8}}>
      <NavLink to="contactus" className="mr-5 hover:text-sky-200" >Contact Us</NavLink>
      </motion.div>
     </nav>
    {  !currentUser ? (
    <div className="flex mt-2" >
    <motion.div whileTap={{scale:0.8}} className="bg-gray-100 text-gray-800 mx-2 px-2 py-1 rounded-xl">
      <NavLink to="login" className=" hover:text-sky-700  ">Login</NavLink>
      </motion.div>
      <motion.div whileTap={{scale:0.8}} className="bg-gray-100 text-gray-800 mx-2 px-2 py-1 rounded-xl">
      <NavLink to="signup" className=" hover:text-sky-700">Sign Up</NavLink>
      </motion.div>
    </div>) 
   :showProfile()}
  </div>
    </motion.header>
  );
};

export default Header;
