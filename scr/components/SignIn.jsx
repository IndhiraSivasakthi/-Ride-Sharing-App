import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDriver } from './DriverContext'; // Import useDriver from DriverContext

import './Signin.css'; // Import the CSS file

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useDriver(); // Use signIn function from DriverContext

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/signin", {
        username,
        password,
      });

      if (response.data) {
        alert("Sign in successful!");
        signIn(username); // Set the signed-in driver
        navigate("/driver"); // Redirect to driver dashboard or homepage
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Sign In</h2>
        <h3 className="login-title">Join Us Again, Driver!</h3>

        {error && <p className="login-error">{error}</p>}
        <form className="login-form" onSubmit={handleSignIn}>
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
          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
