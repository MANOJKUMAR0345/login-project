import { useState } from 'react';

export default function Login(){

 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [users,setUsers]=useState([]);

 const register = async()=>{

  await fetch('http://localhost:5000/register',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body: JSON.stringify({name,email,password})
  });

  loadUsers();
 }

 const login = async()=>{

  const res = await fetch('http://localhost:5000/login',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body: JSON.stringify({email,password})
  });

  const data = await res.json();

  if(data.success){
   alert("Login Success");
   loadUsers();
  }else{
   alert("Invalid Login");
  }
 }

 const loadUsers = async()=>{

  const res = await fetch('http://localhost:5000/users');
  const data = await res.json();
  setUsers(data);
 }

 return(
  <div style={{padding:'20px'}}>

   <h2>Register</h2>

   <input placeholder="Name" onChange={e=>setName(e.target.value)} /><br/><br/>
   <input placeholder="Email" onChange={e=>setEmail(e.target.value)} /><br/><br/>
   <input placeholder="Password" onChange={e=>setPassword(e.target.value)} /><br/><br/>

   <button onClick={register}>Register</button>

   <hr />

   <h2>Login</h2>

   <button onClick={login}>Login</button>

   <hr />

   <h2>Database Details</h2>

   {users.map((u)=>(
    <div key={u.id}>
      {u.id} | {u.name} | {u.email}
    </div>
   ))}

  </div>
 )
}