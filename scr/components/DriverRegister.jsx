import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './DriverRegister.css'; // Import the CSS file

const DriverRegister = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  // Driver Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [driversLicense, setDriversLicense] = useState("");

  // Vehicle Details
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [insuranceInfo, setInsuranceInfo] = useState("");
  const [drivingExperience, setDrivingExperience] = useState("");

  const [error, setError] = useState("");

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handlePreviousPage = () => {
    setCurrentPage(1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (currentPage === 1) {
      // Validate driver details page
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      // Proceed to next page
      handleNextPage();
    } else {
      // Submit registration
      const newUser = new FormData();
      newUser.append("fullName", fullName);
      newUser.append("email", email);
      newUser.append("phoneNumber", phoneNumber);
      newUser.append("profilePicture", profilePicture);
      newUser.append("username", username);
      newUser.append("password", password);
      newUser.append("dateOfBirth", dateOfBirth);
      newUser.append("gender", gender);
      newUser.append("driversLicense", driversLicense);
      newUser.append("vehicleMake", vehicleMake);
      newUser.append("vehicleModel", vehicleModel);
      newUser.append("vehicleYear", vehicleYear);
      newUser.append("vehicleColor", vehicleColor);
      newUser.append("licensePlate", licensePlate);
      newUser.append("insuranceInfo", insuranceInfo);
      newUser.append("drivingExperience", drivingExperience);

      try {
        await axios.post('http://localhost:8080/api/register', newUser, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Registration successful!');
        // Reset fields after successful registration
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setProfilePicture(null);
        setProfilePicturePreview(null);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setDateOfBirth('');
        setGender('');
        setDriversLicense('');
        setVehicleMake('');
        setVehicleModel('');
        setVehicleYear('');
        setVehicleColor('');
        setLicensePlate('');
        setInsuranceInfo('');
        setDrivingExperience('');
        navigate("/login");
      } catch (error) {
        console.error('Error registering user:', error);
        setError('Failed to register. Please try again.');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfilePicturePreview(URL.createObjectURL(file));
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Sign Up and Start Your Journey!</h2>

        {error && <p className="register-error">{error}</p>}
        {currentPage === 1 && (
          <form className="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Profile Picture:</label>
              <input
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>
            {profilePicturePreview && (
              <div className="form-group">
                <img
                  src={profilePicturePreview}
                  alt="Profile Preview"
                  className="profile-picture-preview"
                />
              </div>
            )}
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Driver's License Number:</label>
              <input
                type="text"
                value={driversLicense}
                onChange={(e) => setDriversLicense(e.target.value)}
              />
            </div>
            <div className="form-group form-button">
              <button type="button" onClick={handleNextPage} className="register-button">Next</button>
            </div>
          </form>
        )}
        {currentPage === 2 && (
          <form className="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Vehicle Information:</label>
              <div className="vehicle-info-fields">
                <input
                  type="text"
                  placeholder="Make"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Model"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="License Plate"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Insurance Information:</label>
              <input
                type="text"
                value={insuranceInfo}
                onChange={(e) => setInsuranceInfo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Driving Experience (Years):</label>
              <input
                type="number"
                value={drivingExperience}
                onChange={(e) => setDrivingExperience(e.target.value)}
              />
            </div>
            <div className="form-group form-button">
              <button type="button" onClick={handlePreviousPage} className="register-button previous-button">Previous</button>
              <br/>
              <br/>
              <button type="submit" className="register-button">Register</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DriverRegister;
