// UserDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetails = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>First Name: {userDetails.fname}</p>
      <p>Email: {userDetails.email}</p>
      <p>Role: {userDetails.role}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default UserDetails;
