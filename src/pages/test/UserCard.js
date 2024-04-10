import React from "react";

const UserCard = ({ user }) => {
  console.log("User Data:", user); // Debug: Log user data

  return (
    <div className="user-card">
      <h2>User Card</h2>
      <p>First Name: {user.fname}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {/* Render other user data here */}
    </div>
  );
};

export default UserCard;
