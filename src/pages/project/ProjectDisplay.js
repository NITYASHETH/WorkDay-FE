import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectDisplay() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects when component mounts
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <div>Project Name: {project.projectname}</div>
            <div>Created Date: {project.projectcreateddate}</div>
            <div>Due Date: {project.projectduedate}</div>
            <div>Description: {project.projectdescription}</div>
            <div>Status: {project.projectstatus}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDisplay;
