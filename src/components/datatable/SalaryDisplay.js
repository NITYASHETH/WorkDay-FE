import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SalaryDisplay = () => {
  const [salaries, setSalaries] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchSalaries();
    const userDataString = localStorage.getItem("users");
    const userData = JSON.parse(userDataString);
    setUserName(userData.fname); // Set user name from localStorage
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get("http://localhost:3001/salaries");
      if (response.data.success) {
        setSalaries(response.data.salaries);
      } else {
        console.error("Failed to fetch salaries:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching salaries:", error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div>
          <h2>Salary Display for HR {userName}</h2>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                {/* <th scope="col">Last</th> */}
                {/* <th scope="col">Handle</th> */}
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary) => (
                <tr key={salary._id}>
                  <td>{salary.userId}</td>
                  <td>{salary.amount}</td>
                  {/* <td>{salary.lastName}</td> */}
                  {/* <td>{salary.handle}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalaryDisplay;
