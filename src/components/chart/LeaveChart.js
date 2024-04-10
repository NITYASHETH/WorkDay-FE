// LeaveChart.js

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const LeaveChart = () => {
  const [leaveStats, setLeaveStats] = useState({});

  useEffect(() => {
    const fetchLeaveStats = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/leave');
          setLeaveStats(response.data);
        } catch (error) {
          console.error('Error fetching leave stats:', error);
        }
      };
      

    fetchLeaveStats();
  }, []);

  return (
    <div>
      <h2>Leave Statistics</h2>
      <div style={{ height: '400px', width: '400px' }}>
        <Bar
          data={{
            labels: ['Total Leave', 'Approved Leave', 'Rejected Leave'],
            datasets: [
              {
                label: 'Leave Requests',
                data: [
                  leaveStats.totalLeave,
                  leaveStats.approvedLeave,
                  leaveStats.rejectedLeave,
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LeaveChart;
