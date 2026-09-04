import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ParkingPage from './pages/ParkingPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import WorkerDashboard from './pages/WorkerDashboard.jsx';
import RoleHome from './components/RoleHome.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />

        {/* Main content area with route switching */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<RoleHome />} />
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/parking" element={<ProtectedRoute><ParkingPage /></ProtectedRoute>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/worker" element={<ProtectedRoute allowedRoles={['worker']}><WorkerDashboard /></ProtectedRoute>} />

            {/* Protected Route for Reporting - Only for Admin & Worker */}
            <Route 
              path="/report" 
              element={
                <ProtectedRoute allowedRoles={['worker']}>
                  <WorkerDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all for unknown URLs */}
            <Route path="*" element={<ProtectedRoute><PlaceholderPage feature="Page Not Found" notFound /></ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
