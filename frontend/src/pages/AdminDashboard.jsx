import { useEffect, useState } from 'react';
import { createParkingArea, createUser, deleteParkingArea, deleteUser, getParkingAreas, getUsers, updateParkingArea, updateUser } from '../services/api';
import '../styles/dashboard.css';

const emptyUser = { name: '', email: '', password: '', role: 'driver' };
const emptyArea = { name: '', location: '', totalSpaces: '', availableSpaces: '', assignedWorkers: [] };

export default function AdminDashboard() {
  const [tab,setTab]=useState('areas'), [users,setUsers]=useState([]), [areas,setAreas]=useState([]);
  const [userForm,setUserForm]=useState(emptyUser), [editingUser,setEditingUser]=useState(null);
  const [createForm,setCreateForm]=useState(emptyArea), [updateForm,setUpdateForm]=useState(emptyArea), [selectedAreaId,setSelectedAreaId]=useState('');
  const [message,setMessage]=useState('');
  const workers=users.filter(user=>user.role==='worker');
  const assignedElsewhere=new Set(areas.filter(area=>area._id!==selectedAreaId).flatMap(area=>(area.assignedWorkers||[]).map(worker=>worker._id)));
  const createWorkers=workers.filter(worker=>!areas.some(area=>(area.assignedWorkers||[]).some(item=>item._id===worker._id)));
  const updateWorkers=workers.filter(worker=>!assignedElsewhere.has(worker._id));

  const load=async()=>{try{const [u,a]=await Promise.all([getUsers(),getParkingAreas()]);setUsers(u);setAreas(a)}catch(e){setMessage(e.message)}};
  useEffect(()=>{load()},[]);
  const workerOption=worker=><option key={worker._id} value={worker._id}>{worker.name||worker.email.split('@')[0]} - {worker.email}</option>;
  const selectArea=id=>{setSelectedAreaId(id);const area=areas.find(item=>item._id===id);setUpdateForm(area?{name:area.name,location:area.location,totalSpaces:area.totalSpaces,availableSpaces:area.availableSpaces,assignedWorkers:area.assignedWorkers?.map(worker=>worker._id)||[]}:emptyArea);setMessage('')};

  const submitCreate=async e=>{e.preventDefault();try{await createParkingArea({...createForm,totalSpaces:Number(createForm.totalSpaces),availableSpaces:Number(createForm.availableSpaces)});setCreateForm(emptyArea);setMessage('Parking area created successfully.');await load()}catch(err){setMessage(err.message)}};
  const submitUpdate=async e=>{e.preventDefault();try{await updateParkingArea(selectedAreaId,{...updateForm,totalSpaces:Number(updateForm.totalSpaces),availableSpaces:Number(updateForm.availableSpaces)});setMessage('Parking area updated successfully.');await load()}catch(err){setMessage(err.message)}};
  const submitUser=async e=>{e.preventDefault();try{if(editingUser)await updateUser(editingUser,userForm);else await createUser(userForm);setUserForm(emptyUser);setEditingUser(null);setMessage('User saved successfully.');await load()}catch(err){setMessage(err.message)}};
  const remove=async(kind,id)=>{if(!window.confirm(`Delete this ${kind}? This cannot be undone.`))return;try{await(kind==='user'?deleteUser(id):deleteParkingArea(id));if(id===selectedAreaId)selectArea('');setMessage(`${kind} deleted.`);await load()}catch(err){setMessage(err.message)}};

  return <section className="management-page">
    <header className="management-header"><p className="eyebrow">Administration</p><h1>Admin dashboard</h1><p>Manage parking locations, worker assignments, and system users.</p></header>
    {message&&<div className="dashboard-message" role="status">{message}</div>}
    <div className="dashboard-tabs"><button className={tab==='areas'?'active':''} onClick={()=>setTab('areas')}>Parking areas ({areas.length})</button><button className={tab==='users'?'active':''} onClick={()=>setTab('users')}>Users ({users.length})</button></div>
    {tab==='areas'?<>
      <AreaForm title="Update parking area" form={updateForm} setForm={setUpdateForm} workers={updateWorkers} onSubmit={submitUpdate} disabled={!selectedAreaId} before={<label className="dashboard-field area-selector"><span>Select existing parking area</span><select value={selectedAreaId} onChange={e=>selectArea(e.target.value)}><option value="">Choose an area to update</option>{areas.map(area=><option key={area._id} value={area._id}>{area.name} - {area.location}</option>)}</select></label>} button="Update area" workerOption={workerOption}/>
      <AreaForm title="Create new parking area" form={createForm} setForm={setCreateForm} workers={createWorkers} onSubmit={submitCreate} button="Create parking area" workerOption={workerOption}/>
      <DataTable headers={['Name','Location','Spaces','Worker','Status','Actions']} rows={areas.map(area=>[area.name,area.location,`${area.availableSpaces} / ${area.totalSpaces}`,area.assignedWorkers?.[0]?.name||area.assignedWorkers?.[0]?.email||'None',area.status,<RowActions onEdit={()=>selectArea(area._id)} onDelete={()=>remove('parking area',area._id)}/>])}/>
    </>:<>
      <form className="management-form" onSubmit={submitUser}><h2>{editingUser?'Edit user':'Add user'}</h2><div className="form-row">
        <Field label="Full name"><input placeholder="e.g. Nimal Perera" value={userForm.name} onChange={e=>setUserForm({...userForm,name:e.target.value})} required/></Field>
        <Field label="Email address"><input type="email" placeholder="worker@example.com" value={userForm.email} onChange={e=>setUserForm({...userForm,email:e.target.value})} required/></Field>
        <Field label={editingUser?'New password (optional)':'Password'}><input type="password" minLength="6" placeholder="At least 6 characters" value={userForm.password} onChange={e=>setUserForm({...userForm,password:e.target.value})} required={!editingUser}/></Field>
        <Field label="Account role"><select value={userForm.role} onChange={e=>setUserForm({...userForm,role:e.target.value})}><option value="driver">Driver</option><option value="worker">Worker</option><option value="admin">Admin</option></select></Field>
      </div><div className="form-actions"><button className="btn btn-primary">{editingUser?'Update':'Create'}</button>{editingUser&&<button type="button" className="btn btn-outline" onClick={()=>{setEditingUser(null);setUserForm(emptyUser)}}>Cancel</button>}</div></form>
      <DataTable headers={['Name','Email','Role','Created','Actions']} rows={users.map(user=>[user.name||'Not set',user.email,user.role,new Date(user.createdAt).toLocaleDateString(),<RowActions onEdit={()=>{setEditingUser(user._id);setUserForm({name:user.name||'',email:user.email,password:'',role:user.role})}} onDelete={()=>remove('user',user._id)}/>])}/>
    </>}
  </section>;
}

function AreaForm({title,form,setForm,workers,onSubmit,button,before,disabled=false,workerOption}){return <form className="management-form" onSubmit={onSubmit}><h2>{title}</h2>{before}{disabled?<div className="selection-placeholder">Select a parking area above to display its current details.</div>:<><div className="form-row parking-area-form-row">
  <Field label="Parking area name"><input placeholder="Enter parking area name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required disabled={disabled}/></Field>
  <Field label="Location"><input placeholder="Enter parking location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} required disabled={disabled}/></Field>
  <Field label="Total parking spaces"><input type="number" min="1" placeholder="e.g. 100" value={form.totalSpaces} onChange={e=>setForm({...form,totalSpaces:e.target.value})} required disabled={disabled}/></Field>
  <Field label="Available spaces"><input type="number" min="0" max={form.totalSpaces||undefined} placeholder="e.g. 20" value={form.availableSpaces} onChange={e=>setForm({...form,availableSpaces:e.target.value})} required disabled={disabled}/></Field>
  <Field label="Assign worker"><select value={form.assignedWorkers[0]||''} onChange={e=>setForm({...form,assignedWorkers:e.target.value?[e.target.value]:[]})} disabled={disabled}><option value="">No worker assigned</option>{workers.map(workerOption)}</select>{!workers.length&&<small>No unassigned workers available.</small>}</Field>
  </div><div className="form-actions"><button className="btn btn-primary">{button}</button></div></>}</form>}
function Field({label,children}){return <label className="dashboard-field"><span>{label}</span>{children}</label>}
function RowActions({onEdit,onDelete}){return <div className="row-actions"><button className="action-edit" onClick={onEdit}>Edit</button><button className="action-delete" onClick={onDelete}>Delete</button></div>}
function DataTable({headers,rows}){return <div className="table-wrap"><table><thead><tr>{headers.map(header=><th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={index}>{row.map((cell,i)=><td key={i}>{cell}</td>)}</tr>)}</tbody></table>{!rows.length&&<p className="empty-table">No records found.</p>}</div>}
