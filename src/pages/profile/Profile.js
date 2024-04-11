import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import johnProfile from '../../components/image/amitabh.png';
import micP from '../../components/image/vk.png';

const styles = {
  container: {
    backgroundColor: 'white', // Changed background color to white
    fontFamily: 'Montserrat, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    margin: 0,
    padding: '20px', // Added padding for better alignment
  },
  cardContainer: {
    backgroundColor: '#231E39',
    borderRadius: '5px',
    boxShadow: '0px 10px 20px -10px rgba(0,0,0,0.75)',
    color: '#B3B8CD',
    paddingTop: '30px',
    position: 'relative',
    width: '350px',
    maxWidth: '400px', // Adjusted maxWidth to 400px
    textAlign: 'center',
  },
  roundImage: {
    border: '1px solid #03BFCB',
    borderRadius: '50%',
    padding: '7px',
    width: '150px', // Adjust image width
    height: '150px', // Adjust image height
  },
  primaryButton: {
    backgroundColor: '#03BFCB',
    border: '1px solid #03BFCB',
    borderRadius: '3px',
    color: '#231E39',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500,
    padding: '10px 25px',
    marginTop: '20px', // Added marginTop for spacing
  },
  ghostButton: {
    backgroundColor: 'transparent',
    color: '#02899C',
  },
  skillsContainer: {
    backgroundColor: '#1F1A36',
    textAlign: 'left',
    padding: '15px',
    marginTop: '30px',
  },
  skillsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  skillItem: {
    border: '1px solid #2D2747',
    borderRadius: '2px',
    display: 'inline-block',
    fontSize: '12px',
    margin: '0 7px 7px 0',
    padding: '7px',
  },
};

const ProfileCard = ({ imageUrl }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('usersdatatoken');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:3001/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data.status === 1) {
        setUserProfile(data.userProfile);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderProfileImage = () => {
    if (userProfile && userProfile.email === 'john@microsoft.com') {
      // If email is empty, render the provided image
      return <img style={styles.roundImage} src={johnProfile} alt="user" />;
    } else if (userProfile && userProfile.email === 'hr@microsoft.com') {
      // If email is empty, render the provided image
      return <img style={styles.roundImage} src={micP} alt="user" />;
    } else if (userProfile) {
      // Otherwise, render the default image
      return <img style={styles.roundImage} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />;
    } else {
      // Render nothing if userProfile is not yet loaded
      return null;
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div style={styles.container}>
          <div style={styles.cardContainer}>
            {renderProfileImage()}
            {userProfile && (
              <>
                <h3>Name: {userProfile.fname}</h3>
                <h6>Role: {userProfile.role}</h6>
                <p>Email: {userProfile.email}</p>
                {/* Additional fields */}
                <p>Mobile Number: {userProfile.mobileNumber}</p>
                <p>City: {userProfile.city}</p>
                <p>State: {userProfile.state}</p>
                {userProfile.skills && Array.isArray(userProfile.skills) && (
                  <div style={styles.skillsContainer}>
                    <h6>Skills</h6>
                    <ul style={styles.skillsList}>
                      {/* Render skills from userProfile */}
                      {userProfile.skills.map((skill, index) => (
                        <li key={index} style={styles.skillItem}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Update button */}
                <button style={styles.primaryButton}>Update</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
