import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/* Navigation bar with active link highlighting and role-based access */
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" aria-label="ParkingPulse LK Home">
          🚗 ParkingPulse LK
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
          
          {/* Only Admin and Worker can report availability */}
          {user && (user.role === 'admin' || user.role === 'worker') && (
            <li>
              <NavLink to="/report" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Report Availability
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/predict" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Predict Availability
            </NavLink>
          </li>
        </ul>

        {/* User Auth Section */}
        <div className="navbar-auth">
          {user ? (
            <div className="user-menu" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <span style={{color: '#fff', fontSize: '0.9rem'}}>
                Hi, <strong>{user.email.split('@')[0]}</strong> <span style={{opacity: 0.7, fontSize: '0.8rem'}}>({user.role})</span>
              </span>
              <button 
                onClick={handleLogout} 
                style={{
                  background: 'rgba(255, 255, 255, 0.2)', 
                  border: 'none', 
                  color: 'white', 
                  padding: '5px 12px', 
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="guest-menu" style={{display: 'flex', gap: '10px'}}>
              <NavLink to="/login" className="nav-link" style={{border: '1px solid rgba(255,255,255,0.5)', borderRadius: '5px', padding: '5px 12px'}}>
                Login
              </NavLink>
              <NavLink to="/signup" className="nav-link" style={{background: 'white', color: '#2c3e50', borderRadius: '5px', padding: '5px 12px', fontWeight: 'bold'}}>
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
