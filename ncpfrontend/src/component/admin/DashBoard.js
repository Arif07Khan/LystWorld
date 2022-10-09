import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AccountCircle } from "@mui/icons-material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const DashBoard = () => {
  
  const options = [
    {
      name: "Profile",
      icon: <AccountCircle />,
      link: "/admin/profile",
    },
    {
      name: "Manage Users",
      icon: <ManageAccountsIcon/>,
      link: "/admin/manageuser",
    },
    {
      name: "Manage Platform",
      icon: <QueryStatsIcon />,
      link: "/admin/manageplatform",
    },
    {
      name: "Dashboard",
      icon: <DashboardIcon/>,
      link: "/admin/dashboard",
    },

  ];

  return (
    <div>
      <h1>Admin Component</h1>
      <Sidebar title="Admin Dashboard" options={options}>
        <Outlet />
      </Sidebar>
    </div>
  );
};

export default DashBoard;