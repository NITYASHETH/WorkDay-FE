import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

function NewLeave() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeaveRequests() {
      try {
        // Retrieve cid from localStorage
        const cid = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).cid : null;
        if (!cid) {
          throw new Error('CID not found in localStorage');
        }
  
        const response = await fetch(`http://localhost:3001/api/leave?cid=${cid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch leave requests');
        }
        
        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setError('Failed to fetch leave requests');
      }
    }
    
    fetchLeaveRequests();
  }, []);
  
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/leave/${id}/${newStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update leave status');
      }
      // Update the status locally
      setLeaveRequests(prevLeaveRequests =>
        prevLeaveRequests.map(request =>
          request._id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Error updating leave status:', error);
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
        <div style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <h2>Leave Requests</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Requested By</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRequests.map(request => (
                  <TableRow key={request._id}>
                    <TableCell>{request.request_date_from}</TableCell>
                    <TableCell>{request.request_date_to}</TableCell>
                    <TableCell>{request.description}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.user_id.fname}</TableCell>
                    <TableCell>
                      <Button
                        style={{ backgroundColor: request.status === 'approved' ? '#90D26D' : '', color: request.status === 'approved' ? 'white' : 'black' }}
                        disabled={request.status === 'approved' || request.status === 'rejected'}
                        onClick={() => handleStatusUpdate(request._id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        style={{ backgroundColor: request.status === 'rejected' ? '#E72929' : '', color: request.status === 'rejected' ? 'white' : 'black' }}
                        disabled={request.status === 'approved' || request.status === 'rejected'}
                        onClick={() => handleStatusUpdate(request._id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default NewLeave;
