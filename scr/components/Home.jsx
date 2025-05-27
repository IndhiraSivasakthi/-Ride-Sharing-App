import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UserContext';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div>
            <div className="top-bar">
                <div className="app-name">RIDE SHARING APPLICATION</div>
                <div className="menu-right">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                                       {user && <span className="welcome-message">Welcome, {user.username}!</span>}
                </div>
            </div>

            <div className="container">
                <div className="section fade-in">
                    <img src="img1.png" alt="" />
                    <div className="content">
                        <p>Register as a Driver Today and Enjoy...</p>
                        <p>Join our community of drivers and start earning today...</p>
                        <button onClick={() => navigate('/driver_register')}>JOIN</button>
                        <button onClick={() => navigate('/Sign_in')}>SIGN IN</button>

                    </div>
                </div>

                <div className="section fade-in">
                    <img src="img2.png" alt="" />
                    <div className="content">
                        <p>Book Your Ride, Your Way!</p>
                        <p>Drive when you want, make what you need..</p>
                        <button onClick={() => navigate('/login')}>START JOURNEY</button>
                    </div>
                </div>

                <div className="section fade-in">
                    <img src="img3.png" alt="" />
                    <div className="content">
                        <p>Make money by renting out your car..</p>
                        <p>Connect with thousands of drivers and earn more per week..</p>
                        <button onClick={() => navigate('/sign_in')}>GET STARTED</button>
                    </div>
                </div>

                <div className="section fade-in">
                    <img src="img4.png" alt="" />
                    <div className="content">
                        <p>Share Your Experience, Shape Our Service...</p>
                        <button onClick={() => navigate('/feedback_form')}>GIVE FEEDBACK</button>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-info">
                        <p>Contact Us:</p>
                        <p>Email: contact@example.com</p>
                        <p>Phone: +1234567890</p>
                    </div>

                    <div className="footer-info">
                        <p>Follow Us:</p>
                        <p>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        </p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Ride Sharing Application. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
