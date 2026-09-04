/* Frontend API service — uses fetch via the Vite /api proxy */

/**
 * Fetch all parking areas from the backend.
 * Returns the data array from the response.
 */
export async function getParkingAreas() {
  const response = await fetch('/api/parking-areas');

  if (!response.ok) {
    throw new Error('Unable to load parking areas. Please try again later.');
  }

  const body = await response.json();

  if (!body.success) {
    throw new Error('The server returned an unsuccessful response.');
  }

  return body.data;
}

/**
 * Fetch a prediction for a specific parking area, day type, and time slot.
 * Returns the prediction data object from the response.
 */
export async function getPrediction(parkingId, dayType, timeSlot) {
  const params = new URLSearchParams({ parkingId, dayType, timeSlot });
  const response = await fetch(`/api/predictions?${params}`);

  if (!response.ok) {
    throw new Error('Unable to get prediction. Please try again later.');
  }

  const body = await response.json();

  if (!body.success) {
    throw new Error('The server returned an unsuccessful prediction response.');
  }

  return body.data;
}

/**
 * Submit a parking availability update to the backend.
 * Returns the full response body (success, message, errors, data).
 */
export async function submitParkingUpdate(updateData) {
  try {
    const response = await fetch('/api/parking-updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    const body = await response.json();
    return body;
  } catch (error) {
    return {
      success: false,
      message: 'Unable to connect to the server. Please check your connection and try again.',
    };
  }
}
