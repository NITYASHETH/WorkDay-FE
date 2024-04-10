import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Alert = () => {
  const [open, setOpen] = useState(true);
  const [alertType, setAlertType] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  // Fetch userId from localStorage
  const userId = JSON.parse(localStorage.getItem('users'))._id;

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alertType,
          title,
          message,
          userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create alert');
      }

      console.log('Alert created successfully');
      setOpen(false);

      // Redirect to http://localhost:3000/ on successful submission
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error('Error creating alert:', error.message);
      setError(error.message || 'Failed to create alert. Please try again.');
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setAlertType('');
    setTitle('');
    setMessage('');
    setError(null);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Create Alert</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Alert Type</InputLabel>
          <Select
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
          >
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="warning">Warning</MenuItem>
            <MenuItem value="danger">Danger</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Message"
          type="text"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="contained" color="error">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: 'purple', color: 'white' }}>Request Now</Button>
      </DialogActions>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Dialog>
    </div>
    </div>
  );
};

export default Alert;
