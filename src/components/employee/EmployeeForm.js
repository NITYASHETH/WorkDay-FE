import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

const EmployeeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [assignedByName, setAssignedByName] = useState('');
  const [project, setProject] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

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
        setUsers(data.userList);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data); // Assuming the response data is an array of projects
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error fetching projects');
      }
    };
    
    fetchUsers();
    fetchProjects();

    const userDataString = localStorage.getItem('users');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setAssignedBy(userData._id); // Assuming `_id` is the ObjectId of the user
      setAssignedByName(userData.fname); // Set assigned by name
    } else {
      setError('User data not found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchAssignedBy = async () => {
      try {
        if (!assignedBy) return;
        const assignedByUser = await fetch(`http://localhost:3001/users/${assignedBy}`);
        if (!assignedByUser.ok) {
          throw new Error('Failed to fetch assigned by user');
        }
        const data = await assignedByUser.json();
        setAssignedByName(data.fname); // Update assigned by name
      } catch (error) {
        console.error('Error fetching assigned by user:', error);
        setError('');
      }
    };

    fetchAssignedBy();
  }, [assignedBy]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Title Validation: Ensure no numeric values
      if (!/^\D+$/.test(title)) {
        throw new Error('Title should not contain numeric values');
      }

      // Description Validation: Ensure no numeric values
      if (!/^\D+$/.test(description)) {
        throw new Error('Description should not contain numeric values');
      }

      // Due Date Validation: Ensure future dates only
      const currentDate = new Date();
      const selectedDate = new Date(dueDate);
      if (selectedDate <= currentDate) {
        throw new Error('Due date must be in the future');
      }

      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          status: 'pending',
          assignedTo,
          assignedBy,
          project,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const data = await response.json();
      console.log('Task created successfully:', data);
      setSuccessMessage('Task created successfully'); // Set success message
      // Clear form fields after successful submission
      setTitle('');
      setDescription('');
      setDueDate('');
      setAssignedTo('');
      setProject('');
    } catch (error) {
      console.error('Error creating task:', error.message);
      setError(error.message);
    }
  };

 return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
          <Card style={{ width: '70%', margin: '20px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="h4" component="h1" style={{ marginBottom: '20px', fontStyle: 'italic', textAlign: 'center' }}>
                Assign Task
              </Typography>
              <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
                <div style={{ width: '100%' }}>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    margin="dense"
                    style={{ marginBottom: '20px' }}
                  />
                  <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                    margin="dense"
                    style={{ marginBottom: '20px' }}
                  />
                  <TextField
                    label="Due Date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    fullWidth
                    margin="dense"
                    style={{ marginBottom: '20px' }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControl fullWidth margin="dense" style={{ marginBottom: '20px' }}>
                    <InputLabel htmlFor="assignedTo">Assigned To</InputLabel>
                    <Select
                      id="assignedTo"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      required
                      fullWidth
                    >
                      <MenuItem value="">Select User</MenuItem>
                      {users.map(user => (
                        <MenuItem key={user._id} value={user._id}>{user.fname}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Assigned By"
                    value={assignedByName}
                    fullWidth
                    margin="dense"
                    style={{ marginBottom: '20px' }}
                    readOnly
                  />
                  <FormControl fullWidth margin="dense" style={{ marginBottom: '20px' }}>
                    <InputLabel htmlFor="project">Project</InputLabel>
                    <Select
                      id="project"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      required
                      fullWidth
                    >
                      <MenuItem value="">Select Project</MenuItem>
                      {projects.map(project => (
                        <MenuItem key={project._id} value={project._id}>{project.projectname}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <Button type="submit" variant="contained" color="primary" style={{ alignSelf: 'center' }}>
                  Submit
                </Button>
              </form>
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
