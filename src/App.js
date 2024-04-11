// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound'; // Import the NotFound component
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/register';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import TaskForm from './pages/task/Taskform';
import TaskDisplay from './pages/task/Taskdisplay';
import {userInputs } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import Logout from './pages/logout/Logout';
import UserDetails from './pages/test/UserDetails';
import Profile from './pages/profile/Profile'; // Import the Profile component
// import AttendancePage from './components/Attendance/AttendancePage';
import AttendanceViewer from './components/Attendance/AttendanceViewer';
import AttendanceFilter from './components/Attendance/AttendanceFilter';
import Alert from './components/Attendance/Alert';
import AttendanceSummary from './components/Attendance/AttendanceSummary';
import AttendanceComponent from './components/Attendance/AttendanceComponent';
import Automatic from './components/Attendance/Automatic';
import AutomaticFilter from './components/Attendance/AutomaticFilter';
import MonthlyAttendance from './components/Attendance/MonthlyAttendance';
import AlertDisplay from './components/Attendance/AlertDisplay';
import Payroll from './components/payroll/Payroll';
//import LeaveForm from './components/leave/Applyleave';
import Applyleave from './components/leave/Applyleave';
import Records from './components/datatable/Records';
import LeaveRequests from './components/leave/LeaveRequests';
import Form from './components/datatable/form';
import AttendanceDisplay from './components/datatable/AttendanceDisplay';
import SalaryTable from './components/datatable/SalaryTable';
import SalaryDisplay from './components/datatable/SalaryDisplay';
import SalaryView from './components/datatable/SalaryView';
import UserLeaveRequests from './components/leave/UserLeaveRequest';
import PayrollSlip from './components/payroll/Payrollslip';
import PayrollModel from './components/payroll/PayrollModel';
import ProfileCard from './pages/profile/Profile';
import PayrollDisplay from './components/payroll/PayrollDisplay';
import DashboardDesign from './pages/home/DashboardDesign';
import Whatsapp from './components/whatsapp/Whatsapp';
import EmployeeForm from './components/employee/EmployeeForm';
import Registration from './pages/register/Resgistration';
import Regi from './pages/register/Regi';
import ProjectCreate from './pages/project/ProjectCreate';
import ProjectDisplay from './pages/project/ProjectDisplay';
import ProjectStatusUpdate from './pages/project/ProjectStatusUpdate';
import LeaveChart from './components/chart/LeaveChart';
import PieChartTotal from './components/chart/PieChartTotal';
import GraphComponent from './components/chart/GraphComponent';
import LineComponent from './components/chart/LineComponent';
import PieComponent from './components/chart/PieComponent';
import NewLeave from './components/leave/NewLeave';
import Slip from './components/payroll/Slip';
import UsersList from './pages/Admin/UsersList';
import CompanyReg from './pages/register/CompanyReg';
import Empcard from './components/datatable/Empcard';
import SalaryDetails from './components/payroll/SalaryDetails';
import Wavegraph from './components/chart/Wavegraph';
//import ProfileCard from './pages/profile/Profile';
import EmployeeList from './pages/profile/EmployeeList';
import { Test } from './components/chart/Test';
import TestOf from './pages/profile/TestOf';
import CompanyChart from './components/chart/CompanyChart';
import ProjectGraph from './components/chart/ProjectGraph';

// import Sidebar from './components/sidebar/Sidebar';


// import MarkAttendance from './components/datatable/MarkAttendance';




function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = localStorage.getItem('usersdatatoken');
  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/logout" element={<Logout />} />
              {/* <Route path="/regi" element={<Regi />} /> */}
              
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/hrdashboard" element={<Register />} />
              <Route path="/users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              {/* </Route>
              <Route path="/products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={productInputs} title="Add New Product" />}
                /> */}
              </Route>
              <Route path="/Taskform" element={<TaskForm />} />
              <Route path="/Taskdisplay" element={<TaskDisplay />} />
              <Route path="/UserDetails" element={<UserDetails />} />
              <Route path="/AttendanceViewer" element={<AttendanceViewer/>} />
              <Route path="/AttendanceFilter" element={<AttendanceFilter/>} />
              <Route path="/Alert" element={<Alert/>} />
              <Route path="/AlertDisplay" element={<AlertDisplay/>} />
              <Route path="/AttendanceSummary" element={<AttendanceSummary/>} />
              <Route path="/AttendanceComponent" element={<AttendanceComponent/>} />
              <Route path="/Automatic" element={<Automatic/>} />
              <Route path="/AutomaticFilter" element={<AutomaticFilter/>} />
              <Route path="/MonthlyAttendance" element={<MonthlyAttendance/>} />
              <Route path="/payroll" element={<Payroll/>} />
              <Route path="/applyleave" element={<Applyleave />} />
              <Route path="/LeaveRequests" element={<LeaveRequests />} />
              <Route path="/form" element={<Form />} />
              <Route path="/AttendanceDisplay" element={<AttendanceDisplay />} />
              <Route path="/salary" element={<SalaryTable />} />
              <Route path="/salaryDisplay" element={<SalaryDisplay />} />
              <Route path="/salaryview" element={<SalaryView />} />
              <Route path="/userleaverequest" element={<UserLeaveRequests />} />
              <Route path="/payrollslip" element={<PayrollSlip />} />
              <Route path="/model" element={<PayrollModel />} />
              <Route path="/pro" element={<ProfileCard />} />
              <Route path="/payrolldisplay" element={<PayrollDisplay />} />
              <Route path="/pie" element={<DashboardDesign />} />
              <Route path="/Whatsapp" element={<Whatsapp />} />
              <Route path="/EmployeeForm" element={<EmployeeForm />} />
              <Route path="/h" element={<Registration />} />
              <Route path="/register" element={<Register/>} />
              {/* <Route path="/regi" element={<Regi/>} /> */}
              <Route path="/ProjectCreate" element={<ProjectCreate/>} />
              <Route path="/ProjectDisplay" element={<ProjectDisplay/>} />
              <Route path="/Projectstatus" element={<ProjectStatusUpdate/>} />
              <Route path="/LeaveChart" element={<LeaveChart/>} />
              <Route path="/PieChartTotal" element={<PieChartTotal/>} />
              <Route path="/h" element={<Registration/>} />
              <Route path="/regi" element={<Regi/>} />
              <Route path="/graph" element={<GraphComponent/>} />
              <Route path="/line" element={<LineComponent/>} />
              <Route path="/PieComponent" element={<PieComponent/>} />
              <Route path="/NewLeave" element={<NewLeave/>} />
              <Route path="/slip" element={<Slip/>} />
              <Route path="/UsersList" element={<UsersList/>} />
              <Route path="/creg" element={<CompanyReg/>} />
              <Route path="/cardd" element={<Empcard/>} />
              <Route path="/SalaryDetails" element={<SalaryDetails/>} />
              <Route path="/Wavegraph" element={<Wavegraph/>} />
              <Route path="/employeelist" element={<EmployeeList/>} />
              <Route path="/Test" element={<Test/>} />
              <Route path="/testof" element={<TestOf/>} />
              <Route path="/companychart" element={<CompanyChart/>} />
              <Route path="/projectgraph" element={<ProjectGraph/>} />
             
              
            
              {/* <Route path="/sidebar" element={<Sidebar/>} /> */}
              
             
              

              


              
              
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
              
              <Route exact path="/users/:id" component={UserDetails} />
            </>
          )}
          <Route path="*" element={<NotFound />} /> {/* This will handle all other routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
