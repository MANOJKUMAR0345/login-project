const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./users.db');

db.run(`
CREATE TABLE IF NOT EXISTS users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 email TEXT,
 password TEXT
)
`);

app.post('/register', (req,res)=>{
 const {name,email,password} = req.body;

 db.run(
   "INSERT INTO users(name,email,password) VALUES(?,?,?)",
   [name,email,password],
   function(err){
     if(err){
       res.json({success:false});
     } else {
       res.json({success:true});
     }
   }
 );
});

app.post('/login',(req,res)=>{
 const {email,password}=req.body;

 db.get(
   "SELECT * FROM users WHERE email=? AND password=?",
   [email,password],
   (err,row)=>{
     if(row) res.json({success:true});
     else res.json({success:false});
   }
 );
});

app.get('/users',(req,res)=>{
 db.all("SELECT * FROM users",(err,rows)=>{
   res.json(rows);
 });
});

app.listen(5000, ()=>console.log("Server running on 5000"));