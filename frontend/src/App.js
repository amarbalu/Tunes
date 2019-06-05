import React,{useState} from 'react';
import './App.css';

const submitButton=(e,username,password)=>{
  e.preventDefault()
  const formData=new FormData();
  formData.append('username',username);
  formData.append('password',password)
  fetch('http://localhost:8000/login_autenticate',{
    method: 'POST',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 
    // formData
    JSON.stringify({username,password})
  })
  
   .then( data =>data.json()).then(data=>console.log(data))
}

function App() {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  return (
    <React.Fragment>
      <div>
        <form className="login-form">
          <div>
        <label >Username :</label>
        <input id="username" style={{marginLeft:'5px'}} value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        </div>
        <div>
        <label >Password :</label>
        <input id="password" style={{marginLeft:'9px'}} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <button type="submit" id="submit" onClick={(e)=>submitButton(e,username,password)}>submit</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default App;
