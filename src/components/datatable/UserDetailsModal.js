import React, { useState } from "react";
import "./userdetailsmodal.css"; // Import CSS for modal styling

const UserDetailsModal = ({ open, handleCloseModal, user }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>User Details</h2>
            <p>Name: {user.fname}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Mobile No: {user.mobileno}</p>
            <div className="image-section">
              {selectedImage && (
                <div className="selected-image">
                  <div className="circular-image">
                    <img src={selectedImage} alt="Selected" />
                  </div>
                  <button onClick={handleRemoveImage}>Remove Image</button>
                </div>
              )}
              {!selectedImage && user.image && (
                <div className="selected-image">
                  <div className="circular-image">
                    <img src={user.image} alt="User" />
                  </div>
                  <button onClick={handleRemoveImage}>Remove Image</button>
                </div>
              )}
              {!selectedImage && !user.image && (
                <div className="upload-section">
                  <input type="file" onChange={handleImageChange} />
                </div>
              )}
            </div>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetailsModal;
