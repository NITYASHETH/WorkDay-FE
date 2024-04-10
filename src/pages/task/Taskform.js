import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Container, TextField, TextareaAutosize, Button, Select, MenuItem, Box, InputLabel, Divider } from '@mui/material';
import taskIcon from '../../components/image/taskimg';


const TaskForm = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [cid, setCID] = useState('');
  const [assignedBy, setAssignedBy] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    assignedBy: '',
    dueDate: '',
    status: 'pending',
    isactive: true
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userDataString = localStorage.getItem('users');
        if (!userDataString) {
          throw new Error('User data not found in localStorage');
        }
        const userData = JSON.parse(userDataString);
  
        const cid = userData.cid;
  
        if (!cid) {
          throw new Error('CID is null');
        }
  
        const response = await fetch(`http://localhost:3001/users?role=employee&cid=${cid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        
        const filteredUsers = data.userList.filter(user => user.cid === cid);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      }
    };
    
    fetchUsers();

    const userDataString = localStorage.getItem('users');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setCID(userData.cid);
      setAssignedBy(userData.fname);
      setFormData(prevState => ({
        ...prevState,
        assignedBy: userData.fname
      }));
    } else {
      setError('User data not found in localStorage');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithCasedStatus = {
        ...formData,
        status: formData.status.charAt(0).toUpperCase() + formData.status.slice(1)
      };
  
      const res = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataWithCasedStatus)
      });
      const data = await res.json();
      setSuccessMessage('Task created successfully!');
      console.log('Task created:', data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container maxWidth="sm" className="container">
        <Box sx={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
  <Box sx={{ backgroundColor: '#f0f8ff', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
    <img src={taskIcon} alt="Task Icon" style={{ marginRight: '10px', height: '150px', width: '150px' }} />
  </Box>


            <Box p={2}>
              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
              <form className="card-form" onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                  <InputLabel htmlFor="title" style={{ textAlign: 'left', marginBottom: '8px', color: '#6439ff' }}>Title</InputLabel>
                  <TextField
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    size="small" // Set size to small
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <InputLabel htmlFor="description" style={{ textAlign: 'left', marginBottom: '8px', color: '#6439ff' }}>Description</InputLabel>
                  <TextareaAutosize
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px' }}
                    rowsMin={3} // Set minimum rows
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <InputLabel htmlFor="assignedTo" style={{ textAlign: 'left', marginBottom: '8px', color: '#6439ff' }}>Assigned To</InputLabel>
                  {users && users.length > 0 && (
                    <Select
                      id="assignedTo"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      fullWidth
                      required
                      size="small" // Set size to small
                    >
                      <MenuItem value="">Select User</MenuItem>
                      {users.map(user => (
                        <MenuItem key={user._id} value={user._id}>{user.fname}</MenuItem>
                      ))}
                    </Select>
                  )}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <InputLabel htmlFor="assignedBy" style={{ textAlign: 'left', marginBottom: '8px', color: '#6439ff' }}>Assigned By</InputLabel>
                  <TextField
                    id="assignedBy"
                    type="text"
                    value={assignedBy}
                    fullWidth
                    readOnly
                    style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px' }}
                    size="small" // Set size to small
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <InputLabel htmlFor="dueDate" style={{ textAlign: 'left', marginBottom: '8px', color: '#6439ff' }}>Due Date</InputLabel>
                  <TextField
                    id="dueDate"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                    style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px' }}
                    size="small" // Set size to small
                  />
                </Box>
                <Button type="submit" variant="contained" className="card-submit-btn">Submit</Button>
              </form>
            </Box>
            <Divider sx={{ borderColor: 'black', height: '1px' }} />
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default TaskForm;
