import { useEffect, useState } from 'react';
import { createParkingArea, createUser, deleteParkingArea, deleteUser, getParkingAreas, getUsers, updateParkingArea, updateUser } from '../services/api';
import '../styles/dashboard.css';

const emptyUser = { name: '', email: '', password: '', role: 'driver' };
const emptyArea = { name: '', location: '', totalSpaces: '', availableSpaces: '', assignedWorkers: [] };

export default function AdminDashboard() {
  const [tab, setTab] = useState('areas');
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [userForm, setUserForm] = useState(emptyUser);
  const [areaForm, setAreaForm] = useState(emptyArea);
  const [editingUser, setEditingUser] = useState(null);
  const [editingArea, setEditingArea] = useState(null);
  const [message, setMessage] = useState('');
  const workers = users.filter((user) => user.role === 'worker');

  const load = async () => {
    try { const [u, a] = await Promise.all([getUsers(), getParkingAreas()]); setUsers(u); setAreas(a); }
    catch (e) { setMessage(e.message); }
  };
  useEffect(() => { load(); }, []);

  const submitUser = async (e) => {
    e.preventDefault(); setMessage('');
    try {
      if (editingUser) await updateUser(editingUser, userForm); else await createUser(userForm);
      setUserForm(emptyUser); setEditingUser(null); setMessage('User saved successfully.'); await load();
    } catch (e) { setMessage(e.message); }
  };
  const submitArea = async (e) => {
    e.preventDefault(); setMessage('');
    const payload = { ...areaForm, totalSpaces: Number(areaForm.totalSpaces), availableSpaces: Number(areaForm.availableSpaces) };
    try {
      if (editingArea) await updateParkingArea(editingArea, payload); else await createParkingArea(payload);
      setAreaForm(emptyArea); setEditingArea(null); setMessage('Parking area saved successfully.'); await load();
    } catch (e) { setMessage(e.message); }
  };
  const remove = async (kind, id) => {
    if (!window.confirm(`Delete this ${kind}? This cannot be undone.`)) return;
    try { await (kind === 'user' ? deleteUser(id) : deleteParkingArea(id)); setMessage(`${kind} deleted.`); await load(); }
    catch (e) { setMessage(e.message); }
  };

  return <section className="management-page">
    <header className="management-header"><div><p className="eyebrow">Administration</p><h1>Admin dashboard</h1><p>Manage parking locations and system users.</p></div></header>
    {message && <div className="dashboard-message" role="status">{message}</div>}
    <div className="dashboard-tabs"><button className={tab === 'areas' ? 'active' : ''} onClick={() => setTab('areas')}>Parking areas ({areas.length})</button><button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>Users ({users.length})</button></div>
    {tab === 'areas' ? <>
      <form className="management-form" onSubmit={submitArea}><h2>{editingArea ? 'Edit parking area' : 'Add parking area'}</h2><div className="form-row parking-area-form-row">
        <label className="dashboard-field"><span>Parking area name</span><input placeholder="e.g. KCC Main Parking" value={areaForm.name} onChange={e => setAreaForm({...areaForm, name:e.target.value})} required /></label>
        <label className="dashboard-field"><span>Location</span><input placeholder="e.g. Dalada Veediya, Kandy" value={areaForm.location} onChange={e => setAreaForm({...areaForm, location:e.target.value})} required /></label>
        <label className="dashboard-field"><span>Total parking spaces</span><input type="number" min="1" placeholder="e.g. 100" value={areaForm.totalSpaces} onChange={e => setAreaForm({...areaForm, totalSpaces:e.target.value})} required /></label>
        <label className="dashboard-field"><span>Available spaces</span><input type="number" min="0" placeholder="e.g. 20" value={areaForm.availableSpaces} onChange={e => setAreaForm({...areaForm, availableSpaces:e.target.value})} required /></label>
        <label className="dashboard-field"><span>Assign worker</span><select value={areaForm.assignedWorkers[0] || ''} onChange={e => setAreaForm({...areaForm,assignedWorkers:e.target.value ? [e.target.value] : []})}><option value="">No worker assigned</option>{workers.map(worker=><option key={worker._id} value={worker._id}>{worker.name || worker.email.split('@')[0]} — {worker.email}</option>)}</select>{!workers.length && <small>Create a worker account in the Users tab first.</small>}</label>
      </div><div className="form-actions"><button className="btn btn-primary">{editingArea ? 'Update' : 'Create'}</button>{editingArea && <button type="button" className="btn btn-outline" onClick={() => {setEditingArea(null);setAreaForm(emptyArea)}}>Cancel</button>}</div></form>
      <DataTable headers={['Name','Location','Spaces','Worker','Status','Actions']} rows={areas.map(a => [a.name,a.location,`${a.availableSpaces} / ${a.totalSpaces}`,a.assignedWorkers?.map(w=>w.name || w.email).join(', ')||'None',a.status,<RowActions onEdit={() => {setEditingArea(a._id);setAreaForm({name:a.name,location:a.location,totalSpaces:a.totalSpaces,availableSpaces:a.availableSpaces,assignedWorkers:a.assignedWorkers?.map(w=>w._id)||[]})}} onDelete={() => remove('parking area',a._id)} />])} />
    </> : <>
      <form className="management-form" onSubmit={submitUser}><h2>{editingUser ? 'Edit user' : 'Add user'}</h2><div className="form-row">
        <label className="dashboard-field"><span>Full name</span><input placeholder="e.g. Nimal Perera" value={userForm.name} onChange={e => setUserForm({...userForm,name:e.target.value})} required /></label>
        <label className="dashboard-field"><span>Email address</span><input type="email" placeholder="worker@example.com" value={userForm.email} onChange={e => setUserForm({...userForm,email:e.target.value})} required /></label>
        <label className="dashboard-field"><span>{editingUser?'New password (optional)':'Password'}</span><input type="password" minLength="6" placeholder="At least 6 characters" value={userForm.password} onChange={e => setUserForm({...userForm,password:e.target.value})} required={!editingUser} /></label>
        <label className="dashboard-field"><span>Account role</span><select value={userForm.role} onChange={e => setUserForm({...userForm,role:e.target.value})}><option value="driver">Driver</option><option value="worker">Worker</option><option value="admin">Admin</option></select></label>
      </div><div className="form-actions"><button className="btn btn-primary">{editingUser ? 'Update' : 'Create'}</button>{editingUser && <button type="button" className="btn btn-outline" onClick={() => {setEditingUser(null);setUserForm(emptyUser)}}>Cancel</button>}</div></form>
      <DataTable headers={['Name','Email','Role','Created','Actions']} rows={users.map(u => [u.name||'Not set',u.email,u.role,new Date(u.createdAt).toLocaleDateString(),<RowActions onEdit={() => {setEditingUser(u._id);setUserForm({name:u.name||'',email:u.email,password:'',role:u.role})}} onDelete={() => remove('user',u._id)} />])} />
    </>}
  </section>;
}

function RowActions({onEdit,onDelete}) { return <div className="row-actions"><button className="action-edit" onClick={onEdit}>Edit</button><button className="action-delete" onClick={onDelete}>Delete</button></div>; }
function DataTable({headers,rows}) { return <div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table>{!rows.length && <p className="empty-table">No records found.</p>}</div>; }
