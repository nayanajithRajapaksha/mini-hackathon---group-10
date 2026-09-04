import { useState, useEffect } from 'react';
import { getParkingAreas, submitParkingUpdate } from '../services/api.js';
import { validateUpdate } from '../utils/updateValidation.js';
import '../styles/form.css';

/**
 * Get current datetime formatted for datetime-local input (YYYY-MM-DDTHH:MM).
 */
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/* Report Availability page — form to submit a parking update */
function ReportPage() {
  // Parking areas loaded from the API for the dropdown
  const [areas, setAreas] = useState([]);
  const [areasLoading, setAreasLoading] = useState(true);
  const [areasError, setAreasError] = useState(null);

  // The selected area object (to show total capacity)
  const [selectedArea, setSelectedArea] = useState(null);

  // Form field values
  const [formData, setFormData] = useState({
    parkingId: '',
    availableSpaces: '',
    observedAt: getCurrentDateTime(),
    note: '',
  });

  // Per-field validation errors
  const [errors, setErrors] = useState({});

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  // Load parking areas on page mount
  useEffect(() => {
    setAreasLoading(true);
    setAreasError(null);
    getParkingAreas()
      .then((data) => {
        setAreas(data);
        setAreasLoading(false);
      })
      .catch((err) => {
        setAreasError(err.message);
        setAreasLoading(false);
      });
  }, []);

  // Handle parking area dropdown change
  const handleAreaChange = (value) => {
    setFormData((prev) => ({ ...prev, parkingId: value, availableSpaces: '' }));
    setErrors((prev) => ({ ...prev, parkingId: '' }));
    setSuccessMessage('');
    setServerError('');

    // Find the full area object to display capacity
    const area = areas.find((a) => a.parkingId === value);
    setSelectedArea(area || null);
  };

  // Handle input field changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setSuccessMessage('');
    setServerError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setServerError('');

    // Client-side validation
    const totalSpaces = selectedArea ? selectedArea.totalSpaces : 0;
    const result = validateUpdate(formData, totalSpaces);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    // Send to backend
    setIsSubmitting(true);
    const response = await submitParkingUpdate({
      parkingId: formData.parkingId.trim(),
      availableSpaces: Number(formData.availableSpaces),
      observedAt: formData.observedAt,
      note: formData.note.trim(),
    });

    setIsSubmitting(false);

    if (response.success) {
      setSuccessMessage(response.message || 'Parking availability updated successfully.');
      // Reset form but keep areas loaded
      setFormData({
        parkingId: '',
        availableSpaces: '',
        observedAt: getCurrentDateTime(),
        note: '',
      });
      setSelectedArea(null);
      setErrors({});
    } else if (response.errors) {
      // Server returned field-level validation errors
      setErrors(response.errors);
      setServerError(response.message || 'Please correct the highlighted information.');
    } else {
      setServerError(response.message || 'Something went wrong. Please try again.');
    }
  };

  // Reset the form
  const handleReset = () => {
    setFormData({
      parkingId: '',
      availableSpaces: '',
      observedAt: getCurrentDateTime(),
      note: '',
    });
    setSelectedArea(null);
    setErrors({});
    setSuccessMessage('');
    setServerError('');
  };

  return (
    <div className="report-page">
      <h1 className="report-title">Report Parking Availability</h1>
      <p className="report-intro">
        Help fellow drivers by reporting the current number of available spaces
        at a parking area you have visited.
      </p>

      {/* Demo data notice */}
      <div className="report-notice">
        <strong>Demo notice:</strong> This student prototype uses sample data.
        Spaces are not reserved or guaranteed. Confirm availability when you arrive.
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="success-banner" role="alert">
          {successMessage}
        </div>
      )}

      {/* Server error message */}
      {serverError && (
        <div className="error-banner" role="alert">
          {serverError}
        </div>
      )}

      {/* Areas loading error */}
      {areasError && (
        <div className="error-banner" role="alert">
          {areasError}
        </div>
      )}

      {/* Loading state */}
      {areasLoading && <p className="loading-text">Loading parking areas...</p>}

      {/* Report form */}
      {!areasLoading && !areasError && (
        <form className="report-form" onSubmit={handleSubmit} noValidate>

          {/* Parking area dropdown */}
          <div className="form-group">
            <label htmlFor="report-area">Parking Area</label>
            <select
              id="report-area"
              value={formData.parkingId}
              onChange={(e) => handleAreaChange(e.target.value)}
              className={errors.parkingId ? 'input-error' : ''}
              aria-describedby={errors.parkingId ? 'area-error' : undefined}
            >
              <option value="">-- Select a parking area --</option>
              {areas.map((area) => (
                <option key={area.parkingId} value={area.parkingId}>
                  {area.name}
                </option>
              ))}
            </select>
            {errors.parkingId && (
              <span className="field-error" id="area-error" role="alert">
                {errors.parkingId}
              </span>
            )}

            {/* Show total capacity when an area is selected */}
            {selectedArea && (
              <span className="capacity-info">
                Total capacity: {selectedArea.totalSpaces} spaces
              </span>
            )}
          </div>

          {/* Available spaces input */}
          <div className="form-group">
            <label htmlFor="report-spaces">Available Spaces</label>
            <input
              type="number"
              id="report-spaces"
              value={formData.availableSpaces}
              onChange={(e) => handleChange('availableSpaces', e.target.value)}
              min="0"
              max={selectedArea ? selectedArea.totalSpaces : undefined}
              step="1"
              placeholder={
                selectedArea
                  ? `Enter a number from 0 to ${selectedArea.totalSpaces}`
                  : 'Select a parking area first'
              }
              disabled={!selectedArea}
              className={errors.availableSpaces ? 'input-error' : ''}
              aria-describedby={errors.availableSpaces ? 'spaces-error' : undefined}
            />
            {errors.availableSpaces && (
              <span className="field-error" id="spaces-error" role="alert">
                {errors.availableSpaces}
              </span>
            )}
          </div>

          {/* Observed date and time */}
          <div className="form-group">
            <label htmlFor="report-time">Observation Date and Time</label>
            <input
              type="datetime-local"
              id="report-time"
              value={formData.observedAt}
              onChange={(e) => handleChange('observedAt', e.target.value)}
              className={errors.observedAt ? 'input-error' : ''}
              aria-describedby={errors.observedAt ? 'time-error' : undefined}
            />
            {errors.observedAt && (
              <span className="field-error" id="time-error" role="alert">
                {errors.observedAt}
              </span>
            )}
          </div>

          {/* Optional note */}
          <div className="form-group">
            <label htmlFor="report-note">Note (optional)</label>
            <textarea
              id="report-note"
              value={formData.note}
              onChange={(e) => handleChange('note', e.target.value)}
              placeholder="e.g. Spaces available near the main entrance."
              maxLength={150}
              className={errors.note ? 'input-error' : ''}
              aria-describedby={errors.note ? 'note-error' : 'note-counter'}
            />
            <span
              id="note-counter"
              className={`note-counter ${formData.note.length > 120 ? 'over-limit' : ''}`}
            >
              {formData.note.length}/120
            </span>
            {errors.note && (
              <span className="field-error" id="note-error" role="alert">
                {errors.note}
              </span>
            )}
          </div>

          {/* Form action buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Update'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Clear
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReportPage;
