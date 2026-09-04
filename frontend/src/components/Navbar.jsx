import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/* Navigation bar with active link highlighting and role-based access */
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardPath = user?.role === 'admin' ? '/admin' : user?.role === 'worker' ? '/worker' : '/parking';

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <NavLink to={user ? dashboardPath : '/login'} className="navbar-brand" aria-label="ParkingPulse LK dashboard">
          <img src="/Parking_Pulse.png" alt="ParkingPulse LK" className="navbar-logo" />
          <span className="navbar-brand-text">ParkingPulse LK</span>
        </NavLink>

        {user && <ul className="navbar-links">
          {user.role === 'driver' && <li>
            <NavLink to="/parking" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Driver Dashboard
            </NavLink>
          </li>}
          
          {/* Only Admin and Worker can report availability */}
          {user.role === 'worker' && (
            <li>
              <NavLink to="/worker" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Worker Dashboard
              </NavLink>
            </li>
          )}
          {user.role === 'admin' && <li><NavLink to="/admin" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Admin Dashboard</NavLink></li>}

        </ul>}

        {/* User Auth Section */}
        <div className="navbar-auth">
          {user ? (
            <div className="user-menu" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <span style={{color: '#fff', fontSize: '0.9rem'}}>
                <strong>{user.email}</strong> <span className={`role-pill role-${user.role}`}>{user.role}</span>
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
