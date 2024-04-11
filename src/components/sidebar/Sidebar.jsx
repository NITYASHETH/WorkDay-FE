import React, { useState, useEffect } from 'react';
import "./sidebar.scss";
import { useLocation } from 'react-router-dom'; // Import useLocation hook

import DashboardIcon from "@mui/icons-material/Dashboard";
import { useIdleTimer } from 'react-idle-timer'; // Import useIdleTimer hook
//import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
//import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
//import InsertChartIcon from "@mui/icons-material/InsertChart";
//import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
//import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify'; // Import toast container and toast
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import MarkUnreadChatAltSharpIcon from '@mui/icons-material/MarkUnreadChatAltSharp';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import TaskIcon from '@mui/icons-material/Task';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Image from '../../components/image/hr.png';
import Imageemp from '../../components/image/emp.png';
import Imageman from '../../components/image/manager.png';
import WorkIcon from '@mui/icons-material/Work';
// import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const location = useLocation(); // Get the current location
  const [activePage, setActivePage] = useState("");
  const [idleTimeout, setIdleTimeout] = useState(null);

  const handleIdleTimeout = () => {
    console.log('User has been idle for too long. Logging out...');
    window.location.href = '/logout';
    toast.info('Your device is now in idle mode.');
  };
  
  const { reset } = useIdleTimer({
    timeout: 600000, // 10 minutes in milliseconds
    onIdle: handleIdleTimeout,
    debounce: 500
  });
  
  const startIdleTimeout = () => {
    if (!idleTimeout) {
      setIdleTimeout(setTimeout(handleIdleTimeout, 600000)); // Set idle timeout to 10 minutes
    }
  };
  
  const resetIdleTimeout = () => {
    clearTimeout(idleTimeout); // Clear existing idle timeout
    startIdleTimeout(); // Start new idle timeout
  };
  
  const clearIdleTimeout = () => {
    clearTimeout(idleTimeout); // Clear existing idle timeout
    setIdleTimeout(null); // Reset idle timeout state
  };
  
  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    // Update the activePage state variable whenever the location changes
    setActivePage(location.pathname);
  }, [location]);


  const getUserDetailsFunc = ()=>{
    const user = localStorage.getItem("users")
    const userDetails = JSON.parse(user)
    console.log("userDetails",userDetails)
    return userDetails?.role
  }

  return (
    <div className="sidebar" style={{ backgroundColor: " #333333" }} onMouseMove={resetIdleTimeout} onClick={resetIdleTimeout}>
      <div className="top">
        {getUserDetailsFunc() === "admin" &&  <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ADMINDASHBOARD</span>
        </Link> }
        {getUserDetailsFunc() === "hr" &&  
  <Link to="/" style={{ textDecoration: "none" }}>
    <img src={Image} alt="user" style={{ height: '150px', width: '250px' }} />
  </Link>
}
        {getUserDetailsFunc() === "manager" &&  <Link to="/" style={{ textDecoration: "none" }}>
        <img src={Imageman} alt="user" style={{ height: '100px', width: '200px' }} />
        </Link> }
        {getUserDetailsFunc() === "employee" &&  <Link to="/" style={{ textDecoration: "none" }}>
        <img src={Imageemp} alt="user" style={{ height: '150px', width: '250px' }} />
        </Link> }
        {getUserDetailsFunc() === "company" &&  <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">COMPANY</span>
        </Link> }
      </div>
      <hr />
      <div className="center">
        <ul>
         {getUserDetailsFunc () === "hr" && <p className="title">MAIN</p> }
         {getUserDetailsFunc () === "manager" && <p className="title">MAIN</p> }
         {getUserDetailsFunc () === "company" && <p className="title">MAIN</p> }
         {getUserDetailsFunc () === "employee" && <p className="title">MAIN</p> }
          <Link to="/" style={{ textDecoration: "none" }}>
          {/* <li className={activePage === "/" ? "active" : ""}> */}
            
            <DashboardCustomizeOutlinedIcon className="icon" />
            <span style={{ color: "white" }}>Dashboard</span>
          {/* </li> */}
          </Link>

          {/* <p className="title">MAIN</p> 
{getUserDetailsFunc() === "company" &&<Link to="/pie" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>} */}
          {/* <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
           { <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>}
          </Link>
          {getUserDetailsFunc()==="admin" &&  <Link to="/register" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Register</span>
            </li>
          </Link>}
    
       {getUserDetailsFunc() === "manager" && <Link to="/taskform" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>task</span>
            </li>
          </Link>}
       {/* {getUserDetailsFunc() === "hr" && <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>PROFILE</span>
            </li>
          </Link>}
       {getUserDetailsFunc() === "admin" && <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>PROFILE</span>
            </li>
          </Link>}
        */} 
          {/* <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>login</span>
            </li>
          </Link> */}
          {getUserDetailsFunc() === "admin" && <Link to="/userslist" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>COMPANIES</span>
            </li>
          </Link>}
           {getUserDetailsFunc() === "hr" && <p className="title">LISTS</p> }
           {getUserDetailsFunc() === "employee" && <p className="title">LISTS</p> }
           {getUserDetailsFunc() === "hr" && <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icon" />
              <span>Total Employees</span>
            </li>
          </Link>}
          {getUserDetailsFunc() === "hr" &&  <Link to="/newleave" style={{ textDecoration: "none" }}>
          <li>
            <MarkUnreadChatAltSharpIcon className="icon" />
            <span>Leave Request From Employees</span>
          </li>
          </Link>}
          {getUserDetailsFunc() === "hr" && <p className="title">SERVICES</p> }
          {getUserDetailsFunc() === "company" && <p className="title">SERVICES</p> }
             {getUserDetailsFunc() === "hr" && <Link to="/employeeform" style={{ textDecoration: "none" }}>
            <li>
           
              <TaskIcon className="icon" />
              <span>Assign Task</span>
            </li>
          </Link>}
          {getUserDetailsFunc() === "hr" && <Link to="/form" style={{ textDecoration: "none" }}>
            <li>
              <DownloadDoneIcon className="icon" />
              <span> Add Attendance</span>
            </li>
          </Link>}
          
          {getUserDetailsFunc() === "manager" && <Link to="/employeeform" style={{ textDecoration: "none" }}>
            <li>
            <TaskIcon className="icon" />
              <span> Assign Task</span>
            </li>
          </Link>}
             {/* {getUserDetailsFunc() === "hr" && <Link to="/hr" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Submit attendance</span>
            </li>
          </Link>} */}
             {getUserDetailsFunc() === "company" && <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>all users</span>
            </li>
          </Link>}
             {getUserDetailsFunc() === "company" && <Link to="/employeelist" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>Employees Details</span>
            </li>
          </Link>}
             {getUserDetailsFunc() === "manager" && <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>all users</span>
            </li>
          </Link>}
             {getUserDetailsFunc() === "company" && <Link to="/register" style={{ textDecoration: "none" }}>
            <li>
              <AddCircleOutlineOutlinedIcon className="icon" />
              <span>Add User</span>
            </li>
          </Link>}
             {getUserDetailsFunc() === "admin" && <Link to="/creg" style={{ textDecoration: "none" }}>
            <li>
            <AddBusinessIcon className="icon" />
              <span>Add Company</span>
            </li>
          </Link>}
          {getUserDetailsFunc() === "company" && <Link to="/projectcreate" style={{ textDecoration: "none" }}>
            <li>
              <MarkUnreadChatAltSharpIcon className="icon" />
              <span> Add Project</span>
            </li>
          </Link>}
          
             
             {getUserDetailsFunc() === "hr" && <Link to="/automatic" style={{ textDecoration: "none" }}>
            <li>
              <AccessTimeIcon className="icon" />
              <span>Total working Hours</span>
            </li>
          </Link>}
             
          
          
          {getUserDetailsFunc() === "hr" &&  <Link to="/salary" style={{ textDecoration: "none" }}>
          <li>
            <MonetizationOnIcon className="icon" />
            <span>Salary of Employees</span>
          </li>
          </Link>}
          
          
          {getUserDetailsFunc() === "manager" &&  <Link to="/payrolldisplay" style={{ textDecoration: "none" }}>
          <li>
            <ReceiptIcon className="icon" />
            <span> Employee Payroll Details</span>
          </li>
          </Link>}
          {getUserDetailsFunc() === "manager" &&  <Link to="/model" style={{ textDecoration: "none" }}>
          <li>
            {/* <ExitToAppIcon className="icon" /> */}
            <span>PAYROLL</span>
          </li>
          </Link>}
          {/* {getUserDetailsFunc() === "employee" &&  <Link to="/salaryview" style={{ textDecoration: "none" }}>
          <li className={activePage === "/" ? "active" : ""}> */}
            {/* <ExitToAppIcon className="icon" /> */}
            {/* <span>PAYROLL</span>
          </li>
          </Link>} */}
          {getUserDetailsFunc() === "employee" &&  <Link to="/Taskdisplay" style={{ textDecoration: "none" }}>
          <li>
            <AssignmentTurnedInOutlinedIcon className="icon" />
            <span>YOUR TASK</span>
          </li>
          </Link>}
          {getUserDetailsFunc() === "employee" &&  <Link to="/applyleave" style={{ textDecoration: "none" }}>
          <li>
            <TimeToLeaveOutlinedIcon className="icon" />
            <span>Apply Leave</span>
          </li>
          </Link>}
          {/* {getUserDetailsFunc() === "employee" &&  <Link to="/alert" style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Notifyproblem</span>
          </li>
          </Link>} */}
          {getUserDetailsFunc() === "employee" &&  <Link to="/model" style={{ textDecoration: "none" }}>
          <li>
            <PaymentIcon className="icon" />
            <span>Your payroll details</span>
          </li>
          </Link>}
          {getUserDetailsFunc() === "hr" &&<p className="title">USER</p> }
          {getUserDetailsFunc() === "employee" &&<p className="title">USER</p> }
          {getUserDetailsFunc() === "hr" &&  <Link to="/model" style={{ textDecoration: "none" }}>
          <li>
            {/* <ExitToAppIcon className="icon" /> */}
            <PaymentIcon className="icon" />
            <span> Your Payroll</span>
          </li>
          </Link>}
         {getUserDetailsFunc() === "hr" && <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            
            <PersonIcon className="icon" />
            <span> Your Profile</span>
          </li>
          </Link>}
         {getUserDetailsFunc() === "employee" && <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            
            <PersonIcon className="icon" />
            <span> Your Profile</span>
          </li>
          </Link>}
          <Link to="/logout" style={{ textDecoration: "none" }}>
          <li>
            {/* <ExitToAppIcon className="icon" /> */}
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
      <ToastContainer /> {/* Toast container */}
    </div>
  );
};

export default Sidebar;
