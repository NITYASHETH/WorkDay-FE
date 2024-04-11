import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, Typography, TextField, TextareaAutosize, Snackbar, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Alert } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

function ProjectCreate() {
  const [formData, setFormData] = useState({
    userId: '',
    projectname: '',
    projectcreateddate: '',
    projectduedate: '',
    projectdescription: '',
    projectstatus: 'Pending'
  });
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('users'));
    if (userData && userData._id) {
      setFormData({ ...formData, userId: userData._id });
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('users'));
      const cid = userData && userData.cid ? userData.cid : ''; // Get cid from localStorage
      const response = await axios.get(`http://localhost:3001/projects?cid=${cid}`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setErrorMessage('Failed to fetch projects');
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.projectname || !formData.projectcreateddate || !formData.projectduedate || !formData.projectdescription) {
        setErrorMessage('Please fill out all fields');
        return;
      }

      // Validate project created date and due date
      const currentDate = new Date().toISOString().split('T')[0];
      if (formData.projectcreateddate < currentDate) {
        setErrorMessage('Project created date cannot be a past date');
        return;
      }
      if (formData.projectduedate <= formData.projectcreateddate) {
        setErrorMessage('Due date cannot be before the start date');
        return;
      }

      const response = await axios.post('http://localhost:3001/projects', formData);
      console.log(response.data);
      setSuccessMessage('Project added successfully');
      setOpenSnackbar(true);
      setFormData({
        ...formData,
        projectname: '',
        projectcreateddate: '',
        projectduedate: '',
        projectdescription: ''
      });
      fetchProjects();
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage('Failed to create project');
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:3001/projects/${projectId}`);
      setSuccessMessage('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setErrorMessage('Failed to delete project');
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Project</h2>
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Project Name"
              variant="outlined"
              name="projectname"
              value={formData.projectname}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Project Created Date"
              type="date"
              variant="outlined"
              name="projectcreateddate"
              value={formData.projectcreateddate}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '10px' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Project Due Date"
              type="date"
              variant="outlined"
              name="projectduedate"
              value={formData.projectduedate}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '10px' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextareaAutosize
              aria-label="Project Description"
              placeholder="Project Description"
              name="projectdescription"
              value={formData.projectdescription}
              onChange={handleChange}
              rows={4}
              style={{ width: '100%', marginBottom: '10px', padding: '5px', borderRadius: '4px', borderColor: '#ccc', resize: 'none', minHeight: '100px' }}
            />
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                Create Project
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Current Projects</h2>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.projectname}</TableCell>
                <TableCell>{project.projectcreateddate}</TableCell>
                <TableCell>{project.projectduedate}</TableCell>
                <TableCell>{project.projectdescription}</TableCell>
                <TableCell>{project.projectstatus}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(project._id)} variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" style={{ marginBottom: '20px' }}>
        <Button onClick={handlePrevious} variant="contained" color="primary" style={{ marginRight: '10px' }}>
          &lt;&lt;
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          &gt;&gt;
        </Button>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Project added successfully!
        </Alert>
      </Snackbar>
    </div>
    </div>
    </div>
  );
}

export default ProjectCreate;
