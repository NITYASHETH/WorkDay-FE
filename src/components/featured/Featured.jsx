import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const Featured = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:3001/mark-attendance');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Attendance data:', data);
        setAttendanceData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setError('Failed to fetch attendance data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const labels = attendanceData.map(entry => entry.label);
  const values = attendanceData.map(entry => entry.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Attendance',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <h2>Attendance Pie Chart</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Pie data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default Featured;
