import React, { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import "./TestPage.css";

const TestPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usersdatatoken")}`
        }
      });
      console.log("Fetched User Data:", response.data); // Debug: Log fetched user data
      setSelectedUser(response.data); // Assuming the response.data contains the user object
    } catch (error) {
      console.error("Error fetching selected user data:", error);
    }
  };

  return (
    <div className="test-page">
      <h1>User Card</h1>
      <div className="user-cards">
        {/* Debug: Log selected user */}
        {selectedUser && <UserCard user={selectedUser} />}
      </div>
      {/* Debug: Display selected user data */}
      {selectedUser && (
        <div>
          <h2>Selected User</h2>
          <p>First Name: {selectedUser.fname}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Role: {selectedUser.role}</p>
          {/* Render other user data here */}
        </div>
      )}
    </div>
  );
};

export default TestPage;
