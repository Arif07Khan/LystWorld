import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'

const Header = () => {
  return (
    <nav className="navbar navbar-admin navbar-expand-lg navbar-light  " style={{position:'sticky',top:'0px',zIndex:'1'}}>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      
    ><i class="fa fa-bars" aria-hidden="true"></i>
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse flex justify-center items-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item nav-item-admin active">
          <NavLink className="nav-link" to="dashboard">
            DashBoard <span className="sr-only">(current)</span>
          </NavLink>
        </li>
        <li className="nav-item nav-item-admin">
          <NavLink className="nav-link" to="addplatform">
           AddPlatform
          </NavLink>
        </li>
        <li className="nav-item nav-item-admin">
          <NavLink className="nav-link" to="manageplatform">
            ManagePlatform
          </NavLink>
        </li>
        <li className="nav-item nav-item-admin">
          <NavLink className="nav-link" to="manageprofile">
          ManageProfile
          </NavLink>
        </li>
        <li className="nav-item nav-item-admin">
          <NavLink className="nav-link" to="manageuser">
          ManageUser
          </NavLink>
        </li> 
      </ul>
    </div>
  </nav>
  )
}

export default Header