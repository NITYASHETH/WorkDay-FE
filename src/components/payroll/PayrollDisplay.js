import React, { useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function PayrollDisplay() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSalaries() {
      try {
        const userData = JSON.parse(localStorage.getItem('users')); // Retrieve user data from localStorage
        if (!userData || !userData.cid) {
          throw new Error('CID not found in user data');
        }

        const response = await fetch(`http://localhost:3001/user-salaries?cid=${userData.cid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.success) {
          setSalaries(data.dataForBarGraph);
        } else {
          throw new Error(data.message || 'Unknown error');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSalaries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Box>
          <Typography variant="h2" gutterBottom>Salary Details</Typography>
          <TableContainer component={Paper} style={{ maxHeight: '80vh' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salaries.map((salary, index) => (
                  <TableRow key={index}>
                    <TableCell>{salary.fname}</TableCell>
                    <TableCell>{salary.cid}</TableCell>
                    <TableCell>{salary.salary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
}

export default PayrollDisplay;
