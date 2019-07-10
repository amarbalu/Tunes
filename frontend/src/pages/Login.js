import React,{useState} from 'react';
import Service from '../Service/LoginService'
import '../css/App.css';
import {connect} from 'react-redux';

import {Card,Form, Icon, Input, Button} from 'antd';
const Login=(props)=> {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[validateStatusEmail,setValidateStatusEmail]=useState("success");
    const[validateStatusPassword,setValidateStatusPassword]=useState("success");
    const[helpEmail,setHelpEmail]=useState("");
    const[helpPassword,setHelpPassword]=useState("");
const loginApiCall=()=>{
  if(!helpEmail && !helpPassword && email && password){
  props.loading_action(true);
  const formData=new FormData();
  formData.append("password",password);
  formData.append("email",email);
  Service.onLogin(formData).then(response =>{ if(response.success){
    props.loading_action(false);
  props.history.push("/dashboard")
  }}).catch(err=>console.log("err"+err));
}
}
const loginFacebook=()=>{
  Service.onFacebookLogin().then(response => console.log(response)).catch(err=>console.log("err"+err));
}
const changeValues=(e)=>{
  switch(e.target.id){
          case "email":
            

              setEmail(e.target.value);
            
              break;
              case "password":
                console.log(e.target.value.length)
                if(e.target.value.length <=16  ){
               
                  setPassword(e.target.value);
                  setValidateStatusPassword("success");
                  setHelpPassword("")
              }else{
                setValidateStatusPassword("error");
                  setHelpPassword("Password possess maximum 16 characters")
              }
                  break;
                  default:
                      break;
  }
}

    const saveValues=(e)=>{
        switch(e.target.id){
                case "email":
                  if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(e.target.value)){

                    setEmail(e.target.value);
                    setValidateStatusEmail("success")
                    setHelpEmail("")
                  }else{
                    setValidateStatusEmail("error")
                    setHelpEmail("Enter valid Email")
                  }
                    break;
                    case "password":
                      if(e.target.value.length >=8 ){
                      if(/^[a-zA-Z0-9]*$/.test(e.target.value)){
                       
                        setValidateStatusPassword("success");
                        setHelpPassword("")
                      }else{
                        setValidateStatusPassword("error");
                        setHelpPassword("Password must be alphanumeric")
                      }
                    }
                    else{
                      setValidateStatusPassword("error");
                        setHelpPassword("Password possess mininum 8 characters")
                    }
                        break;
                        default:
                            break;
        }
    }
    
  return (
    <div className="row" id="login">
      <Card style={{minWidth:"300px"}}>
      
      <Form>
      <div style={{display:"flex",marginBottom:"25px"}} >
        <img  alt="music-logo" style={{width:"40px",height:"40px"}} src={`${process.env.PUBLIC_URL}/music_logo.png`}/>
     <span style={{fontSize:"20px"}}>Tunes</span>
      </div>
        <Form.Item validateStatus={validateStatusEmail} help={helpEmail} >
          
            <Input size="large"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email" value={email} onChange={(e)=>changeValues(e)} onBlur={(e)=>saveValues(e)} id="email"
            />
        </Form.Item>
        <Form.Item validateStatus={validateStatusPassword} help={helpPassword}>
          
            <Input.Password size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              onPressEnter={()=>loginApiCall()} onChange={(e)=>changeValues(e)}
              placeholder="Password" value={password} onBlur={(e)=>saveValues(e)} id="password"
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
const mapDispatchToProps=dispatch=>{
  return{
    loading_action:(value)=>{
      dispatch({
        type:"LOADING_ACTION",
        loading:value
      })
    }
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(null,mapDispatchToProps)(WrappedNormalLoginForm);
