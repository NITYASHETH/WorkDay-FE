import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Wavegraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user ID from local storage
        const users = JSON.parse(localStorage.getItem('users'));
        const userId = users.userId; // Adjust the key based on your data structure
        
        // Get current month and year
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const response = await axios.get('http://localhost:3001/attendance/monthlyWithFname', {
          params: {
            userId: userId,
            month: month,
            year: year,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!data || !data.success) {
    return <p>No data found</p>;
  }

  const { fname, totalAttendance } = data;

  // Chart data
  const chartData = {
    labels: [fname], // X-axis label
    datasets: [
      {
        label: 'Total Attendance',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [totalAttendance], // Y-axis data
      },
    ],
  };

  return (
    <div>
      <h2>Total Attendance for {fname}</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <Bar
          data={chartData}
          options={{
            title: {
              display: true,
              text: `Total Attendance for ${fname}`,
              fontSize: 20,
            },
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Wavegraph;
