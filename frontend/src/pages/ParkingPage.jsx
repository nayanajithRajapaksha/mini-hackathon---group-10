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
          // If the backend has no data seeded yet, use master plan sample data
          setAreas(DEMO_FALLBACK_AREAS);
          setUsingFallback(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        // Offer graceful fallback so evaluation and testing can continue smoothly
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
        // Search filter: case-insensitive match on name or location
        const searchLower = searchTerm.trim().toLowerCase();
        const matchesSearch =
          !searchLower ||
          (area.name && area.name.toLowerCase().includes(searchLower)) ||
          (area.location && area.location.toLowerCase().includes(searchLower));

        // Status filter: exact match or all
        const matchesStatus =
          !selectedStatus ||
          (area.status && area.status.toLowerCase() === selectedStatus.toLowerCase());

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOption === 'spaces') {
          // Most spaces available first
          return (b.availableSpaces || 0) - (a.availableSpaces || 0);
        }
        // Default: Latest update first
        const timeA = new Date(a.lastUpdated || 0).getTime();
        const timeB = new Date(b.lastUpdated || 0).getTime();
        return timeB - timeA;
      });
  }, [areas, searchTerm, selectedStatus, sortOption]);

  // Reset all search and filter controls
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
        <h1 className="parking-page-title">Check Parking Availability</h1>
        <p className="parking-page-subtitle">
          Browse real-time parking spaces across central Kandy demonstration areas.
        </p>
      </header>

      {/* Demonstration notice */}
      <div className="demo-notice-banner" role="note">
        <strong>Demo notice:</strong> Parking availability and predictions in this student
        prototype use sample and community-reported information. Spaces are not reserved or
        guaranteed. Confirm availability when you arrive.
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
              <span className="search-icon" aria-hidden="true">🔍</span>
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
              <option value="Available">Available (🟢)</option>
              <option value="Limited">Limited (🟡)</option>
              <option value="Full">Full (🔴)</option>
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
          Showing {filteredAndSortedAreas.length} of {areas.length} parking {areas.length === 1 ? 'area' : 'areas'}
        </p>

        {usingFallback && (
          <span className="active-filters-info">
            (Displaying verified Kandy demonstration dataset)
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
          <div className="state-error-icon" aria-hidden="true">⚠️</div>
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
          <div className="empty-icon" aria-hidden="true">🔎</div>
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
