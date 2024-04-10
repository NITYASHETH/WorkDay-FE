import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChartPage = () => {
  const [totalTasks, setTotalTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [cid, setCID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem('users');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { cid } = userData;
          setCID(cid);
          const response = await fetch(`http://localhost:3001/total-tasks?cid=${cid}`);
          const data = await response.json();
          // Ensure data.totalTasks is an array
          if (Array.isArray(data.totalTasks)) {
            setTotalTasks(data.totalTasks);
          } else {
            console.error('totalTasks is not an array:', data.totalTasks);
          }
          setLoading(false); // Set loading to false after data fetch
        } else {
          console.error('User data not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching total tasks:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [cid]);

  const labels = totalTasks.map((_, index) => `Day ${index + 1}`);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Tasks',
        data: totalTasks,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>Total Tasks Line Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
};

export default LineChartPage;
