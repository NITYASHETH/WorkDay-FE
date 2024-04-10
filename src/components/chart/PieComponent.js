import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const PieComponent = () => {
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch task count for the specific user
      const response = await axios.get(`http://localhost:3001/user/65d5bd414a8872bfd44e50aa/task-count`);
      setTaskCount(response.data.taskCount);
    } catch (error) {
      console.error('Error fetching task count:', error);
    }
  };

  const chartData = {
    labels: ['Tasks Assigned'],
    datasets: [
      {
        label: 'Task Count',
        data: [taskCount],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };    

  return (
    <div style={{ width: '300px', height: '200px' }}>
      <h2>Task Count for User (Line Chart)</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PieComponent;
