import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ProjectGraph = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch projects data from the API
        const response = await axios.get('http://localhost:3001/projects?cid=2'); // Adjust the URL to include the cid parameter
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Extract data for the parabola graph
  const data = {
    labels: projects.map(project => project.projectname),
    datasets: [
      {
        label: 'Project Count',
        data: projects.map((_, index) => index ** 2), // Parabola function
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Inline CSS styles
  const graphContainerStyles = {
    backgroundColor: 'white', // White background
    padding: '20px', // Padding
    marginTop: '20px', // Margin top
    width: '90%', // Width
    maxWidth: '1000px', // Maximum width
    height: '400px', // Height
  };

  return (
    <div style={graphContainerStyles}>
      <h2>Projects</h2>
      <Line data={data} />
    </div>
  );
};

export default ProjectGraph;
