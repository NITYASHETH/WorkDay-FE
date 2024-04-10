import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = () => {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCid = getUserByCid();
        const response = await fetch(`http://localhost:3001/users?role=employee&cid=${userCid}`);
        const data = await response.json();
        setUsers(data.userList.map(user => ({ ...user, lastAttendance: {} })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const getUserByCid = () => {
      const userDataString = localStorage.getItem("users");
      const userData = JSON.parse(userDataString);
      return userData.cid;
    };
    fetchUsers();
  }, []);

  const handleMarkAttendance = async (userId, status) => {
    try {
      const userIndex = users.findIndex(user => user._id === userId);
      const user = users[userIndex];
      
      if (user.lastAttendance && isButtonDisabled(user.lastAttendance.date)) {
        toast.error(`Attendance is already marked for today.`);
        return;
      }

      const requestData = {
        user_id: userId,
        date: selectedDate.toISOString().slice(0, 10),
        status: status
      };

      const response = await fetch('http://localhost:3001/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Failed to mark attendance: ${response.status} ${response.statusText}`);
      }

      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...user, lastAttendance: { date: requestData.date, status } };
      setUsers(updatedUsers);

      toast.success(`Attendance marked for ${user.fname} with status: ${status}`);
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance. Please try again later.');
    }
  };

  const isButtonDisabled = (date) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return date === currentDate;
  };

  const renderUsers = () => {
    if (!Array.isArray(users) || users.length === 0) {
      return <div>Loading users...</div>;
    }

    return (
      <ul className="list-group">
        {users.map(user => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={user._id}>
            <div>
              <span className="mr-2">{user.fname}</span>
              <span>{user.email}</span>
            </div>
            <div>
              <button
                className="btn btn-sm btn-success mr-2"
                onClick={() => handleMarkAttendance(user._id, 'present')}
                disabled={user.lastAttendance && isButtonDisabled(user.lastAttendance.date)}
              >
                Present
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleMarkAttendance(user._id, 'absent')}
                disabled={user.lastAttendance && isButtonDisabled(user.lastAttendance.date)}
              >
                Absent
              </button>
            </div>
            {user.lastAttendance && isButtonDisabled(user.lastAttendance.date) && (
              <span className={`badge badge-${user.lastAttendance.status === 'present' ? 'success' : 'danger'}`}>
                {user.lastAttendance.status}
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    console.log('Users:', users);
  }, [users]);

  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
    
        <div className="container mt-5">
          <h1 className="mb-3">User Attendance</h1>
          <div className="mb-3">
            <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
          </div>
          {renderUsers()}
        </div>
        <ToastContainer />
      </div>
    </div>
    
  );
};

export default Form;
