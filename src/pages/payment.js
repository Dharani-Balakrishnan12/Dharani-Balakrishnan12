import React, { useState } from 'react';
import './payment.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Payment({ cartItems, setCartItms }) {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();

    const [shippingName, setShippingName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const totalAmount = cartItems.reduce((acc, item) => (acc + item.products.price * item.qty), 0);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!shippingName || !shippingAddress || !city || !postalCode || !country || !cardName || !cardNumber || !expiry || !cvv) {
            toast.error("Please fill in all details (Shipping & Payment)");
            return;
        }

        const orderData = {
            cartItems,
            shippingInfo: {
                name: shippingName,
                address: shippingAddress,
                city,
                postalCode,
                country
            }
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
            const response = await fetch(apiUrl + '/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setCartItms([]);
                const email = localStorage.getItem('userEmail');
                if (email) {
                    localStorage.setItem(`cart_${email}`, JSON.stringify([]));
                }
                toast.success("Payment Successful! Order Placed.");
                navigate('/order-success');
            } else {
                toast.error(data.message || "Order Failed! Please try again.");
            }
        } catch (error) {
            console.error("Order payment error:", error);
            toast.error("Order Failed! Please try again.");
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h2>Secure Checkout</h2>
                <div className="order-summary">
                    <h4>Order Summary</h4>
                    <p>Total Items: <span>{cartItems.reduce((acc, item) => (acc + item.qty), 0)}</span></p>
                    <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
                </div>
                <form className="payment-form" onSubmit={handlePayment}>

                    <h4 style={{ color: '#2c2c6c', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Shipping Information</h4>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={shippingName}
                            onChange={(e) => setShippingName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label>City</label>
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Postal Code</label>
                            <input
                                type="text"
                                placeholder="Zip Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    <h4 style={{ color: '#2c2c6c', margin: '20px 0 15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Payment Details</h4>
                    <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                            type="text"
                            placeholder="Name on Card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            maxLength="16"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Expiry Date</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                maxLength="5"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>CVV</label>
                            <input
                                type="password"
                                placeholder="123"
                                maxLength="3"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="payment-btn">Pay ${totalAmount.toFixed(2)}</button>
                </form>
            </div>
        </div>
    );
}
