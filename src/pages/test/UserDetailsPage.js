// UserDetailsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetailsPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      // Fetch user details using the ID from the URL
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      setUser(response.data); // Assuming user details are returned as an object
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.fname}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserDetailsPage;
