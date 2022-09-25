import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Main = () => {
  return (
    <div> 
      <Toaster/>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  )
}

export default Main;