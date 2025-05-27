import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CurrentRides.css';

const CurrentRides = () => {
    const [currentRides, setCurrentRides] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchUsername, setSearchUsername] = useState('');
    const [searchedUsername, setSearchedUsername] = useState('');

    useEffect(() => {
        const fetchCurrentRides = async (username) => {
            try {
                const response = await axios.get('http://localhost:8080/api/currentrides', {
                    params: { username },
                });
                console.log('Fetched rides:', response.data);
                setCurrentRides(response.data);
            } catch (error) {
                console.error('Error fetching current rides:', error);
                setError('An error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (searchedUsername) {
            fetchCurrentRides(searchedUsername);
        }
    }, [searchedUsername]);

    const handleSearch = (event) => {
        event.preventDefault();
        setLoading(true);
        setSearchedUsername(searchUsername.trim());
    };

    const cancelRide = async (rideId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/cancelride', { rideId });
            if (response.data.success) {
                alert('Ride cancelled successfully!');
                setCurrentRides(currentRides.filter(ride => ride.id !== rideId));
            } else {
                alert('Failed to cancel the ride.');
            }
        } catch (error) {
            console.error('Error cancelling ride:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const redirectToPayment = (rideId) => {
        window.location.href = `/payment?rideId=${rideId}`;
    };

    return (
        <div className="current-rides-page">
            <div className="current-rides-container">
                <h2 className="current-rides-title">Current Rides</h2>

                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={searchUsername}
                        onChange={(e) => setSearchUsername(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                {error && <p className="current-rides-error">{error}</p>}
                {loading ? (
                    <p className="current-rides-message">Loading...</p>
                ) : currentRides.length === 0 ? (
                    <p className="current-rides-message">No ongoing rides.</p>
                ) : (
                    <table className="current-rides-table">
                        <thead>
                            <tr>
                                <th>Ride ID</th>
                                <th>Pickup Location</th>
                                <th>Drop-off Location</th>
                                <th>Vehicle Type</th>
                                <th>Fare</th>
                                <th>Status</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRides.map((ride) => (
                                <tr key={ride.id}>
                                    <td>{ride.id}</td>
                                    <td>{ride.pickupLocation}</td>
                                    <td>{ride.dropoffLocation}</td>
                                    <td>{ride.vehicleType}</td>
                                    <td>{ride.fare}</td>
                                    <td>{ride.status}</td>
                                    <td>{ride.username}</td>
                                    <td>
                                        <button className="cancel-button" onClick={() => cancelRide(ride.id)}>Cancel Ride</button>
                                        <button className="payment-button" onClick={() => redirectToPayment(ride.id)}>Payment</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CurrentRides;
