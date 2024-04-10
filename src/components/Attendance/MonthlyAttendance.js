import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Grid } from '@mui/material';

async function fetchMonthlyAttendance(month, year) {
  const url = `http://localhost:3001/monthly-attendance?month=${month}&year=${year}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch monthly attendance');
  }
  return response.json();
}

function MonthlyAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetchMonthlyAttendance(month, year);
      setAttendanceData(response.monthly_attendance);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch monthly attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Card variant="outlined" style={{ width: '80%', maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Monthly Attendance
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Month"
                  type="text"
                  variant="outlined"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Year"
                  type="text"
                  variant="outlined"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!month || !year || loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
          {error && (
            <Typography variant="body1" color="error" style={{ marginTop: 20 }}>
              Error: {error}
            </Typography>
          )}
          {!loading && attendanceData.length > 0 && (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {attendanceData.map((entry) => (
                <li key={entry.user_id} style={{ marginBottom: 20 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">
                        User Name: {entry.user_name}
                      </Typography>
                      <Typography>
                        Total Hours: {entry.total_hours}
                      </Typography>
                      <Typography>
                        Presence Days: {entry.presence_days}
                      </Typography>
                      <Typography>
                        Absence Days: {entry.absence_days}
                      </Typography>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MonthlyAttendance;
