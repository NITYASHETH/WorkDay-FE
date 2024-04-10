import React, { useState, useEffect } from 'react';

function UserLeaveRequests() {
  const [userLeaveRequests, setUserLeaveRequests] = useState([]);
  const [error, setError] = useState(null);
  const [userFname, setUserFname] = useState('');

  useEffect(() => {
    // Retrieve user details from localStorage
    const userData = JSON.parse(localStorage.getItem('users'));
    if (!userData || !userData._id) {
      setError('User ID not found in localStorage');
      return;
    }

    // Extract user ID from userData
    const userId = userData._id;

    // Set user's first name
    setUserFname(userData.fname);

    async function fetchUserLeaveRequests() {
      try {
        const response = await fetch(`http://localhost:3001/api/leave/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leave requests');
        }

        const data = await response.json();
        setUserLeaveRequests(data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setError('Failed to fetch leave requests');
      }
    }

    fetchUserLeaveRequests();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{userFname}'s Leave Requests</h2>
      <ul>
        {userLeaveRequests.map(request => (
          <li key={request._id}>
            <div>
              <strong>Start Date:</strong> {request.request_date_from}
            </div>
            <div>
              <strong>End Date:</strong> {request.request_date_to}
            </div>
            <div>
              <strong>Description:</strong> {request.description}
            </div>
            <div>
              <strong>Status:</strong> {request.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserLeaveRequests;
