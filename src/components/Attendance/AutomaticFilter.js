import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import './Automatic.css'; // Import the CSS file for styling

function AutomaticFilter() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function markAttendance() {
    try {
      const response = await fetch('http://localhost:3001/mark-attendance-filtered', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data.attendance_status);
        setLoading(false);
      } else {
        console.error('Failed to mark attendance:', response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }

  useEffect(() => {
    markAttendance();
  }, []);

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom className="title">AutomaticFilter Attendance</Typography>
      {loading ? (
        <CircularProgress className="loader" />
      ) : (
        <List className="attendanceList">
          {attendanceData.map((entry, index) => (
            <ListItem key={index} className={`listItem ${entry.status === 'present' ? 'present' : 'absent'}`}>
              <ListItemText primary={`User Name: ${entry.user_name}`} secondary={`Status: ${entry.status}, Date: ${new Date(entry.date).toDateString()}`} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default AutomaticFilter;
