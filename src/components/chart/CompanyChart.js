import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const CompanyChart = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/company'); // Assuming this is your API endpoint
        setCompanyData(response.data.companyList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data:', error);
        setError('Failed to fetch company data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Prepare data for the parabola graph
  const parabolaData = {
    labels: companyData.map(company => company.companyName),
    datasets: [
      {
        label: 'Company Parabola',
        data: companyData.map((company, index) => ({ x: index, y: index * index })),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  };

  // Options for the parabola graph
  const parabolaOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Company Name',
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Parabola Value',
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Total Companies</h2>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Line data={parabolaData} options={parabolaOptions} />
      </div>
    </div>
  );
};

export default CompanyChart;
