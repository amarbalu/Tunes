import React,{useState} from 'react';
import FormData from 'form-data';
import Service from '../Service/RegisterService';
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

    const Register=()=>{
const formData=new FormData();
formData.append("username",username);
formData.append("password",password);
formData.append("email",email);
Service.onRegister(formData).then(response => console.log(response)).catch(err=>console.log("err"+err));
    }
  return (
    <div className="row" id="register">
      <div className="col-1 col-xl-8"></div>
      <div className=" col-11 col-xl-4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div className="card bg-light text-dark card-background card-width">
      <div className="card-header">Register Here</div>
    <div className="card-body">
    <div className="form-group">
  <label htmlFor="username">Name:</label>
  <input type="text" id="username" className="form-control" value={username} onChange={(e)=>saveValues(e)} />
</div>
<div className="form-group">
  <label htmlFor="email">Email:</label>
  <input type="email" className="form-control" id="email" value={email} onChange={(e)=>saveValues(e)}/>
</div>
<div className="form-group">
  <label htmlFor="password">Password:</label>
  <input type="password" className="form-control" id="password" value={password} onChange={(e)=>saveValues(e)}/>
</div>
<div className="form-group">
      <button id="Register" className="btn btn-primary" onClick={()=>Register()}>Register</button></div>
      </div>
    </div>
      </div>
      
    </div>
  );
}

export default Register;
