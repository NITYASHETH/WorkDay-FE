import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CustomCard from "../../components/Cards/CustomCard";
import Chart from '../../components/chart/Chart'; // Import Chart component
import "./home.scss";
import PieChart from '../../components/chart/PieChart';
import './pie.css';
import Barchartpage from '../../components/chart/barchart';
import './bar.css';
import './card.css';
import PeopleIcon from '@mui/icons-material/People';
import LineChartPage from '../../components/chart/LineChartPage';
import PieComponent from '../../components/chart/PieComponent';
import PieChartTotal from '../../components/chart/PieChartTotal';
import DashboardDesign from './DashboardDesign';
import GraphComponent from '../../components/chart/GraphComponent';
//import Task from '../../../../server/models/taskSchema';
//import TaskLine from '../../components/chart/TaskLine';
import Balu from '../../components/image/watsapp.png'; 

const Home = () => {
  const [totalLeave, setTotalLeave] = useState(0);
  const [rejectedLeave, setRejectedLeave] = useState(0);
  const [approvedLeave, setApprovedLeave] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [companyId, setCompanyId] = useState("");
  const [error, setError] = useState(null);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalsalcom, setTotalSalCom] = useState(0);
  const [hrName, setHrName] = useState('');
  const [managerName, setManagerName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = localStorage.getItem('users');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { cid } = userData; // Extract cid from userData
  
          // Fetch users with role 'manager' and cid from localStorage
          const response = await fetch(`http://localhost:3001/usersrole?role=manager&cid=${cid}`);
          if (!response.ok) {
            throw new Error('Failed to fetch manager data');
          }
          const userDataResponse = await response.json(); // Renamed to userDataResponse
          if (userDataResponse.status === 1 && userDataResponse.userList.length > 0) {
            // Set manager's name
            setManagerName(userDataResponse.userList[0].fname); // Assuming there's only one manager
          }
        } else {
          console.error('User data not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching manager data:', error);
        setError(error.message);
      }
    };
  
    fetchUserData();
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = localStorage.getItem('users');
        if (userDataString) {
          const userDataParsed = JSON.parse(userDataString);
          const { cid } = userDataParsed; // Rename userData to userDataParsed
  
          // Fetch users with role 'hr' and cid from localStorage
          const response = await fetch(`http://localhost:3001/usersrole?role=hr&cid=${cid}`);
          if (!response.ok) {
            throw new Error('Failed to fetch HR data');
          }
          const userDataResponse = await response.json(); // Rename userData to userDataResponse
          if (userDataResponse.status === 1 && userDataResponse.userList.length > 0) {
            // Set HR's name
            setHrName(userDataResponse.userList[0].fname); // Assuming there's only one HR
          }
        } else {
          console.error('User data not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching HR data:', error);
        setError(error.message);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userDataString = localStorage.getItem('users');
  //       if (userDataString) {
  //         const userData = JSON.parse(userDataString);
  //         const { cid } = userData; // Extract cid from userData
  
  //         const tasksResponse = await fetch(`http://localhost:3001/total-tasks?cid=${cid}`);
  //         if (!tasksResponse.ok) {
  //           throw new Error('Failed to fetch tasks');
  //         }
  //         const tasksData = await tasksResponse.json();
  //         setTotalTasks(tasksData.totalTasks);
  
  //         // Fetch other data here...
  
  //       } else {
  //         console.error('User data not found in localStorage');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setError(error.message);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem('users');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { cid } = userData;

          // Fetch total salary
          const salaryCompResponse = await fetch(`http://localhost:3001/total-salary?cid=${cid}`);
          const salaryData = await salaryCompResponse.json();
          setTotalSalCom(salaryData.totalSalary);
        } else {
          console.error('User data not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem('users');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { cid } = userData;

          const tasksResponse = await fetch(`http://localhost:3001/total-tasks?cid=${cid}`);
          if (!tasksResponse.ok) {
            throw new Error('Failed to fetch tasks');
          }
          const tasksData = await tasksResponse.json();
          setTotalTasks(tasksData.totalTasks);
        } else {
          console.error('User data not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem('users');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { _id: userId, companyId: userCompanyId } = userData;
          setCompanyId(userCompanyId);

          const totalResponse = await fetch(`http://localhost:3001/api/leave/total/${userId}`);
          const totalData = await totalResponse.json();
          setTotalLeave(totalData.totalLeave);

          const rejectedResponse = await fetch(`http://localhost:3001/api/leave/rejected/${userId}`);
          const rejectedData = await rejectedResponse.json();
          setRejectedLeave(rejectedData.rejectedLeave);

          const approvedResponse = await fetch(`http://localhost:3001/api/leave/approved/${userId}`);
          const approvedData = await approvedResponse.json();
          setApprovedLeave(approvedData.approvedLeave);

          fetchTotalEmployees();

          const interval = setInterval(fetchTotalEmployees, 300000);
          const salaryResponse = await fetch(`http://localhost:3001/total-salary`);
          const salaryData = await salaryResponse.json();
          setTotalSalary(salaryData.totalSalary);

          return () => clearInterval(interval);
        } else {
          console.error('User data not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const fetchTotalEmployees = async () => {
    try {
      const userDataString = localStorage.getItem('users');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const { cid } = userData;
        const totalEmployeesResponse = await fetch(`http://localhost:3001/totalEmployees?cid=${cid}&role=employee`);
        if (!totalEmployeesResponse.ok) {
          throw new Error('Failed to fetch total employees');
        }
        const totalEmployeesData = await totalEmployeesResponse.json();
        setTotalEmployees(totalEmployeesData.totalEmployees);
      } else {
        console.error('User data not found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching total employees:', error);
      setError(error.message);
    }
  };

  const getUserDetailsFunc = () => {
    const user = localStorage.getItem("users")
    const userDetails = JSON.parse(user)
    return userDetails?.role
  }

  // Data for the chart
  const chartData = [
    { name: "Total Leave", value: totalLeave },
    { name: "Approved Leave", value: approvedLeave },
    { name: "Rejected Leave", value: rejectedLeave }
  ];

  const handleClick = () => {
    window.open('https://wa.me/919512197078', '_blank'); // Open link in a new tab
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {getUserDetailsFunc() === "employee" && (
         <div className="widgets">
            <div className="card-container">
              <CustomCard title="Leave Requests" value={totalLeave} style={{ backgroundColor: '#E6ECF3' }} fontColor="#401F71" />
              <CustomCard title="Rejected Leave" value={rejectedLeave} style={{ backgroundColor: '#FFF9D5' }}  fontColor="#481E14"/>
              <CustomCard title="Approved Leave" value={approvedLeave} style={{ backgroundColor: '#FFE3BB' }} fontColor="maroon"/>
              <CustomCard title="HR" value={hrName} />
              <CustomCard title="MANAGER" value={managerName} />
            </div>
            {/* Display chart for employee below the cards */}
            
          </div>
        )}
        {getUserDetailsFunc() === "employee" && ( 
          <Chart title="Leave Overview" data={chartData} aspect={16 / 9} />
        )}
        {/* {getUserDetailsFunc() === "employee" && ( 
          <Chart title="Leave Overview" data={PieComponent} aspect={16 / 9} />
        )} */}
         {getUserDetailsFunc() === "employee" && ( 
          <div className="chartContainer">
          <PieComponent/> 
          </div>
         )}
        {getUserDetailsFunc() === "company" && (
          <>
        <div className="widgets">
          <div className="card-container">
            <CustomCard title="Total Salary" value={totalsalcom} style={{ backgroundColor: '#E6ECF3' }} fontColor="#401F71" />
            <CustomCard title="Total Employees" value={totalEmployees} style={{ backgroundColor: '#FFF9D5' }}  fontColor="#481E14"/>
            <CustomCard title="Total Tasks" value={totalTasks} style={{ backgroundColor: '#FFE3BB' }} fontColor="maroon"   />
          </div>
         
          {/* Display chart for employee below the cards */}
        </div>
       
       </>
)}
        {/* {getUserDetailsFunc() === "company" && ( 
           <div className="barchart-container">
          <Barchartpage/>
          </div>
        )} */}
        {/* {getUserDetailsFunc() === "company" && ( 
           <div className="line">
          <LineChartPage/>
          </div>
        )} */}
        {getUserDetailsFunc() === "company" && ( 
          <div className="chartContainer">
          <DashboardDesign/> 
          </div>
        
        )}
        {getUserDetailsFunc() === "company" && ( 
          <>
          <div className="chartContainer">
          <GraphComponent/> 
          </div>
          <div className="container">
          {/* Display your image icon */}
          <a href="https://wa.me/919512197078" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
            <img src={Balu} alt="WhatsApp Icon" className="whatsapp-icon" />
          </a>
    
          {/* Add your WhatsApp component content here */}
          {/* <h1>Welcome to WhatsApp</h1>
          <p>This is a simple WhatsApp component.</p> */}
        </div>
        </>
        )}
          {/* {getUserDetailsFunc() === "company" && <Link to="/whatsapp" style={{ textDecoration: "none" }}>
          <li>
              <PeopleIcon className="icon" />
              <span>whatsapp</span>
            </li>
          </Link>
          
        } */}
   {getUserDetailsFunc() === "hr" && (
  <div className="widgets">
    <div className="card-container">
      <CustomCard title="Leave Requests" value={totalLeave} style={{ backgroundColor: '#E6ECF3' }} fontColor="#401F71" />
      <CustomCard title="Rejected Leave" value={rejectedLeave} style={{ backgroundColor: '#FFF9D5' }}  fontColor="#481E14"/>
      <CustomCard title="Approved Leave" value={approvedLeave} style={{ backgroundColor: '#FFE3BB' }} fontColor="maroon"   />
    </div>
    {/* Display chart for employee below the cards */}
  </div>
)}




        {getUserDetailsFunc() === "hr" && ( 
          <Chart title="Leave Overview" data={chartData} aspect={16 / 9} />
        )}
        {getUserDetailsFunc() === "company" && (
          <div className="widgets">
            <div className="card-container">
              {/* CustomCard components for company */}
            </div>
          </div>
        )}
        {getUserDetailsFunc() === "admin" && (
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">ADMINDASHBOARD</span>
          </Link>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Home;


