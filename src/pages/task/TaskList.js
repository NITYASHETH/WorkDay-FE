import React, { useState, useEffect } from 'react';

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks based on user's role and assignment
    const fetchTasks = async () => {
      let url = 'http://localhost:3001/tasks';
      if (user.role === 'employee') {
        // For employees, fetch tasks assigned to them
        url += `?assignedTo=${user._id}`;
      } else if (user.role === 'manager') {
        // For managers, fetch tasks assigned by them
        url += `?assignedBy=${user._id}`;
      }
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>Title:</strong> {task.title}<br />
            <strong>Description:</strong> {task.description}<br />
            {/* Add more task details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
