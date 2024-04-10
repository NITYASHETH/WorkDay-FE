import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const LineComponent = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/employee-leave-chart/4?cid=your_cid_value');
      setEmployeeData(response.data.employeeLeaveData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const chartData = {
    labels: employeeData.map(employee => `${employee.fname} (${employee.cid})`),
    datasets: [
      {
        label: 'Total Leave',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: employeeData.map(employee => employee.totalLeaveForMonth)
      }
    ]
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee Leave Line Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineComponent;
