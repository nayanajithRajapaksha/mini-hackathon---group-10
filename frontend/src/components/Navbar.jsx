import { NavLink } from 'react-router-dom';

/* Navigation bar with active link highlighting */
function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" aria-label="ParkingPulse LK Home">
          <img src="/Parking_Pulse.png" alt="ParkingPulse LK" className="navbar-logo" />
          <span className="navbar-brand-text">ParkingPulse LK</span>
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/parking" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Check Parking
            </NavLink>
          </li>
          <li>
            <NavLink to="/report" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Report Availability
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
