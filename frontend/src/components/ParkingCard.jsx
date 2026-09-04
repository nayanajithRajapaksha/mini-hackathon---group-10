import StatusBadge from './StatusBadge.jsx';
import { Link } from 'react-router-dom';

/**
 * Formats ISO date string into a user-friendly readable format.
 */
function formatLastUpdated(dateStr) {
  if (!dateStr) return 'Just recently';
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
 * Displays key details of a single Kandy parking area.
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
            <span aria-hidden="true">📍</span> {location}
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

        {/* Progress bar visual indicator */}
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
            <span className="note-icon" aria-hidden="true">💬</span>
            <span className="note-text">{note}</span>
          </div>
        )}

        {/* Timestamp */}
        <div className="parking-card-footer">
          <span className="last-updated-text">
            <span aria-hidden="true">🕒</span> Updated {formatLastUpdated(lastUpdated)}
          </span>

          <div className="card-actions">
            <Link
              to="/report"
              className="card-action-link"
              title={`Report update for ${name}`}
            >
              Update
            </Link>
            <Link
              to="/predict"
              className="card-action-link"
              title={`Predict availability for ${name}`}
            >
              Predict
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ParkingCard;
