import React from 'react';
import { Link } from 'react-router-dom';
import './service.css'; // Reusing service css for consistency or create new

export default function OrderSuccess() {
    return (
        <div className="container text-center mt-5" style={{ minHeight: '60vh', padding: '50px' }}>
            <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '20px', borderRadius: '10px', display: 'inline-block', marginBottom: '20px' }}>
                <i className="fa fa-check-circle" style={{ fontSize: '50px' }}></i>
            </div>
            <h2>Your Order has been Placed Successfully!</h2>
            <p style={{ fontSize: '18px', color: '#555' }}>Thank you for shopping with us.</p>
            <Link to="/product" className="btn btn-primary mt-3">Continue Shopping</Link>
        </div>
    );
}
