import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    const navigate = useNavigate(); // Create navigate function
    const [rideId, setRideId] = useState(new URLSearchParams(window.location.search).get('rideId'));
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [amountError, setAmountError] = useState('');

    const handlePayment = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        setAmountError('');

        // Basic validation
        if (isNaN(amount) || amount <= 0) {
            setAmountError('Please enter a valid amount.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/processpayment', {
                rideId,
                amount,
                paymentMethod
            });

            if (response.data.success) {
                setSuccess('Payment processed successfully!');
                // Redirect to another page after successful payment
                setTimeout(() => {
                    navigate('/user'); // Redirect to a success page
                }, 1000); // Optional: Add a slight delay to show success message
            } else {
                setError('Failed to process payment. Please try again.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setError('An error occurred while processing the payment. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-container">
                <h2 className="payment-title">Payment</h2>
                
                <form onSubmit={handlePayment} className="payment-form">
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className="payment-input"
                        />
                        {amountError && <p className="payment-error">{amountError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="paymentMethod">Payment Method:</label>
                        <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                            className="payment-select"
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            {/* Add more payment methods if needed */}
                        </select>
                    </div>

                    <button type="submit" className="payments-button" disabled={loading}>
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>

                {error && <p className="payment-error">{error}</p>}
                {success && <p className="payment-success">{success}</p>}
            </div>
        </div>
    );
};

export default Payment;
