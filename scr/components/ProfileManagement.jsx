import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './UserContext'; // Import useAuth for authentication context
import './ProfileManagement.css'; // Import the CSS file for ProfileManagement

const ProfileManagement = () => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
  });

  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${user.username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('There was an error fetching the user data!', error);
      }
    };

    if (user && user.username) {
      fetchUserData();
    }
  }, [user.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/users/update', userData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('There was an error updating the profile!', error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/users/change-password', {
        username: userData.username,
        newPassword
      });
      alert('Password changed successfully!');
    } catch (error) {
      console.error('There was an error changing the password!', error);
    }
  };

  return (
    <div className="profile-management">
      <div className="profile-management__container">
        <h2 className="profile-management__title">Manage Profile</h2>
        <form className="profile-management__form" onSubmit={handleSubmit}>
          <div className="profile-management__form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile-management__form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile-management__form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile-management__form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              disabled
            />
          </div>
          <button type="submit" className="profile-management__submit-button">Update Profile</button>
        </form>
        <form className="profile-management__form" onSubmit={handleChangePassword}>
          <div className="profile-management__form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="profile-management__password-button">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;
