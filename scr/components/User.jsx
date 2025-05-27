import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UserContext';
import './User.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();  // Call logout method to record logout time
        navigate('/login');  // Redirect to login page or any other page
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
            <div className="user-top-bar">
                <div className="user-app-name">USER DASHBOARD</div>
                <div className="user-menu-right">
                    <button onClick={handleLogout}>Logout</button>
                    {user && <span className="user-welcome-message">Welcome, {user.username}!</span>}
                </div>
            </div>

            <div className="user-container">
                <div className="user-section fade-in">
                    <div className="user-content">
                        <img src="/profile.jpeg" alt="Profile Management" style={imageStyle} />
                        <h2>Profile Management</h2>
                        <p>View and update personal information, and change password.</p>
                        <button onClick={() => navigate('/profile_management')}>Manage Profile</button>
                    </div>
                </div>

                <div className="user-section fade-in">
                    <div className="user-content">
                        <img src="/book_ride.jpeg" alt="Book a Ride" style={imageStyle} />
                        <h2>Book a Ride</h2>
                        <p>Enter pickup and drop-off locations, choose vehicle type, view estimated fare and time, and book the ride.</p>
                        <button onClick={() => navigate('/book_ride')}>Book a Ride</button>
                    </div>
                </div>

                <div className="user-section fade-in">
                    <div className="user-content">
                        <img src="/current_ride.jpeg" alt="Current Rides" style={imageStyle} />
                        <h2>Current Rides</h2>
                        <p>View details of ongoing rides, track ride status and progress, and option to cancel the ride.</p>
                        <button onClick={() => navigate('/current_rides')}>View Current Rides</button>
                    </div>
                </div>

                <div className="user-section fade-in">
                    <div className="user-content">
                        <img src="/payments.jpeg" alt="Payment Methods" style={imageStyle} />
                        <h2>Payment Methods</h2>
                        <p>Manage saved payment methods (credit/debit cards, PayPal, etc.) and view payment history and transaction details.</p>
                        <button onClick={() => navigate('/payment')}>Manage Payment Methods</button>
                    </div>
                </div>

                <div className="user-section fade-in">
                    <div className="user-content">
                        <img src="/feedback.jpeg" alt="Feedback and Ratings" style={imageStyle} />
                        <h2>Feedback and Ratings</h2>
                        <p>Give feedback and rate drivers, and view ratings and feedback given.</p>
                        <button onClick={() => navigate('/feedback_form')}>Give Feedback</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
