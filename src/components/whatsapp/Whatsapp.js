import React from 'react';
import Balu from '../../components/image/watsapp.png'; 
import './Whatsapp.css'; // Import CSS file

const Whatsapp = () => {
  const handleClick = () => {
    window.open('https://wa.me/919512197078', '_blank'); // Open link in a new tab
  };

  return (
    <div className="container">
      {/* Display your image icon */}
      <a href="https://wa.me/919512197078" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        <img src={Balu} alt="WhatsApp Icon" className="whatsapp-icon" />
      </a>

      {/* Add your WhatsApp component content here */}
      {/* <h1>Welcome to WhatsApp</h1>
      <p>This is a simple WhatsApp component.</p> */}
    </div>
  );
}

export default Whatsapp;
