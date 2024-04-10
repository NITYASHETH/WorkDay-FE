// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound'; // Import the NotFound component
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/register';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import TaskForm from './pages/task/Taskform';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import Logout from './pages/logout/Logout';
import DataTable from './Datatable'; // Import the DataTable component
import UserDisplay from './UserDisplay'; // Import the UserDisplay component

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = localStorage.getItem('usersdatatoken');
  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/hrdashboard" element={<Register />} />
              <Route path="/users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="/products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={productInputs} title="Add New Product" />}
                />
              </Route>
              <Route path="/Taskform" element={<TaskForm />} />
              <Route path="/UserDetails" element={<UserDisplay />} />
              <Route path="/logout" element={<Logout />} />
              <Route exact path="/" element={<DataTable />} /> {/* Route for DataTable component */}
              <Route exact path="/users/:id" component={UserDisplay} /> {/* Route for UserDisplay component */}
            </>
          )}
          <Route path="*" element={<NotFound />} /> {/* This will handle all other routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
