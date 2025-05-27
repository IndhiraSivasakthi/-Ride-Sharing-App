import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RideRequests.css';

const RideRequests = () => {
    const [rideRequests, setRideRequests] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRideRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/allrides');
                setRideRequests(response.data);
            } catch (error) {
                setError('Failed to fetch ride requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRideRequests();
    }, []);

    const handleAcceptRequest = async (rideId) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`http://localhost:8080/api/riderequests/accept`, { rideId });
            if (response.data.success) {
                alert('Ride request accepted!');
                setRideRequests(rideRequests.filter(request => request.id !== rideId));
            } else {
                alert('Failed to accept the ride request.');
            }
        } catch (error) {
            setError('Failed to accept the ride request.');
        } finally {
            setLoading(false);
        }
    };

    const handleRejectRequest = async (rideId) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`http://localhost:8080/api/riderequests/reject`, { rideId });
            if (response.data.success) {
                alert('Ride request rejected!');
                setRideRequests(rideRequests.filter(request => request.id !== rideId));
            } else {
                alert('Failed to reject the ride request.');
            }
        } catch (error) {
            setError('Failed to reject the ride request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ride-requests">
            <h2>Available Ride Requests</h2>

            {loading ? (
                <p>Loading...</p>
            ) : rideRequests.length === 0 ? (
                <p>No ride requests available.</p>
            ) : (
                <table className="requests-table">
                    <thead>
                        <tr>
                            <th>Ride ID</th>
                            <th>Pickup Location</th>
                            <th>Drop-off Location</th>
                            <th>Fare</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rideRequests.map(request => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.pickupLocation}</td>
                                <td>{request.dropoffLocation}</td>
                                <td>{request.fare}</td>
                                <td>
                                    <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                                    <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default RideRequests;
