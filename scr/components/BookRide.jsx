import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './UserContext'; // Import useAuth for authentication context
import './BookRide.css';

const BookRide = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Get the logged-in user
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [vehicleType, setVehicleType] = useState('Standard');
    const [selectedRoute, setSelectedRoute] = useState('');
    const [fareEstimate, setFareEstimate] = useState(null);
    const [farePerKm, setFarePerKm] = useState(null);
    const [distance, setDistance] = useState(null);
    const [rideDate, setRideDate] = useState(''); // Add state for ride date
    const [error, setError] = useState('');

    const routes = [
        { label: 'Chennai to Madurai', distance: 460 },
        { label: 'Chennai to Coimbatore', distance: 510 },
        { label: 'Chennai to Trichy', distance: 330 },
        { label: 'Chennai to Pondicherry', distance: 160 },
        { label: 'Chennai to Salem', distance: 340 },
        { label: 'Chennai to Tirunelveli', distance: 625 },
        { label: 'Chennai to Vellore', distance: 140 },
        { label: 'Chennai to Kanyakumari', distance: 700 },
        { label: 'Chennai to Tuticorin', distance: 590 },
        { label: 'Chennai to Erode', distance: 400 },
        { label: 'Chennai to Nagercoil', distance: 690 },
        { label: 'Chennai to Thanjavur', distance: 350 },
        { label: 'Chennai to Karur', distance: 400 },
        { label: 'Chennai to Tiruvannamalai', distance: 195 },
        { label: 'Chennai to Dindigul', distance: 420 },
        { label: 'Chennai to Kanchipuram', distance: 75 },
        { label: 'Chennai to Villupuram', distance: 160 },
        { label: 'Chennai to Cuddalore', distance: 180 },
        { label: 'Chennai to Chidambaram', distance: 215 },
        { label: 'Chennai to Nagapattinam', distance: 320 },
        { label: 'Chennai to Perambalur', distance: 280 },
        { label: 'Chennai to Namakkal', distance: 380 },
    ];

    const handleBookRide = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/bookride', {
                pickupLocation,
                dropoffLocation,
                vehicleType,
                fare: fareEstimate,
                rideDate // Include ride date in the request payload
            }, {
                params: { username: user.username } // Include the logged-in user's username as a query parameter
            });

            if (response.status === 200) {
                alert('Ride booked successfully!');
                navigate('/current_rides');
            } else {
                setError('Failed to book the ride. Please try again.');
            }
        } catch (error) {
            console.error('Error booking ride:', error);
            if (error.response && error.response.status === 404) {
                setError('User not found. Please try again.');
            } else if (error.response && error.response.status === 500) {
                setError('Internal Server Error. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleGetFareEstimate = async () => {
        try {
            const selectedRouteDetails = routes.find(route => route.label === selectedRoute);
            const distance = selectedRouteDetails ? selectedRouteDetails.distance : 0;

            const response = await axios.post('http://localhost:8080/api/fareestimate', {
                pickupLocation,
                dropoffLocation,
                vehicleType,
                distance
            });

            if (response.data) {
                setFareEstimate(response.data.fareEstimate); // Assuming response.data.fareEstimate is the fare estimate
                setFarePerKm(response.data.farePerKm); // Assuming response.data.farePerKm is the fare per km
                setDistance(response.data.distance); // Assuming response.data.distance is the distance
            } else {
                setError('Failed to get fare estimate. Please try again.');
            }
        } catch (error) {
            console.error('Error getting fare estimate:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="book-ride">
            <div className="book-ride__container">
                <h2 className="book-ride__title">Book a Ride</h2>

                {error && <p className="book-ride__error">{error}</p>}
                <form className="book-ride__form" onSubmit={handleBookRide}>
                    <div className="book-ride__form-group">
                        <label htmlFor="pickupLocation">Pickup Location:</label>
                        <input
                            type="text"
                            id="pickupLocation"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="book-ride__form-group">
                        <label htmlFor="dropoffLocation">Drop-off Location:</label>
                        <input
                            type="text"
                            id="dropoffLocation"
                            value={dropoffLocation}
                            onChange={(e) => setDropoffLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="book-ride__form-group">
                        <label htmlFor="vehicleType">Vehicle Type:</label>
                        <select
                            id="vehicleType"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                        >
                            <option value="Standard">Standard</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>
                    <div className="book-ride__form-group">
                        <label htmlFor="selectedRoute">Select Route:</label>
                        <select
                            id="selectedRoute"
                            value={selectedRoute}
                            onChange={(e) => setSelectedRoute(e.target.value)}
                            required
                        >
                            {routes.map((route, index) => (
                                <option key={index} value={route.label}>
                                    {route.label} - {route.distance} km
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="book-ride__form-group">
                        <label htmlFor="rideDate">Ride Date:</label>
                        <input
                            type="date"
                            id="rideDate"
                            value={rideDate}
                            onChange={(e) => setRideDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="button" className="book-ride__fare-estimate-button" onClick={handleGetFareEstimate}>Get Fare Estimate</button>
                    {fareEstimate !== null && (
                        <div className="book-ride__fare-details">
                            <p>Estimated Fare: Rs {fareEstimate}</p>
                            <p>{vehicleType} fare per km: Rs {farePerKm}</p>
                            <p>Distance: {distance} km</p>
                        </div>
                    )}
                    <button type="submit" className="book-ride__submit-button">Book Ride</button>
                </form>
            </div>
        </div>
    );
};

export default BookRide;
