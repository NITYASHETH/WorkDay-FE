import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Select, MenuItem, FormControl, InputLabel, InputAdornment, IconButton, Grid, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './reg.css';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    password: '',
    role: '',
    cid: '',
    mobileno: '',
    city: '',
    state: '',
    country: '',
    gender: ''
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
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { fname, email, password, role, cid, mobileno, city, state, country, gender } = formData;
  
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
    } else if (!country.trim()) {
      toast.error('Country is required!', { position: 'top-center' });
    } else if (!gender) {
      toast.error('Gender is required!', { position: 'top-center' });
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
          role: '',
          cid: '',
          mobileno: '',
          city: '',
          state: '',
          country: '',
          gender: ''
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
  

  // Array of Indian states
  const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

  // Array of cities in India
  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
    "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Indore", "Thane", "Bhopal", "Patna", "Vadodara", "Ghaziabad",
    "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", "Varanasi", "Srinagar",
    "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Jabalpur", "Gwalior", "Vijayawada",
    "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubballi-Dharwad", "Tiruchirappalli", "Bareilly"
  ];

  const getUserDetailsFunc = () => {
    const user = localStorage.getItem("users")
    const userDetails = JSON.parse(user)
    console.log("userDetails", userDetails)
    return userDetails?.role
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
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
        <Container component="main" maxWidth="md" className="form-container">
          <div>
            <div className="form-header">
              <Typography variant="h4" component="h1">Sign Up</Typography>
            </div>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="Name"
                    name="fname"
                    autoComplete="name"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
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
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      label="Role"
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="employee">Employee</MenuItem>
                      <MenuItem value="hr">HR</MenuItem>
                      {/* <MenuItem value="company">Company</MenuItem> */}
                      <MenuItem value="manager">Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="cid"
                    label="CID"
                    name="cid"
                    autoComplete="cid"
                    value={formData.cid}
                    onChange={handleChange}
                    placeholder="Enter CI"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="mobileno"
                    label="Mobile Number"
                    name="mobileno"
                    autoComplete="mobileno"
                    type="tel"
                    inputMode="numeric"
                    value={formData.mobileno}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                  />
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="city-label">City</InputLabel>
                    <Select
                      labelId="city-label"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      label="City"
                    >
                      {indianCities.map(city => (
                        <MenuItem key={city} value={city}>{city}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="state-label">State</InputLabel>
                    <Select
                      labelId="state-label"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      label="State"
                    >
                      {indianStates.map(state => (
                        <MenuItem key={state} value={state}>{state}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    autoComplete="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter Country"
                  />
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="btn"
              >
                Sign Up
              </Button>
            </form>
            <ToastContainer />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Register;
