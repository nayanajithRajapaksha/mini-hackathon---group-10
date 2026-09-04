import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import PredictionPage from './pages/PredictionPage.jsx';
import ParkingPage from './pages/ParkingPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      {/* Main content area with route switching */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/report" element={<PlaceholderPage feature="Report Availability" />} />
          <Route path="/predict" element={<PredictionPage />} />

          {/* Catch-all for unknown URLs */}
          <Route path="*" element={<PlaceholderPage feature="Page Not Found" notFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
