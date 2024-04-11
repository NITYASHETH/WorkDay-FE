import React, { useState, useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const SalaryTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userCid = getUserByCid();
      const response = await fetch(`http://localhost:3001/users?cid=${userCid}`);
      const userData = await response.json();
  
      const userListWithId = userData.userList.map((user, index) => ({
        ...user,
        id: user._id
      }));
  
      // Filter out users with roles 'company' or 'admin'
      const filteredUsers = userListWithId.filter(user => user.role !== 'company' && user.role !== 'admin');
  
      // Fetch salary data from the backend
      const salaryResponse = await fetch("http://localhost:3001/salaries");
      const salaryData = await salaryResponse.json();
  
      if (salaryData.success) {
        // Merge salary data with user data
        const mergedData = filteredUsers.map(user => {
          const salaryInfo = salaryData.salaries.find(salary => salary.userId._id === user.id);
          return {
            ...user,
            salary: salaryInfo ? salaryInfo.amount : 0 // Default to 0 if no salary info found
          };
        });
        setData(mergedData);
      } else {
        console.error("Failed to fetch salaries:", salaryData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const getUserByCid = () => {
    const userDataString = localStorage.getItem("users");
    const userData = JSON.parse(userDataString);
    return userData.cid;
  };

  const handleAddClick = async (user) => {
    let newSalary = prompt("Enter salary amount (must be a number greater than 9):");
    // Validate the input
    if (newSalary !== null && !isNaN(newSalary) && newSalary.trim() !== "" && parseFloat(newSalary) > 9) {
      newSalary = parseFloat(newSalary);
      try {
        console.log("Adding new salary:", { userId: user.id, amount: newSalary });
        const response = await fetch("http://localhost:3001/salary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            amount: newSalary
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Salary added successfully");
          // Update the data state with the new user data
          const updatedData = [...data];
          const userIndex = updatedData.findIndex(u => u.id === user.id);
          if (userIndex !== -1) {
            updatedData[userIndex].salary = newSalary;
            setData(updatedData);
          }
        } else {
          alert(`Failed to add salary: ${data.message}`);
        }
      } catch (error) {
        console.error("Error adding salary:", error);
      }
    } else {
      alert("Invalid salary input. Please enter a valid number greater than 9.");
    }
  };
  
  const handleUpdateClick = async (user) => {
    let newSalary = prompt("Enter new salary amount (must be a number greater than 9):");
    // Validate the input
    if (newSalary !== null && !isNaN(newSalary) && newSalary.trim() !== "" && parseFloat(newSalary) > 9) {
      newSalary = parseFloat(newSalary);
      try {
        const response = await fetch(`http://localhost:3001/salary/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount: newSalary
          })
        });
        const responseData = await response.json();
        if (responseData.success) {
          alert("Salary updated successfully");
          fetchData();
        } else {
          alert(`Failed to update salary: ${responseData.message}`);
        }
      } catch (error) {
        console.error("Error updating salary:", error);
      }
    } else {
      alert("Invalid salary input. Please enter a valid number greater than 9.");
    }
  };
  
  const userColumns = [
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "mobileno", headerName: "Mobile No", width: 150 },
    { field: "salary", headerName: "Salary", width: 150, className: "salaryColumn" },
    {
      field: "update",
      headerName: "Update",
      width: 100,
      renderCell: (params) => (
        <div className="actionButtons">
          <div className="actionButton" onClick={() => handleUpdateClick(params.row)}>Update</div>
        </div>
      ),
    },
    {
      field: "add",
      headerName: "Add",
      width: 100,
      renderCell: (params) => (
        <div className="actionButtons">
          <div className="actionButton" onClick={() => handleAddClick(params.row)}>Add</div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="datatable">
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryTable;
