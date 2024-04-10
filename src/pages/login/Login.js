import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './image.css'; // Import CSS file
import logologin from '../../components/image/Image';

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === '') {
      toast.error('Email is required!', { position: 'top-center' });
    } else if (!email.includes('@')) {
      toast.warning('Include @ in your email!', { position: 'top-center' });
    } else if (password === '') {
      toast.error('Password is required!', { position: 'top-center' });
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters!', {
        position: 'top-center',
      });
    } else {
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("data?>",data)
        if (data.status === 1) {
          localStorage.setItem('usersdatatoken', data.token);
          localStorage.setItem('users', JSON.stringify(data.user));
          // navigate('/'); // Use navigate to navigate to '/dash'
          window.location.href = '/'
          setInpval({ email: '', password: '' });
        } else {
          toast.error(data.message, { position: 'top-center' });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again later.', {
          position: 'top-center',
        });
      }
    }
  };
  
  return (
    <Container component="main" maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="form-container" style={{ border: '2px solid #333', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <img src={logologin} alt="Login Logo" />
        {/* <Typography component="h1" variant="h5">
          Welcome Back, Log In
        </Typography> */}
        {/* <Typography component="p" variant="body2">
          Hi, we are glad you are back. Please login.
        </Typography> */}
        <form>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={inpval.email}
              onChange={setVal}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={passShow ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={inpval.password}
              onChange={setVal}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPassShow(!passShow)}
                      edge="end"
                    >
                      {passShow ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={loginuser}
          >
            Log In
          </Button>
          {/* <Typography variant="body2">
            Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
          </Typography> */}
        </form>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default Login;