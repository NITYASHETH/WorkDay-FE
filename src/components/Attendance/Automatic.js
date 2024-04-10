import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

function Automatic() {
  const [usersTimings, setUsersTimings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/users-timings');
        if (response.ok) {
          const data = await response.json();
          const users = JSON.parse(localStorage.getItem('users'));
          const cid = users.cid;
          const filteredUsersTimings = data.all_users_timings.filter(user => user.cid === cid);
          setUsersTimings(filteredUsersTimings);
          setLoading(false);
        } else {
          console.error('Failed to fetch users timings:', response.statusText);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home">
      <Sidebar className="sidebar" />
      <div className="homeContainer">
        <Navbar />
        <div className="container">
          <Typography variant="h4" gutterBottom className="title">Users Timings</Typography>
          {loading ? (
            <CircularProgress className="loader" />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Timings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersTimings.map((userTimings, index) => (
                    <TableRow key={index}>
                      <TableCell>{userTimings.user_id}</TableCell>
                      <TableCell>{userTimings.name}</TableCell> {/* Display name here */}
                      <TableCell>{userTimings.email}</TableCell>
                      <TableCell>
                        <ul>
                          {userTimings.timings.map((timing, index) => (
                            <li key={index}>
                              Login Time: {new Date(timing.login_time).toLocaleString()}, Logout Time: {new Date(timing.logout_time).toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Automatic;
