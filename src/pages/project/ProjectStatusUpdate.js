import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectStatusUpdate({ projectId }) {
  const [status, setStatus] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch status options when component mounts
    fetchStatusOptions();
  }, []); // Run only once on component mount

  const fetchStatusOptions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/projects');
      if (response.data && response.data.length > 0) {
        // Assuming the project status is stored in each project object
        const uniqueStatuses = [...new Set(response.data.map(project => project.projectstatus))];
        setStatusOptions(uniqueStatuses);
      }
    } catch (error) {
      console.error('Error fetching status options:', error);
      setErrorMessage('Failed to fetch status options');
    }
  };

  const handleStatusUpdate = async () => {
    try {
      if (!status) {
        setErrorMessage('Please select a status');
        return;
      }

      const response = await axios.put(`http://localhost:3001/projects/${projectId}/status`, { status });
      if (response.status === 200) {
        setSuccessMessage('Project status updated successfully');
      } else {
        setErrorMessage('Failed to update project status');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      setErrorMessage('Failed to update project status');
    }
  };

  return (
    <div>
      <h3>Update Project Status</h3>
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        {statusOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={handleStatusUpdate}>Update Status</button>
    </div>
  );
}

export default ProjectStatusUpdate;
