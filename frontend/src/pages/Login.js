import React,{useState} from 'react';
import Service from '../Service/LoginService'
import '../App.css';


const Login=()=> {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
const loginApiCall=()=>{
  const formData=new FormData();
  formData.append("password",password);
  formData.append("email",email);
  Service.onLogin(formData).then(response => console.log(response)).catch(err=>console.log("err"+err));
}
    const saveValues=(e)=>{
        switch(e.target.id){
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
    // const check=()=>{
    //   return fetch('/login/successRedirect',{
    //     method:"GET",
    //     credentials: 'include'
    // }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
    // }
  return (
    <div className="row" id="login">
      <div className="card bg-light text-dark card-background-login">
      <div className="card-header">Login</div>
    <div className="card-body card-body-login">
<div className="form-group">
  <label htmlFor="email" style={{color:"white"}}>Email:</label>
  <input type="email" className="form-control" id="email" value={email} onChange={(e)=>saveValues(e)}/>
</div>
<div className="form-group">
  <label htmlFor="password" style={{color:"white"}}>Password:</label>
  <input type="password" className="form-control" id="password" value={password} onChange={(e)=>saveValues(e)}/>
</div>
<div className="form-group">
      <button id="Login" className="btn btn-primary" onClick={()=>loginApiCall()}>Login</button></div>
      {/* <button id="Login" className="btn btn-primary" onClick={()=>check()}>check</button> */}
      <a href="/Register" >Not Register? Create an account</a>
      </div>
     
      
      

    </div>
      {/* </div>
    <div className"col-sm-4"></div> */}
      
    </div>
  );
}

export default Login;
