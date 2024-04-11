import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField'; // Import TextField from Material-UI
import './modalstyles.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450, // Increase the width
  bgcolor: '#f0f0f0', // Light gray background color
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px', // Add border radius for rounded corners
};

function PayrollModel() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMonthChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) { // Allow only digits
      setMonth(value);
    }
  };

  const handleYearChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) { // Allow only digits
      setYear(value);
    }
  };

  const handleSubmit = async () => {
    if (!month || !year) {
      setError('Please enter both month and year.');
      return;
    }

    try {
      // Extract user ID from localStorage
      const user = JSON.parse(localStorage.getItem('users'));
      const userId = user._id;

      // Send POST request to calculate salary details
      const response = await fetch('http://localhost:3001/calculate-salary-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          month,
          year
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // Parse response data
      const data = await response.json();
      setResult(data);
      setError(null);
      handleOpen(); // Open modal after submission
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <div className="payroll-form" style={{ background: '#fff', padding: '50px 20px', borderTop: '10px solid #f45702', borderRadius: '10px' }}>
                <h2 style={{ fontWeight: 'normal', fontSize: '12pt', fontStyle: 'italic', margin: '0 0 .5em 0' }}>Enter Month and Year</h2>
                <TextField
                  autoFocus
                  type="text"
                  label="Month"
                  value={month}
                  onChange={handleMonthChange}
                  variant="outlined"
                  fullWidth // Make TextField full width
                  style={{ marginBottom: '24px' }}
                />
                <TextField
                  type="text"
                  label="Year"
                  value={year}
                  onChange={handleYearChange}
                  variant="outlined"
                  fullWidth // Make TextField full width
                  style={{ marginBottom: '24px' }}
                />
                <Button onClick={handleSubmit} className="btn btn-primary">
                  Submit
                </Button>
                {error && <p style={{ color: 'white', marginTop: '10px' }}>{error}</p>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
  <Fade in={open}>
  <Box sx={{
    ...style,
    width: '600px', // Increase the width
    height: '400px', // Increase the height
    bgcolor: '#ffffcc', // Light yellow background color
    padding: '30px', // Increase padding for better spacing
  }}>
    <Typography id="transition-modal-title" variant="h3" component="h2" style={{ fontWeight: 'bold', fontSize: '16pt', fontStyle: 'italic', margin: '0 0 .5em 0' }}>
  Payroll Result
</Typography>
    <hr style={{ margin: '20px 0' }} /> {/* Divider */}
    {error && <p>{error}</p>}
    {result && (
      <div>
        <h4 style={{ fontWeight: 'normal', fontSize: '16pt', fontStyle: 'italic', margin: '0 0 .5em 0' }}> Total Present Days: <strong>{result.totalPresentDays}</strong></h4>
        <h4 style={{ fontWeight: 'normal', fontSize: '16pt', fontStyle: 'italic', margin: '0 0 .5em 0' }}>  Total Salary for Month: <strong>{result.totalSalaryForMonth}</strong></h4>
        <h4 style={{ fontWeight: 'normal', fontSize: '16pt', fontStyle: 'italic', margin: '0 0 .5em 0' }}>Calculated Salary:<strong> {result.calculatedSalary}</strong></h4>
      </div>
    )}
  </Box>
</Fade>






      </Modal>
    </div>
  );
}

export default PayrollModel;
