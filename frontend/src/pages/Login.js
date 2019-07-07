import React,{useState} from 'react';
import Service from '../Service/LoginService'
import '../css/App.css';

import {Card,Form, Icon, Input, Button, Checkbox} from 'antd';
const Login=(props)=> {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
const loginApiCall=()=>{
  const formData=new FormData();
  formData.append("password",password);
  formData.append("email",email);
  Service.onLogin(formData).then(response =>{ if(response.success){
  props.history.push("/dashboard")
  }}).catch(err=>console.log("err"+err));
}
const loginFacebook=()=>{
  Service.onFacebookLogin().then(response => console.log(response)).catch(err=>console.log("err"+err));
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
    
  return (
    <div className="row" id="login">
      <Card style={{minWidth:"340px",    borderRadius: "10px"}}>
      
      <Form>
      <div style={{display:"flex",marginBottom:"25px"}} >
        <img  alt="music-logo" style={{width:"60px",height:"60px"}} src={`${process.env.PUBLIC_URL}/music_logo.png`}/>
     <span style={{fontSize:"16px",margin:"15px 15px 15px 10px"}}>play</span>
      </div>
        <Form.Item>
          
            <Input size="large"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email" value={email} onChange={(e)=>saveValues(e)} id="email"
            />
        </Form.Item>
        <Form.Item>
          
            <Input.Password size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              onPressEnter={()=>loginApiCall()}
              placeholder="Password" value={password} onChange={(e)=>saveValues(e)} id="password"
            />
        </Form.Item>
        <Form.Item>
         
          <Button type="primary" onClick={()=>loginApiCall()} className="login-form-button">
            Log in
          </Button>
          <div>
         <div style={{display:"flex",justifyContent:"center"}}><span 
        >or</span></div>
         <div style={{display:"flex",justifyContent:"center"}}><Button style={{backgroundColor:"#3b5998",borderColor:"#3b5998",color:"white"}}id="Login" onClick={()=>loginFacebook()} className="btn btn-primary" >
       Login with Facebook 
      </Button></div> 
      </div> 
      <div style={{display:"flex",justifyContent:"center"}}><a href="/Register" >Not Register? Create an account</a></div>
      
          
        </Form.Item>
      </Form> 
      </Card>
      
    </div>
  );
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
