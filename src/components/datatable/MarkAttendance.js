import React, { useState, useEffect } from "react";
import axios from "axios";
import "./hr.scss";

const MarkAttendance = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRole = getUserRole();
      const userCid = getUserByCid();
      let endpoint = `http://localhost:3001/users`;

      switch (userRole) {
        case "admin":
          break;
        case "hr":
          endpoint = `http://localhost:3001/users?role=manager&role=employee&cid=${userCid}`;
          break;
        case "employee":
          endpoint = "http://localhost:3001/profile";
          break;
        case "company":
          endpoint = `http://localhost:3001/users?role=manager&role=employee&role=hr&cid=${userCid}`;
          break;
        case "manager":
          endpoint = `http://localhost:3001/users?role=employee&cid=${userCid}`;
          break;
        default:
          break;
      }

      const response = await axios.get(endpoint);

      const userListWithId = response.data.userList.map((user, index) => ({
        ...user,
        id: user._id,
        attendance: "Not Marked" // Add attendance field
      }));

      setData(userListWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUserRole = () => {
    const userDataString = localStorage.getItem("users");
    const userData = JSON.parse(userDataString);
    return userData.role;
  };

  const getUserByCid = () => {
    const userDataString = localStorage.getItem("users");
    const userData = JSON.parse(userDataString);
    return userData.cid;
  };

  const handleAttendanceChange = (userId, status) => {
    setData(prevData =>
      prevData.map(user =>
        user.id === userId ? { ...user, attendance: status } : user
      )
    );
  };

  const handleSubmitAttendance = async () => {
    try {
      const attendanceRecords = data.map(user => ({
        userId: user.id,
        status: user.attendance === "Present" ? "Present" : "Absent"
      }));

      const response = await axios.post("http://localhost:3001/attendance", attendanceRecords);
      console.log("Attendance marked for users:", response.data);
    } catch (error) {
      if (error.response) {
        console.log("Server responded with error status:", error.response.status);
        console.log("Error response data:", error.response.data);
      } else if (error.request) {
        console.log("No response received from the server");
      } else {
        console.log("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div className="datatable">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.fname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={user.attendance}
                  onChange={(e) => handleAttendanceChange(user.id, e.target.value)}
                >
                  <option value="Not Marked">Not Marked</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmitAttendance}>Submit Attendance</button>
    </div>
  );
};

export default MarkAttendance;
