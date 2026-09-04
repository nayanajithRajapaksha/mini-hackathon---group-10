import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getParkingAreas } from '../services/api.js';
import '../styles/home.css';

/* Home page with hero, dashboard summary, feature cards, and disclaimer */
function HomePage() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load parking areas when the page mounts
  const fetchAreas = () => {
    setLoading(true);
    setError(null);
    getParkingAreas()
      .then((data) => {
        setAreas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  // Calculate dashboard totals from the loaded data
  const totalAreas = areas.length;
  const totalCapacity = areas.reduce((sum, a) => sum + (a.totalSpaces || 0), 0);
  const totalAvailable = areas.reduce((sum, a) => sum + (a.availableSpaces || 0), 0);
  const fullAreas = areas.filter(
    (a) => a.status === 'Full' || a.availableSpaces === 0
  ).length;

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
          <Link to="/report" className="btn btn-secondary">
            Report Availability
          </Link>
        </div>
      </section>

      {/* Parking summary dashboard */}
      <section className="dashboard" aria-label="Parking summary">
        <h2 className="dashboard-heading">Parking Summary</h2>

        {loading && (
          <p className="dashboard-loading">Loading parking data...</p>
        )}

        {error && (
          <div className="dashboard-error" role="alert">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchAreas} type="button">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && totalAreas === 0 && (
          <p className="dashboard-empty">
            No parking areas found. Data may not be available yet.
          </p>
        )}

        {!loading && !error && totalAreas > 0 && (
          <>
            <div className="summary-grid">
              <div className="summary-card">
                <span className="summary-value">{totalAreas}</span>
                <span className="summary-label">Parking Areas</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{totalCapacity}</span>
                <span className="summary-label">Total Capacity</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{totalAvailable}</span>
                <span className="summary-label">Available Now</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{fullAreas}</span>
                <span className="summary-label">Full Areas</span>
              </div>
            </div>

            <div className="dashboard-action">
              <Link to="/parking" className="btn btn-primary">
                View All Parking Areas
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Feature cards */}
      <section className="features" aria-label="Key features">
        <h2 className="features-heading">What You Can Do</h2>

        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0e918c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                <path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path>
              </svg>
            </div>
            <h3>Check Parking Spaces</h3>
            <p>
              View the latest community-reported availability for parking areas
              in Kandy city centre.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f6a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <h3>Share Availability</h3>
            <p>
              Help fellow drivers by reporting whether a parking area is full,
              has a few spots, or is available.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#1a2e5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </div>
            <h3>Filter &amp; Sort</h3>
            <p>
              Instantly filter by availability status and sort by latest updates
              or highest number of free spaces.
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
