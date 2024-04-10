// // PayrollPage.js

// import React, { useState } from 'react';
// import './payroll.css';
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";

// const PayrollPage = () => {
//   const [payrollData, setPayrollData] = useState({
//     employeeName: '',
//     payDate: '',
//     startDate: '',
//     endDate: '',
//   });

//   const [earningsData, setEarningsData] = useState({
//     ordinaryHoursWorked: 0,
//     unit: '',
//     rate: 0,
//     total: 0,
//     grossPay: 0,
//   });

//   const handlePayrollSubmit = (e) => {
//     e.preventDefault();
//     console.log('Payroll Data:', payrollData); // Replace with API call to submit payroll data
//   };

//   const handleEarningsSubmit = (e) => {
//     e.preventDefault();
//     console.log('Earnings Data:', earningsData); // Replace with API call to submit earnings data
//   };

//   const handlePayrollInputChange = (e) => {
//     const { name, value } = e.target;
//     setPayrollData({
//       ...payrollData,
//       [name]: value,
//     });
//   };

//   const handleEarningsInputChange = (e) => {
//     const { name, value } = e.target;
//     setEarningsData({
//       ...earningsData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//     <div className="payroll-container">
//       <div className="vertical-form">
//         <h2>Payroll Details</h2>
//         <form onSubmit={handlePayrollSubmit}>
//           <div className="form-group">
//             <label>Employee Name:</label>
//             <input type="text" name="employeeName" value={payrollData.employeeName} onChange={handlePayrollInputChange} />
//           </div>
//           <div className="form-group">
//             <label>Pay Date:</label>
//             <input type="date" name="payDate" value={payrollData.payDate} onChange={handlePayrollInputChange} />
//           </div>
//           <div className="form-group">
//             <label>Start Date:</label>
//             <input type="date" name="startDate" value={payrollData.startDate} onChange={handlePayrollInputChange} />
//           </div>
//           <div className="form-group">
//             <label>End Date:</label>
//             <input type="date" name="endDate" value={payrollData.endDate} onChange={handlePayrollInputChange} />
//           </div>
//           <button type="submit">Enter</button>
//         </form>
//       </div>
      
//       <div className="horizontal-form">
//         <h2>Earnings Details</h2>
//         <form onSubmit={handleEarningsSubmit}>
//           <div className="form-group">
//             <label>Ordinary Hours Worked:</label>
//             <input type="number" name="ordinaryHoursWorked" value={earningsData.ordinaryHoursWorked} onChange={handleEarningsInputChange} />
//           </div>
//           <div className="form-group">
//             <label>Unit:</label>
//             <input type="text" name="unit" value={earningsData.unit} onChange={handleEarningsInputChange} />
//           </div>
//           <div className="form-group">
//             <label>Rate:</label>
//             <input type="number" name="rate" value={earningsData.rate} onChange={handleEarningsInputChange} />
//           </div>
//           <div className="form-group">
//             <label>Total:</label>
//             <input type="number" name="total" value={earningsData.total} onChange={handleEarningsInputChange} />
//           </div>
//           <div className="form-group">
//             <label>Gross Pay:</label>
//             <input type="number" name="grossPay" value={earningsData.grossPay} onChange={handleEarningsInputChange} />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default PayrollPage;
