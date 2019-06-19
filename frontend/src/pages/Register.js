import React,{useState} from 'react';
import '../App.css';


const Register=()=> {
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const saveValues=(e)=>{
        switch(e.target.id){
            case "username":
                setUsername(e.target.value);
                break;
                case "email":
                    setEmail(e.target.value);
                    break;
                    case "password":
                        setPassword(e.target.value);
                        break;
                        default:
                            break;
        }
    }
  return (
    <div class="row" id="register">
      <div class="col-sm-6"></div>
      <div class="col-sm-6">
      <div className="card bg-light text-dark card-background">
      <div class="card-header">Register Here</div>
    <div class="card-body">
    <div class="form-group">
  <label for="username">Name:</label>
  <input type="text" id="username" class="form-control" value={username} onChange={(e)=>saveValues(e)} />
</div>
<div class="form-group">
  <label for="email">Email:</label>
  <input type="email" class="form-control" id="email" value={email} onChange={(e)=>saveValues(e)}/>
</div>
<div class="form-group">
  <label for="password">Password:</label>
  <input type="password" class="form-control" id="password" value={password} onChange={(e)=>saveValues(e)}/>
</div>
<div class="form-group">
      <button id="Register" class="btn btn-primary">Register</button></div>
      </div>
    </div>
      </div>
      
    </div>
  );
}

export default Register;
