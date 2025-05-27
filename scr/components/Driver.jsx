import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDriver } from './DriverContext'; // Import useDriver from DriverContext
import './Driver.css';

const DriverDashboard = () => {
    const navigate = useNavigate();
    const { driver, signOut } = useDriver(); // Use useDriver to access driver information

    const handleLogout = async () => {
        await signOut();  // Call signOut method to record logout time
        navigate('/sign_in');  // Redirect to login page or any other page
    };

    const imageStyle = {
        width: '200px', // Increase the width
        height: '150px', // Increase the height
        objectFit: 'cover', // Ensures the image covers the area without distortion
        borderRadius: '70%', // Makes the image circular
        marginBottom: '10px' // Adds some space between the image and the heading
    };

    return (
        <div>
            <div className="driver-top-bar">
                <div className="driver-app-name">DRIVER DASHBOARD</div>
                <div className="driver-menu-right">
                    <button onClick={handleLogout}>Logout</button>
                    {driver && <span className="driver-welcome-message">Welcome, {driver.username}!</span>}
                </div>
            </div>

            <div className="driver-section fade-in">
                <div className="driver-content">
                    <img src="/request.jpeg" alt="Ride Requests" style={imageStyle} />
                    <h2>Ride Requests</h2>
                    <p>List of available ride requests. Option to accept or reject ride requests. Real-time notifications for new ride requests.</p>
                    <button onClick={() => navigate('/ride_request')}>View Ride Requests</button>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
