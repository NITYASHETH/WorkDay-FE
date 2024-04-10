import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('usersdatatoken');

        const response = await fetch('http://localhost:3001/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the authorization token
          }
        });

        if (response.ok) {
          // Logout successful
          localStorage.removeItem('usersdatatoken');
          // navigate('/login');
          window.location.href = '/login'
          toast.success('Logout successful', { position: 'top-center' });
        } else {
          // Check if response status is 401 (Unauthorized)
          if (response.status === 401) {
            // Handle unauthorized access (token expired or invalid)
            localStorage.removeItem('usersdatatoken');
            // navigate('/login');
            window.location.href = '/login'
            toast.error('Session expired. Please log in again.', { position: 'top-center' });
          } else {
            // Get error message from response body
            const errorMessage = await response.text();
            toast.error(errorMessage || 'Logout failed', { position: 'top-center' });
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again later.', { position: 'top-center' });
      }
    };

    handleLogout(); // Call handleLogout when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return <ToastContainer />;
};

export default Logout;
