import "./stationarycontent.css";

export default function StationeryContent() {
  return (
    <section 
      className="stationery-section" 
      style={{ backgroundImage: `url('https://images.pexels.com/photos/9743014/pexels-photo-9743014.jpeg')` }}
    >
      <div className="stationery-overlay"></div>
      <div className="stationery-container">
        <div className="stationery-text-content">
          <h1>
            Everything You Need for <br />
            Study & Practice
          </h1>
          <p>
            This website is dedicated <strong>only to books</strong>. We offer
            carefully selected learning and practice books for students in
            Tamil and English.
          </p>
        </div>
      </div>
    </section>
  );
}
