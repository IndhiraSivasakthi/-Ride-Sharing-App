import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = {
      fullName,
      email,
      phoneNumber,
      username,
      password,
    };

    try {
      console.log('Attempting to register user:', newUser);
      const response = await axios.post("http://localhost:8080/api/users/register", newUser);
      console.log('Registration response:', response);
      alert('Registration form submitted!');
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      navigate("/login");
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Sign Up and Start Your Journey!</h2>

        {error && <p className="register-error">{error}</p>}
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
          <div className="form-group form-button">
            <button type="submit" className="register-button">Register</button>
          </div>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login"><b>Login here</b></Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
