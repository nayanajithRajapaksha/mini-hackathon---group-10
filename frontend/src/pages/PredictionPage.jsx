import { useState, useEffect } from 'react';
import { getParkingAreas, getPrediction } from '../services/api.js';
import '../styles/prediction.css';

const DAY_TYPES = ['Weekday', 'Weekend'];
const TIME_SLOTS = ['Morning', 'Midday', 'Evening'];

/* Prediction page — form, result display, and disclaimer */
function PredictionPage() {
  // Parking area choices loaded from the API
  const [areas, setAreas] = useState([]);
  const [areasLoading, setAreasLoading] = useState(true);
  const [areasError, setAreasError] = useState(null);

  // Form selections
  const [parkingId, setParkingId] = useState('');
  const [dayType, setDayType] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  // Per-field validation errors
  const [fieldErrors, setFieldErrors] = useState({});

  // Prediction request state
  const [predicting, setPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  const [result, setResult] = useState(null);

  // Load parking areas for the select dropdown
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

  // Clear a field error when the user changes that field
  const handleParkingChange = (value) => {
    setParkingId(value);
    setFieldErrors((prev) => ({ ...prev, parkingId: '' }));
  };

  const handleDayChange = (value) => {
    setDayType(value);
    setFieldErrors((prev) => ({ ...prev, dayType: '' }));
  };

  const handleTimeChange = (value) => {
    setTimeSlot(value);
    setFieldErrors((prev) => ({ ...prev, timeSlot: '' }));
  };

  // Validate all three fields before submitting
  const validate = () => {
    const errors = {};
    if (!parkingId) errors.parkingId = 'Please select a parking area.';
    if (!dayType) errors.dayType = 'Please select a day type.';
    if (!timeSlot) errors.timeSlot = 'Please select a time slot.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit prediction request
  const handlePredict = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setPredicting(true);
    setPredictionError(null);
    setResult(null);

    getPrediction(parkingId, dayType, timeSlot)
      .then((data) => {
        setResult(data);
        setPredicting(false);
      })
      .catch((err) => {
        setPredictionError(err.message);
        setPredicting(false);
      });
  };

  // Reset everything
  const handleClear = () => {
    setParkingId('');
    setDayType('');
    setTimeSlot('');
    setFieldErrors({});
    setPredictionError(null);
    setResult(null);
  };

  // Map predicted status to a CSS modifier class
  const statusClass = (status) => {
    if (status === 'Available') return 'status-available';
    if (status === 'Limited') return 'status-limited';
    if (status === 'Full') return 'status-full';
    return '';
  };

  return (
    <div className="prediction-page">
      <h1 className="prediction-title">Predict Parking Availability</h1>
      <p className="prediction-intro">
        Select a parking area, day type, and time slot to see a simple estimate
        of expected availability based on historical sample data.
      </p>

      {/* Parking areas loading error */}
      {areasError && (
        <div className="prediction-error" role="alert">
          <p>{areasError}</p>
        </div>
      )}

      {/* Prediction form */}
      <form className="prediction-form" onSubmit={handlePredict} noValidate>

        {/* Parking area select */}
        <div className="form-group">
          <label htmlFor="parking-select">Parking Area</label>
          <select
            id="parking-select"
            value={parkingId}
            onChange={(e) => handleParkingChange(e.target.value)}
            disabled={areasLoading}
            aria-describedby={fieldErrors.parkingId ? 'parking-error' : undefined}
          >
            <option value="">
              {areasLoading ? 'Loading areas...' : '-- Select parking area --'}
            </option>
            {areas.map((area) => (
              <option key={area.parkingId} value={area.parkingId}>
                {area.name}
              </option>
            ))}
          </select>
          {fieldErrors.parkingId && (
            <span className="field-error" id="parking-error" role="alert">
              {fieldErrors.parkingId}
            </span>
          )}
        </div>

        {/* Day type select */}
        <div className="form-group">
          <label htmlFor="day-select">Day Type</label>
          <select
            id="day-select"
            value={dayType}
            onChange={(e) => handleDayChange(e.target.value)}
            aria-describedby={fieldErrors.dayType ? 'day-error' : undefined}
          >
            <option value="">-- Select day type --</option>
            {DAY_TYPES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {fieldErrors.dayType && (
            <span className="field-error" id="day-error" role="alert">
              {fieldErrors.dayType}
            </span>
          )}
        </div>

        {/* Time slot select */}
        <div className="form-group">
          <label htmlFor="time-select">Time Slot</label>
          <select
            id="time-select"
            value={timeSlot}
            onChange={(e) => handleTimeChange(e.target.value)}
            aria-describedby={fieldErrors.timeSlot ? 'time-error' : undefined}
          >
            <option value="">-- Select time slot --</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {fieldErrors.timeSlot && (
            <span className="field-error" id="time-error" role="alert">
              {fieldErrors.timeSlot}
            </span>
          )}
        </div>

        {/* Form actions */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={predicting || areasLoading}
          >
            {predicting ? 'Predicting...' : 'Predict'}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>

      {/* Prediction API error */}
      {predictionError && (
        <div className="prediction-error" role="alert">
          <p>{predictionError}</p>
        </div>
      )}

      {/* Prediction result */}
      {result && (
        <section className="prediction-result" aria-label="Prediction result">
          <h2>Prediction Result</h2>

          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">Parking Area</span>
              <span className="result-value">{result.parkingName}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Day Type</span>
              <span className="result-value">{result.dayType}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Time Slot</span>
              <span className="result-value">{result.timeSlot}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Predicted Available Spaces</span>
              <span className="result-value">{result.predictedAvailableSpaces}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Predicted Status</span>
              <span className={`result-value result-status ${statusClass(result.predictedStatus)}`}>
                {result.predictedStatus}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">Historical Samples Used</span>
              <span className="result-value">{result.sampleCount}</span>
            </div>
          </div>
        </section>
      )}

      {/* Prediction disclaimer */}
      <section className="disclaimer" aria-label="Prediction disclaimer">
        <p>
          <strong>Disclaimer:</strong> This prediction is a simple estimate based
          on historical sample data. It is not live information, a guarantee, or
          a parking reservation.
        </p>
      </section>
    </div>
  );
}

export default PredictionPage;
