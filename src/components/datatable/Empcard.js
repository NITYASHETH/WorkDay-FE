// EmpCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardEmp from "./CardEmp";

const Empcard = () => {
  const [data, setData] = useState([]);
  const cid = localStorage.getItem("cid"); // Retrieve cid from localStorage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setData(response.data.userList);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Filter data based on cid
  const filteredData = data.filter(user => user.cid === cid);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ flex: "0 0 calc(33.33% - 20px)", margin: "0 10px" }}>
        <Link to="/register" className="addButton">
          Add Users
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : filteredData.length > 0 ? (
        filteredData.map((user) => (
          <div key={user._id} style={{ flex: "0 0 calc(33.33% - 20px)", margin: "0 10px" }}>
            <CardEmp user={user} />
          </div>
        ))
      ) : (
        <p>No users found for this cid.</p>
      )}
    </div>
  );
};

export default Empcard;
