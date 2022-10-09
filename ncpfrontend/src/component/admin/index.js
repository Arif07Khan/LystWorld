import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import DashBoard from './DashBoard'

const Admin = () => {
  return (
    <div>
      <Toaster/>
        <DashBoard/>
        <Outlet></Outlet>
    </div>
  )
}

export default Admin