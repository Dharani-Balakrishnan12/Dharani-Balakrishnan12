import React from 'react';
import './service.css';
import { Link } from 'react-router-dom';

export default function Education() {
    return (
        <section className="service-section">
            <div className="service-header">
                <h1>Teaching Resources</h1>
                <p>
                    Equipping educators with the tools they need to inspire and lead.
                    From lesson planning to classroom management, we support your teaching journey.
                </p>
            </div>

            <div className="service-content">
                <div className="service-card">
                    <h3>📖 Lesson Planning</h3>
                    <p>
                        Comprehensive lesson planners, record books, and scheduling tools to keep your curriculum on track.
                    </p>
                </div>

                <div className="service-card">
                    <h3>🖊️ Classroom Supplies</h3>
                    <p>
                        Whiteboard markers, chalk, dusters, and organization solutions for an efficient classroom environment.
                    </p>
                </div>

                <div className="service-card">
                    <h3>🎨 Teaching Aids</h3>
                    <p>
                        Visual aids, charts, educational games, and reward stickers to engage students and enhance learning.
                    </p>
                </div>
            </div>

            <div className="team-section">
                <h2>Our Expert Team</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img src="/images/products/o.jpg" alt="Sarah Jenkins" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                        <h4>Sarah Jenkins</h4>
                        <p>Curriculum Specialist</p>
                    </div>
                    <div className="team-member">
                        <img src="/images/products/tamil dictionary.jpg" alt="David Chen" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                        <h4>David Chen</h4>
                        <p>Educational Psychologist</p>
                    </div>
                    <div className="team-member">
                        <img src="/images/products/Drawing book.jpg" alt="Maria Rodriguez" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                        <h4>Maria Rodriguez</h4>
                        <p>Classroom Coordinator</p>
                    </div>
                </div>
            </div>

            <div className="testimonial-section">
                <h2>What Educators Say</h2>
                <div className="testimonial-grid">
                    <div className="testimonial-card">
                        <p>"The lesson planning tools have transformed how I organize my semester. Incredibly intuitive and helpful!"</p>
                        <div className="testimonial-author">
                            <div>
                                <h5>Emily Thompson</h5>
                                <span>High School Teacher</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p>"My students love the interactive teaching aids. Engagement has gone up significantly since using these resources."</p>
                        <div className="testimonial-author">
                            <div>
                                <h5>James Wilson</h5>
                                <span>Primary School Teacher</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <Link to="/product" className="service-btn">Shop Education Products</Link>
            </div>
        </section>
    );
}
