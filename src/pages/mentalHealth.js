import React from 'react';
import './service.css';
import { Link } from 'react-router-dom';

export default function MentalHealth() {
    return (
        <section className="service-section">
            <div className="service-header">
                <h1>Physical Wellness</h1>
                <p>
                    Connecting mind and body through physical activity and relaxation.
                    Discover tools to enhance your physical well-being and reduce stress.
                </p>
            </div>

            <div className="service-content">
                <div className="service-card">
                    <h3>🧘 Yoga & Movement</h3>
                    <p>
                        Yoga mats, blocks, and straps to support your practice and promote physical flexibility and mental calm.
                    </p>
                </div>

                <div className="service-card">
                    <h3>💆 Stress Relief Tools</h3>
                    <p>
                        Fidget toys, stress balls, and hand exercisers to release tension and improve focus through physical engagement.
                    </p>
                </div>

                <div className="service-card">
                    <h3>😴 Sleep & Relaxation</h3>
                    <p>
                        Weighted blankets, sleep masks, and ergonomic pillows to ensure restful sleep and physical recovery.
                    </p>
                </div>
            </div>

            <div className="cta-section">
                <Link to="/product" className="service-btn">Explore Wellness Collection</Link>
            </div>
        </section>
    );
}
