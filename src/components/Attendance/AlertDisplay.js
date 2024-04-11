import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const AlertDisplay = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlerts = async (cid) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/alerts?cid=${cid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }
      const data = await response.json();
      setAlerts(data.alerts);
      setError(null);
    } catch (error) {
      console.error('Error fetching alerts:', error.message);
      setError('Failed to fetch alerts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('users'));
    if (userDetails && userDetails.cid) {
      const cid = userDetails.cid;
      fetchAlerts(cid);
    } else {
      console.warn('CID not found in localStorage');
    }
  }, []); // Fetch alerts only once when the component mounts

  const handleAlertClick = (alert) => {
    console.log('Clicked on alert:', alert);
  };

  const getAlertColor = () => '#ffffff'; // White color

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Box p={3}>
          <h2>Alerts</h2>
          <Box>
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={2}>
                {alerts.map((alert, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <Card onClick={() => handleAlertClick(alert)} style={{ backgroundColor: getAlertColor() }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{alert.title}</Typography>
                        <Typography variant="body1">{alert.message}</Typography>
                        {alert.userId && (                      
                          <Typography variant="body2">Created by: {alert.userId.fname}</Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
          <ToastContainer />
        </Box>
      </div>
    </div>
  );
};

export default AlertDisplay;
