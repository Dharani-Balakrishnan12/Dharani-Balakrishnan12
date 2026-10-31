import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login({ setCartItms, cartItems }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                // Removing username from login check, we just need email & password
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
                const response = await fetch(`${apiUrl}/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('userEmail', email);
                    
                    const savedCart = localStorage.getItem(`cart_${email}`);
                    const parsedSavedCart = savedCart ? JSON.parse(savedCart) : [];

                    if (cartItems && cartItems.length > 0) {
                        const mergedCart = [...parsedSavedCart];
                        cartItems.forEach(guestItem => {
                            const existingItemIndex = mergedCart.findIndex(i => i.products._id === guestItem.products._id);
                            if (existingItemIndex > -1) {
                                mergedCart[existingItemIndex].qty += guestItem.qty;
                            } else {
                                mergedCart.push(guestItem);
                            }
                        });
                        setCartItms(mergedCart);
                    } else {
                        setCartItms(parsedSavedCart);
                    }

                    toast.success("Login Successful");
                    navigate('/homepage');
                } else {
                    toast.error(data.message || "Invalid credentials");
                }
            } catch (error) {
                toast.error("An error occurred during login.");
                console.error("Login error:", error);
            }
        } else {
            toast.error("Please fill in all fields");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back!</h2>
                <p>Please login to your account</p>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}
