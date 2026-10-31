import "./about.css";

export default function About() {
  return (
    <section className="about-section">
      {/* HEADER */}
      <div className="about-header">
        <h1>Who We Are</h1>
        <p>
          Your trusted destination for quality stationery and books. We believe that the right tools can
          inspire creativity, learning, and productivity.
        </p>
      </div>

      {/* CARDS */}
      <div className="about-card-grid">
        <div className="about-card">
          <h3>📚 Our Mission</h3>
          <p>
            To provide high-quality stationery and books that support students,
            professionals, teachers, and creative minds.
          </p>
        </div>

        <div className="about-card">
          <h3>✏️ What We Offer</h3>
          <p>
            School & college notebooks, premium pens, art supplies, office
            stationery, and academic & general books.
          </p>
        </div>

        <div className="about-card">
          <h3>⭐ Why Choose Us</h3>
          <p>
            Carefully curated quality products, affordable pricing, and reliable
            customer support for all users.
          </p>
        </div>

        <div className="about-card">
          <h3>🌱 Our Promise</h3>
          <p>
            We continuously improve our range and services to deliver a smooth,
            trustworthy, and satisfying shopping experience.
          </p>
        </div>
      </div>

      {/* HIGHLIGHT BANNER */}
      <div className="highlight-card">
        <div className="highlight-content">
          <h3>Why Choose INNILAI</h3>
          <h5>
            From sketching your ideas to planning your goals, our stationery helps turn thoughts into action.
            Every pen, page, and book is chosen to make your work smoother and more enjoyable.
          </h5>
          
          <div className="feature-grid">
            <ul>
              <li><span>✔</span> High-quality products at affordable prices</li>
              <li><span>✔</span> Wide range of trusted brands</li>
              <li><span>✔</span> Neatly packed & safely delivered</li>
            </ul>
            <ul>
              <li><span>✔</span> Perfect for students, offices, and creatives</li>
              <li><span>✔</span> Friendly support & easy ordering</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
