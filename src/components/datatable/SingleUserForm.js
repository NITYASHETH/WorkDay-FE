// SingleUserForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleUserForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        setUser(response.data); // Assuming the response contains user details
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>First Name: {user.fname}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {/* Display other user details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleUserForm;
