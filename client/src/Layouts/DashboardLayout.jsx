import React, { useContext, useState } from "react";
import Sidebar from "../Pages/Dashboard/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
const DashboardLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default DashboardLayout;
