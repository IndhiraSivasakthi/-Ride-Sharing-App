import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Saving.css'; // Ensure this CSS file is created for styling

const EarningsSummary = ({ driverId }) => {
    const [earnings, setEarnings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/earnings/calculate/${driverId}`);
                setEarnings(response.data);
            } catch (err) {
                setError('Failed to fetch earnings.');
            } finally {
                setLoading(false);
            }
        };

        fetchEarnings();
    }, [driverId]);

    return (
        <div className="earnings-container">
            <h2>Earnings Summary</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div>
                    <h3>Total Earnings: ${earnings.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
};

export default EarningsSummary;
