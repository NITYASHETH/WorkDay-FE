import React, { useState } from 'react';
import "./leaveForm.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Applyleave() {
  const [leaveData, setLeaveData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Perform validation to ensure the selected dates are in the future
    if ((name === 'startDate' || name === 'endDate') && new Date(value) < new Date()) {
      toast.error("Please select a future date.");
      return;
    }

    // If the name is endDate and it's before the startDate, show an error
    if (name === 'endDate' && new Date(value) < new Date(leaveData.startDate)) {
      toast.error("End date cannot be before start date.");
      return;
    }

    setLeaveData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if reason field is empty
      if (!leaveData.reason.trim()) {
        toast.error("Please provide a reason.");
        return;
      }

      // Retrieve user details from localStorage
      const userDetails = JSON.parse(localStorage.getItem('users'));
  
      if (!userDetails || !userDetails._id) {
        console.warn('User details not found in localStorage');
        return; // Exit early if user details or user ID is not found or null
      }
  
      const user_id = userDetails._id; // Retrieve user_id from _id field
  
      // Check if leaveData is valid
      if (!leaveData.startDate || !leaveData.endDate) {
        console.warn('Leave data is incomplete');
        return; // Exit early if leave data is incomplete
      }
  
      // Include request_date_from based on startDate
      const request_date_from = new Date(leaveData.startDate);
  
      // Include request_date_to based on endDate
      const request_date_to = new Date(leaveData.endDate);
  
      const response = await fetch('http://localhost:3001/api/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          ...leaveData, 
          user_id, 
          request_date_from,
          request_date_to,
          description: leaveData.reason // Assuming reason corresponds to description
        }) // Include user_id, request_date_from, request_date_to, and description in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to create leave request');
      }
  
      // Optionally, you can handle success here (e.g., show a success message)
      toast.success('Leave request created successfully');
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error creating leave request:', error.message);
      // Handle errors gracefully, display an error message to the user, etc.
    }
  };
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="leave-form-container">
                <h2 className="text-center">Leave Request Form</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Start Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={leaveData.startDate}
                      onChange={handleChange}
                      required
                      disabled={formSubmitted} // Disable input if form is submitted
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={leaveData.endDate}
                      onChange={handleChange}
                      required
                      disabled={formSubmitted} // Disable input if form is submitted
                    />
                  </div>
                  <div className="form-group">
                    <label>Reason:</label>
                    <textarea
                      className="form-control"
                      name="reason"
                      value={leaveData.reason}
                      onChange={handleChange}
                      required
                      disabled={formSubmitted} // Disable input if form is submitted
                    ></textarea>
                  </div>
                  {!formSubmitted && (
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                  )}
                </form>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default Applyleave;
