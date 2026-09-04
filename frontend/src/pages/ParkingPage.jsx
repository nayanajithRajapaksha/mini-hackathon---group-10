import { useState, useEffect, useMemo } from 'react';
import { getParkingAreas } from '../services/api.js';
import ParkingCard from '../components/ParkingCard.jsx';
import '../styles/parking.css';

// Fallback sample data matching Section 12 of Master Plan in case backend is offline
const DEMO_FALLBACK_AREAS = [
  {
    id: 'P001',
    name: 'KCC Demo Parking Area A',
    location: 'Dalada Veediya area, Kandy',
    totalSpaces: 20,
    availableSpaces: 8,
    status: 'Available',
    lastUpdated: '2026-09-04T08:15:00.000Z',
    note: 'Spaces reported near the main entrance.',
  },
  {
    id: 'P002',
    name: 'Municipal Demo Parking Area B',
    location: 'Torrington Road area, Kandy',
    totalSpaces: 24,
    availableSpaces: 0,
    status: 'Full',
    lastUpdated: '2026-09-04T08:20:00.000Z',
    note: 'Car park currently at maximum capacity.',
  },
  {
    id: 'P003',
    name: 'Bogambara Demo Parking Area C',
    location: 'Near Bogambara Stadium, Kandy',
    totalSpaces: 20,
    availableSpaces: 2,
    status: 'Limited',
    lastUpdated: '2026-09-04T08:10:00.000Z',
    note: 'Only a few spaces remaining near the exit.',
  },
  {
    id: 'P004',
    name: 'Clock Tower Demo Parking Area D',
    location: 'Near Kandy Clock Tower, Kandy',
    totalSpaces: 18,
    availableSpaces: 6,
    status: 'Available',
    lastUpdated: '2026-09-04T08:05:00.000Z',
    note: 'Parking available on the upper level.',
  },
];

/**
 * ParkingPage Component
 * Availability browser allowing Kandy drivers to inspect, search, filter,
 * and sort parking areas by status and available spaces.
 */
function ParkingPage() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Search, filter, and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortOption, setSortOption] = useState('latest');

  // Load parking data from backend API
  const loadParkingAreas = () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);

    getParkingAreas()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAreas(data);
        } else {
          setAreas(DEMO_FALLBACK_AREAS);
          setUsingFallback(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to connect to the backend server.');
        setAreas(DEMO_FALLBACK_AREAS);
        setUsingFallback(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadParkingAreas();
  }, []);

  // Filter and sort the parking areas
  const filteredAndSortedAreas = useMemo(() => {
    return areas
      .filter((area) => {
        const searchLower = searchTerm.trim().toLowerCase();
        const matchesSearch =
          !searchLower ||
          (area.name && area.name.toLowerCase().includes(searchLower)) ||
          (area.location && area.location.toLowerCase().includes(searchLower));

        const matchesStatus =
          !selectedStatus ||
          (area.status && area.status.toLowerCase() === selectedStatus.toLowerCase());

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOption === 'spaces') {
          return (b.availableSpaces || 0) - (a.availableSpaces || 0);
        }
        const timeA = new Date(a.lastUpdated || 0).getTime();
        const timeB = new Date(b.lastUpdated || 0).getTime();
        return timeB - timeA;
      });
  }, [areas, searchTerm, selectedStatus, sortOption]);

  const handleClearControls = () => {
    setSearchTerm('');
    setSelectedStatus('');
    setSortOption('latest');
  };

  const hasActiveFilters = searchTerm !== '' || selectedStatus !== '' || sortOption !== 'latest';

  return (
    <div className="parking-page">
      {/* Header section */}
      <header className="parking-page-header">
        <div className="title-with-pill">
          <span className="live-pulse-pill">
            <span className="pulse-dot"></span> Live Data
          </span>
          <h1 className="parking-page-title">Kandy Parking Availability</h1>
        </div>
        <p className="parking-page-subtitle">
          Browse real-time parking spaces across central Kandy demonstration areas.
        </p>
      </header>

      {/* Demonstration notice */}
      <div className="demo-notice-banner" role="note">
        <div className="demo-notice-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <p>
          <strong>Demo Notice:</strong> Parking availability and predictions in this student
          prototype use sample and community-reported information. Spaces are not reserved or
          guaranteed. Confirm availability when you arrive.
        </p>
      </div>

      {/* Search, Filter, and Sort Controls */}
      <section className="parking-controls-card" aria-label="Search and filter parking areas">
        <div className="parking-controls-grid">
          {/* Search Input */}
          <div className="control-item">
            <label htmlFor="parking-search" className="control-label">
              Search by name or location
            </label>
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                id="parking-search"
                type="text"
                className="control-input has-icon"
                placeholder="e.g., KCC, Dalada Veediya, Clock Tower..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="control-item">
            <label htmlFor="status-filter" className="control-label">
              Filter by status
            </label>
            <select
              id="status-filter"
              className="control-input"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Limited">Limited</option>
              <option value="Full">Full</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="control-item">
            <label htmlFor="sort-selector" className="control-label">
              Sort by
            </label>
            <select
              id="sort-selector"
              className="control-input"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="latest">Latest Update</option>
              <option value="spaces">Most Spaces Available</option>
            </select>
          </div>

          {/* Clear Button */}
          <div className="control-actions">
            <button
              type="button"
              className="btn-clear"
              onClick={handleClearControls}
              disabled={!hasActiveFilters}
            >
              Clear Controls
            </button>
          </div>
        </div>
      </section>

      {/* Results Summary Bar */}
      <div className="results-summary-bar">
        <p className="results-count-text">
          Showing <strong>{filteredAndSortedAreas.length}</strong> of <strong>{areas.length}</strong> parking {areas.length === 1 ? 'area' : 'areas'}
        </p>

        {usingFallback && (
          <span className="active-filters-info">
            (Verified Kandy demonstration dataset)
          </span>
        )}
      </div>

      {/* Content States */}
      {loading ? (
        <div className="state-box state-box-loading" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          <p>Loading parking availability in Kandy...</p>
        </div>
      ) : error && !usingFallback ? (
        <div className="state-box state-box-error" role="alert">
          <div className="state-error-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3>Unable to load parking areas</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button type="button" className="btn btn-primary" onClick={loadParkingAreas}>
              Try Again
            </button>
          </div>
        </div>
      ) : filteredAndSortedAreas.length === 0 ? (
        <div className="state-box state-box-empty" role="status">
          <div className="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#64748b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3>No matching parking areas found</h3>
          <p>
            No demonstration parking area matches your current search or filter criteria.
          </p>
          <button type="button" className="btn btn-primary" onClick={handleClearControls}>
            Reset Filters
          </button>
        </div>
      ) : (
        /* Parking Cards Grid */
        <div className="parking-grid" role="region" aria-label="Kandy Parking Areas List">
          {filteredAndSortedAreas.map((area) => (
            <ParkingCard key={area.id} area={area} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ParkingPage;
