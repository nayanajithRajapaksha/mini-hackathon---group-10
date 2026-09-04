import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import PredictionPage from './pages/PredictionPage.jsx';
import ParkingPage from './pages/ParkingPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />

        {/* Main content area with route switching */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/parking" element={<ParkingPage />} />
            <Route path="/predict" element={<PredictionPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Route for Reporting - Only for Admin & Worker */}
            <Route 
              path="/report" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'worker']}>
                  <PlaceholderPage feature="Report Availability" />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all for unknown URLs */}
            <Route path="*" element={<PlaceholderPage feature="Page Not Found" notFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
