import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Select, MenuItem, FormControl, InputLabel, InputAdornment, IconButton, Card } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './reg.css';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const CompanyReg = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    password: '',
    role: 'company', // Set default role to 'company'
    cid: '',
    mobileno: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the name field contains any numeric characters
    if (name === 'fname' && /\d/.test(value)) {
      // If it contains numbers, don't update the state
      return;
    }

    // Validate mobile number field to contain exactly 10 digits
    if (name === 'mobileno') {
      if (!/^\d{0,10}$/.test(value)) {
        // If mobile number is not more than 10 digits, don't update the state
        return;
      }
    }

    // Update the state only if the condition is not met
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      role: name === 'role' ? value : prevState.role // Ensure role is updated if changed
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fname, email, password, role, cid, mobileno } = formData;

    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex pattern (at least 6 characters with at least one digit and one of @,#,*)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#*])[A-Za-z\d@#*]{6,}$/;

    if (!fname.trim()) {
      toast.error('Name is required!', { position: 'top-center' });
    } else if (fname.trim().length < 4) {
      toast.error('Name is too short! It must be at least 4 characters long.', { position: 'top-center' });
    } else if (!email.trim()) {
      toast.error('Email is required!', { position: 'top-center' });
    } else if (!emailPattern.test(email)) {
      toast.warning('Invalid email format!', { position: 'top-center' });
    } else if (!password.trim()) {
      toast.error('Password is required!', { position: 'top-center' });
    } else if (!passwordPattern.test(password)) {
      toast.error('Password must be at least 6 characters with at least one digit and one of @,#,*!', { position: 'top-center' });
    } else {
      try {
        // Perform the registration
        const response = await fetch("http://localhost:3001/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // Clear form fields after successful registration
        setFormData({
          fname: '',
          email: '',
          password: '',
          role: 'company',
          cid: '',
          mobileno: ''
        });

        // Display success toast message
        toast.success('Registration Successfully done 😃! You will now be redirected to login page.', {
          position: 'top-center',
        });

        // Redirect to login page after successful registration
        // setTimeout(() => {
        //   navigate('/login');
        // }, 3000); // Redirect after 3 seconds
      } catch (error) {
        toast.error(error.message || 'Registration failed', {
          position: 'top-center',
        });
      }
    }
  };

  const getUserDetailsFunc = () => {
    const user = localStorage.getItem("users")
    const userDetails = JSON.parse(user)
    console.log("userDetails", userDetails)
    return userDetails?.role
  }

  return (
    <div className="home" style={{ backgroundImage: 'url("workday.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Sidebar />
      <div className="homeContainer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Navbar />
        <div className="top">
          {getUserDetailsFunc() === "admin" && <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">ADMINDASHBOARD</span>
          </Link>}
          {getUserDetailsFunc() === "hr" &&
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={Image} alt="user" style={{ height: '150px', width: '250px' }} />
            </Link>
          }
          {getUserDetailsFunc() === "company" && <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">COMPANY</span>
          </Link>}
        </div>
        <hr />
        <Container component="main" maxWidth="md">
          <div>
            <Card style={{ padding: '40px 20px', maxWidth: '400px', width: '100%', margin: 'auto' }}>
              <Typography variant="h4" component="h1" align="center" gutterBottom>Company Registration</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="fname"
                  label="Company Name"
                  name="fname"
                  autoComplete="name"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="Enter Your Company Name"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Company Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Company Email Address"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="cid"
                  label="Company ID"
                  name="cid"
                  autoComplete="cid"
                  value={formData.cid}
                  onChange={handleChange}
                  placeholder="Enter Company ID"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="mobileno"
                  label="Contact Number"
                  name="mobileno"
                  autoComplete="mobileno"
                  type="tel"
                  inputMode="numeric"
                  value={formData.mobileno}
                  onChange={handleChange}
                  placeholder="Enter Company Contact Number"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                >
                  Register
                </Button>
                {/* <Typography variant="body2">
                  Already have an account? <NavLink to="/login">Log In</NavLink>
                </Typography> */}
              </form>
            </Card>
          </div>
          <ToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default CompanyReg;
