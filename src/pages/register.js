import React, { useState } from 'react';
import './login.css'; // Reusing login styles
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (username && email && password) {
            try {
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
                const response = await fetch(`${apiUrl}/user/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success("Registration Successful! You can now log in.");
                    navigate('/login');
                } else {
                    toast.error(data.message || "Registration failed");
                }
            } catch (error) {
                toast.error("An error occurred during registration.");
                console.error("Registration error:", error);
            }
        } else {
            toast.error("Please fill in all fields");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Create an Account</h2>
                <p>Register to get started</p>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            placeholder="Enter your user name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                    <button type="submit" className="login-btn">Register</button>
                </form>
                <div className="login-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}
