/**
 * StatusBadge Component
 * Renders an accessible, modern status badge with glowing status indicators:
 * - Available (Emerald Green)
 * - Limited (Amber/Orange)
 * - Full (Coral Red)
 */
function StatusBadge({ status }) {
  const normalizedStatus = (status || 'Available').trim().toLowerCase();

  let badgeClass = 'status-available';
  let label = 'Available';

  if (normalizedStatus === 'full') {
    badgeClass = 'status-full';
    label = 'Full';
  } else if (normalizedStatus === 'limited') {
    badgeClass = 'status-limited';
    label = 'Limited';
  }

  return (
    <span
      className={`status-badge ${badgeClass}`}
      role="status"
      aria-label={`Parking status: ${label}`}
    >
      <span className="status-dot" aria-hidden="true" />
      <span className="status-text">{label}</span>
    </span>
  );
}

export default StatusBadge;
