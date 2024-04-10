import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const GraphComponent = () => {
  const [dataForBarGraph, setDataForBarGraph] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user-salaries?cid=1&role=employee'); // Replace with your API endpoint
      setDataForBarGraph(response.data.dataForBarGraph);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Define custom colors
  const colors = ['#FFFF00', '#D71313', '#0C359E'];

  // Prepare data for the bar graph
  const chartData = {
    labels: dataForBarGraph.map(user => user.fname),
    datasets: [
      {
        label: 'Salary',
        backgroundColor: colors,
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: dataForBarGraph.map(user => user.salary),
        barThickness: 60, // Increase the thickness of the bars here
      },
    ],
  };

  return (
    <div style={{ position: 'absolute', top: '75%', left: '15%', transform: 'translateY(-50%)', width: '50%', height: '70%', backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2>User Salaries Bar Graph</h2>
      <div style={{ width: '100%', height: '90%', margin: '0 auto' }}>
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                ticks: {
                  autoSkip: false,
                },
              },
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

export default GraphComponent;
