import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import john from '../../components/image/amitabh.png';
import mic from '../../components/image/vk.png';

const styles = {
  container: {
    fontFamily: 'Montserrat, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 60px)', // Adjust the minHeight to take content up
    margin: 0,
    padding: '20px',
  },
  cardContainer: {
    maxHeight: 'calc(100vh - 140px)', // Adjust the maxHeight based on the available space
    overflowY: 'auto', // Enable vertical scrolling if content overflows
    borderRadius: '10px',
    boxShadow: '0px 10px 20px -10px rgba(0,0,0,0.75)',
    color: 'black', // Change font color to black
    paddingTop: '30px',
    position: 'relative',
    textAlign: 'center',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Adjust justify-content property
    alignItems: 'center', // Align items in the center vertically
  },
  profileCard: {
    border: '1px solid #2D2747',
    borderRadius: '10px',
    padding: '20px', // Increase padding for bigger cards
    marginBottom: '40px', // Increase margin for bigger cards
    flex: '0 0 calc(30% - 40px)', // Adjust card width
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    background: '#F5F5F5', // Change card background color
    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)', // Add 3D effect
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 35%, white 50%)',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  fileInput: {
    display: 'none',
  },
};

const EmployeeList = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navbarRef = useRef(null);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    try {
      const cid = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).cid : '';
      const role = 'employee';

      const response = await axios.get(`http://localhost:3001/users?role=employee&role=manager&role=hr&cid=${cid}`);

      const data = response.data;
      if (data.status === 1) {
        setUserProfiles(data.userList);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const renderProfileImage = (userProfile) => {
    if (userProfile && userProfile.email === 'john@microsoft.com') {
      return <img style={styles.avatar} src={john} alt="John's Profile" />;
    } else if (userProfile && userProfile.email === 'hr@microsoft.com') {
      return <img style={styles.avatar} src={mic} alt="HR's Profile" />;
    } else if (userProfile) {
      return <img style={styles.avatar} src="https://randomuser.me/api/portraits/women/79.jpg" alt="Default Profile" />;
    } else {
      return null;
    }
  };

  const scrollToNavbar = () => {
    if (navbarRef.current) {
      cardContainerRef.current.scrollTop = navbarRef.current.offsetTop;
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar ref={navbarRef} />
        <div style={styles.container}>
          <div ref={cardContainerRef} style={styles.cardContainer}>
            {userProfiles.map((profile, index) => (
              <div key={index} style={styles.profileCard}>
                {renderProfileImage(profile)}
                <div>
                  <h3>Name: {profile.fname}</h3>
                  <p>Email: {profile.email}</p>
                  <p>mobileno: {profile.mobileno}</p>
                  <p>city: {profile.city}</p>
                  <p>state: {profile.state}</p>
                </div>
              </div>
            ))}
          </div>
          <input type="file" id="fileInput" style={styles.fileInput} onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
