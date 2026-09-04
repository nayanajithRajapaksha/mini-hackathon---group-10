import { Link } from 'react-router-dom';
import '../styles/home.css';

/* Home page with hero section, feature cards, and disclaimer */
function HomePage() {
  return (
    <div className="home-page">

      {/* Hero section */}
      <section className="hero" aria-label="Introduction">
        <h1 className="hero-title">ParkingPulse LK</h1>
        <p className="hero-tagline">
          Check spaces. Share updates. Park with less searching.
        </p>

        <div className="hero-description">
          <p>
            Drivers in busy Kandy city-centre areas waste valuable time and fuel
            circling streets in search of available parking. During peak hours,
            finding a free spot can take longer than the trip itself.
          </p>
          <p>
            ParkingPulse LK helps by bringing together community-reported
            availability updates and historical pattern estimates, so you can
            make informed parking decisions before you arrive.
          </p>
        </div>

        {/* Call-to-action buttons */}
        <div className="hero-actions">
          <Link to="/parking" className="btn btn-primary">
            Check Parking
          </Link>
          <Link to="/predict" className="btn btn-secondary">
            Predict Availability
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="features" aria-label="Key features">
        <h2 className="features-heading">What You Can Do</h2>

        <div className="features-grid">
          <article className="feature-card">
            <span className="feature-icon" aria-hidden="true">🅿️</span>
            <h3>Check Parking Spaces</h3>
            <p>
              View the latest community-reported availability for parking areas
              in Kandy city centre.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-icon" aria-hidden="true">📢</span>
            <h3>Share Availability</h3>
            <p>
              Help fellow drivers by reporting whether a parking area is full,
              has a few spots, or is available.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-icon" aria-hidden="true">📊</span>
            <h3>Predict Busy Times</h3>
            <p>
              See simple historical pattern estimates to plan your trip at less
              congested times.
            </p>
          </article>
        </div>
      </section>

      {/* Disclaimer notice */}
      <section className="disclaimer" aria-label="Important notice">
        <p>
          <strong>Notice:</strong> This is a student prototype built for the
          SE3090 Mini Hackathon. Information shown is based on demonstration data
          and community-reported updates. Parking spaces are not reserved or
          guaranteed. Always confirm availability on arrival.
        </p>
      </section>
    </div>
  );
}

export default HomePage;
