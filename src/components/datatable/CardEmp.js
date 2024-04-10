// CardEmp.js
import React from "react";

const CardEmp = ({ user }) => {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "20px",
    flex: "1 0 calc(33.33% - 20px)", // Each card takes up 33.33% width with equal spacing
    maxWidth: "calc(33.33% - 20px)", // Maximum width for each card
    boxSizing: "border-box", // Ensure padding is included in the width
  };

  return (
    <div style={cardStyle}>
      <h3>{user.fname}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Mobile No: {user.mobileno}</p>
    </div>
  );
};

export default CardEmp;
