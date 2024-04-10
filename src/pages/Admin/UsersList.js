import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const UserCard = ({ user }) => {
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    flex: '1 0 calc(33.33% - 20px)', // Set flex basis to evenly distribute space for 3 cards
    maxWidth: 'calc(33.33% - 20px)', // Limit card width to maintain 3 cards per row with equal space
    marginRight: '20px', // Add margin between cards
    boxSizing: 'border-box', // Include padding and border in the width calculation
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '20px',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={cardStyle}>
      <div style={avatarStyle}>
        <img src={`https://ui-avatars.com/api/?name=${user.fname}`} alt={`${user.fname}'s avatar`} style={imageStyle} />
      </div>
      <div>
        <h3>{user.fname}</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>CID: {user.cid}</p>
        <p>Mobile No: {user.mobileno}</p>
        {/* Add other fields as needed */}
      </div>
    </div>
  );
};

const UsersList = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users based on role
        const response = await fetch(`http://localhost:3001/users?role=company`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        if (data.status === 1) {
          // Set the fetched users
          setUsers(data.userList);
        } else {
          throw new Error(data.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, [role]); // Fetch users when role changes

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', padding: '20px' }}>
          <h2>User List</h2>
          {error && <p>{error}</p>}
          <div className="user-cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {users.map(user => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
