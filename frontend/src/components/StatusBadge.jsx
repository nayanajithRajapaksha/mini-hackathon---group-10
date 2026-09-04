/**
 * StatusBadge Component
 * Renders a color-coded status badge for parking availability:
 * - 🟢 Available (Green)
 * - 🟡 Limited (Amber)
 * - 🔴 Full (Red)
 */
function StatusBadge({ status }) {
  const normalizedStatus = (status || 'Available').trim();

  let badgeClass = 'status-available';
  let icon = '🟢';
  let label = 'Available';

  if (normalizedStatus.toLowerCase() === 'full') {
    badgeClass = 'status-full';
    icon = '🔴';
    label = 'Full';
  } else if (normalizedStatus.toLowerCase() === 'limited') {
    badgeClass = 'status-limited';
    icon = '🟡';
    label = 'Limited';
  }

  return (
    <span
      className={`status-badge ${badgeClass}`}
      role="status"
      aria-label={`Parking status: ${label}`}
    >
      <span className="status-indicator" aria-hidden="true">{icon}</span>
      <span className="status-text">{label}</span>
    </span>
  );
}

export default StatusBadge;
