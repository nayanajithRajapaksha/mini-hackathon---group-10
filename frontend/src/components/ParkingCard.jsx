import StatusBadge from './StatusBadge.jsx';
import { Link } from 'react-router-dom';

/**
 * Formats ISO date string into a user-friendly readable format.
 */
function formatLastUpdated(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Recently';
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return 'Recently';
  }
}

/**
 * ParkingCard Component
 * Modern card displaying live capacity, status, location, and quick actions.
 */
function ParkingCard({ area }) {
  const {
    id,
    name,
    location,
    totalSpaces = 0,
    availableSpaces = 0,
    status = 'Available',
    lastUpdated,
    note,
  } = area;

  // Calculate percentage of available spaces
  const availablePercentage = totalSpaces > 0
    ? Math.min(100, Math.max(0, Math.round((availableSpaces / totalSpaces) * 100)))
    : 0;

  const isFull = availableSpaces === 0 || status === 'Full';
  const isLimited = !isFull && (status === 'Limited' || (totalSpaces > 0 && (availableSpaces / totalSpaces) <= 0.25));

  const statusColorClass = isFull
    ? 'card-status-full'
    : isLimited
      ? 'card-status-limited'
      : 'card-status-available';

  return (
    <article className={`parking-card ${statusColorClass}`} aria-labelledby={`parking-title-${id}`}>
      <div className="parking-card-header">
        <div>
          <h3 id={`parking-title-${id}`} className="parking-card-title">{name}</h3>
          <p className="parking-card-location">
            <svg className="card-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{location}</span>
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="parking-card-body">
        {/* Spaces visual metric */}
        <div className="spaces-metric">
          <div className="spaces-count-display">
            {isFull ? (
              <span className="spaces-full-text">0 spaces &mdash; Full</span>
            ) : (
              <>
                <span className="spaces-number">{availableSpaces}</span>
                <span className="spaces-label">
                  of {totalSpaces} spaces free
                </span>
              </>
            )}
          </div>
          <span className="occupancy-percentage">{availablePercentage}% free</span>
        </div>

        {/* Capacity meter visual indicator */}
        <div
          className="capacity-meter"
          role="progressbar"
          aria-valuenow={availableSpaces}
          aria-valuemin="0"
          aria-valuemax={totalSpaces}
          aria-label={`Available capacity: ${availableSpaces} of ${totalSpaces} spaces`}
        >
          <div
            className={`capacity-meter-fill ${statusColorClass}`}
            style={{ width: `${availablePercentage}%` }}
          />
        </div>

        {/* Observation note */}
        {note && (
          <div className="parking-card-note">
            <svg className="note-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="note-text">{note}</span>
          </div>
        )}

        {/* Footer info & quick actions */}
        <div className="parking-card-footer">
          <span className="last-updated-text">
            <svg className="card-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Updated {formatLastUpdated(lastUpdated)}</span>
          </span>

          <div className="card-actions">
            <Link
              to="/report"
              className="card-action-link"
              title={`Report update for ${name}`}
            >
              Report Update
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ParkingCard;
