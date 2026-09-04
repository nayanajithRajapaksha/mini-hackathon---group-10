import { useEffect, useState } from 'react';
import { getParkingAreas, updateParkingArea } from '../services/api';
import '../styles/dashboard.css';

const emptyForm = { availableSpaces: '', note: '' };

export default function WorkerDashboard() {
  const [areas, setAreas] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const data = await getParkingAreas();
      setAreas(data);
    } catch (e) {
      setMessage(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        availableSpaces: Number(form.availableSpaces),
        note: form.note,
      };
      await updateParkingArea(editing._id, payload);
      setForm(emptyForm);
      setEditing(null);
      setMessage('Parking area updated successfully.');
      await load();
    } catch (e) {
      setMessage(e.message);
    }
  };

  const handleEdit = (area) => {
    setEditing(area);
    setForm({
      availableSpaces: area.availableSpaces,
      note: area.note || '',
    });
    setMessage('');
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(emptyForm);
    setMessage('');
  };

  return (
    <section className="management-page">
      <header className="management-header">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>Worker Dashboard</h1>
          <p>Manage parking availability for your assigned areas.</p>
        </div>
      </header>
      
      {message && <div className="dashboard-message" role="status">{message}</div>}

      {editing && (
        <form className="management-form" onSubmit={submit}>
          <h2>Update Area: {editing.name}</h2>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Total capacity: {editing.totalSpaces} spaces
          </p>
          <div className="form-row">
            <input
              type="number"
              min="0"
              max={editing.totalSpaces}
              placeholder="Available spaces"
              value={form.availableSpaces}
              onChange={(e) => setForm({ ...form, availableSpaces: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Observation note (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Update availability</button>
            <button type="button" className="btn btn-outline" onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      )}

      <div className="report-grid">
        {areas.map((area) => (
          <article className="report-card" key={area._id}>
            <div>
              <h3>{area.name}</h3>
              <p>{area.location}</p>
              <p style={{ marginTop: '0.5rem' }}>
                <strong>{area.availableSpaces}</strong> / {area.totalSpaces} spaces available
              </p>
              <small>Last updated: {new Date(area.lastUpdated).toLocaleString()}</small>
              {area.note && <p className="report-note">{area.note}</p>}
            </div>
            <div className="row-actions">
              <button
                className="action-edit"
                onClick={() => handleEdit(area)}
                disabled={editing && editing._id === area._id}
              >
                Update Spaces
              </button>
            </div>
          </article>
        ))}
      </div>
      
      {!areas.length && (
        <p className="empty-table">No parking areas are currently assigned to you.</p>
      )}
    </section>
  );
}
