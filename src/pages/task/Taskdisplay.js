import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const TaskDisplay = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks. Please try again later.');
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
      const updatedTask = await response.json();
      setTasks(prevTasks => prevTasks.map(task => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div style={{ overflow: 'hidden', height: '80vh' }}> {/* Fixed height and hidden overflow */}
          <TableContainer component={Paper} style={{ overflow: 'auto' }}> {/* Allow scrolling within the container */}
            <Table aria-label="tasks table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map(task => (
                  <TableRow key={task._id}>
                    <TableCell component="th" scope="row">{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>
                      {task.status !== 'Completed' && (
                        <Button onClick={() => handleStatusChange(task._id, 'InProgress')} variant="contained" style={{ marginRight: '8px' }}>
                          Mark as In Progress
                        </Button>
                      )}
                      {task.status !== 'Completed' && (
                        <Button onClick={() => handleStatusChange(task._id, 'Completed')} variant="contained">
                          Mark as Completed
                        </Button>
                      )}
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
};

export default TaskDisplay;
