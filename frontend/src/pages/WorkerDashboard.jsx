import { useEffect, useState } from 'react';
import { createParkingUpdate, deleteParkingUpdate, getParkingAreas, getParkingUpdates, updateParkingUpdate } from '../services/api';
import '../styles/dashboard.css';

const empty = { areaId: '', availableSpaces: '', note: '' };
export default function WorkerDashboard() {
  const [areas,setAreas]=useState([]), [updates,setUpdates]=useState([]), [form,setForm]=useState(empty);
  const [editing,setEditing]=useState(null), [message,setMessage]=useState(''), [loading,setLoading]=useState(true);
  const selectedArea=areas.find(area=>area._id===form.areaId);
  const load=async()=>{setLoading(true);try{const [a,u]=await Promise.all([getParkingAreas(),getParkingUpdates()]);setAreas(a);setUpdates(u);setMessage('')}catch(e){setMessage(e.message)}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  const submit=async(e)=>{e.preventDefault();try{const payload={...form,availableSpaces:Number(form.availableSpaces)};if(editing)await updateParkingUpdate(editing,payload);else await createParkingUpdate(payload);setForm(empty);setEditing(null);setMessage('Availability report saved.');await load()}catch(e){setMessage(e.message)}};
  const remove=async(id)=>{if(!window.confirm('Delete this availability report?'))return;try{await deleteParkingUpdate(id);setMessage('Report deleted.');await load()}catch(e){setMessage(e.message)}};
  return <section className="management-page"><header className="management-header"><div><p className="eyebrow">Operations</p><h1>Worker dashboard</h1><p>Create and manage parking availability reports.</p></div></header>
    {message&&<div className="dashboard-message" role="status">{message}</div>}
    <form className="management-form" onSubmit={submit}><h2>{editing?'Edit report':'New availability report'}</h2><div className="form-row">
      <label className="dashboard-field"><span>Assigned parking area</span><select value={form.areaId} onChange={e=>setForm({...form,areaId:e.target.value,availableSpaces:''})} required><option value="">Select an assigned area</option>{areas.map(a=><option key={a._id} value={a._id}>{a.name} — {a.location}</option>)}</select></label>
      <label className="dashboard-field"><span>Available spaces {selectedArea&&`(maximum ${selectedArea.totalSpaces})`}</span><input type="number" min="0" max={selectedArea?.totalSpaces} placeholder="Enter current free spaces" value={form.availableSpaces} onChange={e=>setForm({...form,availableSpaces:e.target.value})} required /></label>
      <label className="dashboard-field"><span>Observation note</span><input placeholder="Optional note about current availability" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} /></label>
    </div><div className="form-actions"><button className="btn btn-primary" disabled={!areas.length}>{editing?'Update report':'Submit report'}</button>{editing&&<button type="button" className="btn btn-outline" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel</button>}</div>{!loading&&!areas.length&&<p className="form-help">No parking area is assigned to you. Ask an administrator to assign one.</p>}</form>
    {loading?<div className="state-box state-box-loading"><div className="spinner"/><p>Loading your assigned parking areas and reports...</p></div>:<div className="report-grid">{updates.map(u=><article className="report-card" key={u._id}><div><h3>{u.areaId?.name||'Deleted area'}</h3><p><strong>{u.availableSpaces}</strong> spaces available</p><small>{new Date(u.observationTime).toLocaleString()}</small>{u.note&&<p className="report-note">{u.note}</p>}</div><div className="row-actions"><button className="action-edit" onClick={()=>{setEditing(u._id);setForm({areaId:u.areaId?._id||'',availableSpaces:u.availableSpaces,note:u.note||''})}}>Edit</button><button className="action-delete" onClick={()=>remove(u._id)}>Delete</button></div></article>)}</div>}
    {!loading&&!updates.length&&<p className="empty-table">No reports yet. Add your first availability report above.</p>}
  </section>;
}
