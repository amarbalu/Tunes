import React,{useState} from 'react';
import '../App.css';


const Login=()=> {
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
    <div class="row" id="login">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
      <div className="card bg-light text-dark card-background-login">
      <div class="card-header">Login</div>
    <div class="card-body card-body-login">
<div class="form-group">
  <label for="email" style={{color:"white"}}>Email:</label>
  <input type="email" class="form-control" id="email" value={email} onChange={(e)=>saveValues(e)}/>
</div>
<div class="form-group">
  <label for="password" style={{color:"white"}}>Password:</label>
  <input type="password" class="form-control" id="password" value={password} onChange={(e)=>saveValues(e)}/>
</div>
<div class="form-group">
      <button id="Login" class="btn btn-primary">Login</button></div>
      <a href="/Register" >Create an account?</a>
      </div>
     
      
      

    </div>
      </div>
    <div class="col-sm-4"></div>
      
    </div>
  );
}

export default Login;
