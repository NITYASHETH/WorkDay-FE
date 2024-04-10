import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar'; // Import Navbar component
import { TextField, Button, Typography } from '@mui/material';

const SalaryView = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [calculatedSalary, setCalculatedSalary] = useState(null);
  const [error, setError] = useState('');

  // Retrieve userId from localStorage
  const user = JSON.parse(localStorage.getItem('users'));
  const userId = user ? user._id : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/salary?userId=${userId}&month=${month}&year=${year}`);
      const { calculatedSalary } = response.data;
      setCalculatedSalary(calculatedSalary);
    } catch (error) {
      setError('Error calculating salary');
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ padding: '50px', border: '3px solid #ccc', borderRadius: '20px', width: 'fit-content' }}>
            <Typography variant="h4" gutterBottom>Calculate Salary</Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField
                label="Month"
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                margin="normal"
                size="small"
                style={{ width: '400px', marginBottom: '15px' }} // Increased width
              />
              <TextField
                label="Year"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                margin="normal"
                size="small"
                style={{ width: '400px', marginBottom: '15px' }} // Increased width
              />
              <Button type="submit" variant="contained" color="primary">Calculate</Button>
            </form>
            {calculatedSalary && (
              <div>
                <Typography variant="h5" gutterBottom>Calculated Payroll:</Typography>
                <Typography>{calculatedSalary}</Typography>
              </div>
            )}
            {error && <Typography color="error">{error}</Typography>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryView;
