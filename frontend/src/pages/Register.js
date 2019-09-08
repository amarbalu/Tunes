import React,{useState} from 'react';
import FormData from 'form-data';
import Service from '../Service/RegisterService';
import '../css/App.css';
import {
  Form,
  Input,
  Row,
  Button,
  Card
} from 'antd'


const Register=()=> {
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[phoneNumber,setPhoneNumber]=useState("");
    const[helpUsername,setHelpUsername]=useState("");
    const[helpEmail,setHelpEmail]=useState("");
    const[helpPassword,setHelpPassword]=useState("");
    const[helpConfirmPassword,setHelpConfirmPassword]=useState("");
    const[helpPhoneNumber,setHelpPhoneNumber]=useState("");
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 10,
        },
      },
    };

    const saveValues=(e)=>{
        switch(e.target.id){
            case "username":
              if(/^[A-Za-z0-9]*$/.test(e.target.value) && e.target.value.length<=20){
                setUsername(e.target.value);
                setHelpUsername("");
              }else{
                setHelpUsername("Requires only alphanumeric");
              }
                break;
                case "email":
                    setEmail(e.target.value);
                    break;
                    case "password":
                      if(e.target.value && e.target.value.length<=16){
                        setHelpPassword("")
                        setPassword(e.target.value);
                      }else{
                        setHelpPassword("Password possess 16 characters in maximum")
                      }
                        break;
                        case "confirmPassword":
                            if(e.target.value && e.target.value.length<=16){
                          setConfirmPassword(e.target.value);
                          setHelpConfirmPassword("");
                        }else{
                          setHelpConfirmPassword("Password possess 16 characters in maximum")
                        }
                          break;
                          case "phoneNumber":
                              if(/^[0-9]*$/.test(e.target.value)){
                            setPhoneNumber(e.target.value);
                            setHelpPhoneNumber("")
                              }else{
                                setHelpPhoneNumber("Requires only numerics")
                              }
                            break;
                        default:
                            break;
        }
    }
const onBlurValues=(e)=>{
  switch(e.target.id){
  case "email":
      if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(e.target.value)){
        setEmail(e.target.value);
        setHelpEmail("")
      }else{
        setHelpEmail("Enter a valid Email")
      }
        break;
        case "password":
          if(e.target.value.length >=8 ){
          if(/^[a-zA-Z0-9]*$/.test(e.target.value)){
            setHelpPassword("")
          }else{
            setHelpPassword("Password must be alphanumeric")
          }
        }
        else{
            setHelpPassword("Password possess mininum 8 characters")
        }
            break;
            case "confirmPassword":
                if(e.target.value.length >=8 ){
                if(/^[a-zA-Z0-9]*$/.test(e.target.value)){
                  if(password !== e.target.value){
                    setHelpConfirmPassword("Passwords doesn't match")
                  }else{
                  setHelpConfirmPassword("")
                  }
                }else{
                  setHelpConfirmPassword("Password must be alphanumeric")
                }
              }
              else{
                setHelpConfirmPassword("Password possess mininum 8 characters")
              }
                  break;
            default:
                break;
}
}
    const Register=()=>{
      if(username && email && password && confirmPassword && phoneNumber
        && helpUsername && helpEmail && helpPassword && helpConfirmPassword && helpPhoneNumber){
        const formData=new FormData();
        formData.append("username",username);
        formData.append("password",password);
        formData.append("confirmPassword",confirmPassword);
        formData.append("email",email);
        formData.append("phoneNumber",phoneNumber);
        Service.onRegister(formData).then(response => {
          if(response.success){
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
          }}
          ).catch(err=>console.log("err"+err));
      }else{
        if(!username && !helpUsername){
          setHelpUsername("Username is required")
        }
        if(!email && !helpEmail){
          setHelpEmail("Email is required")
        }
        if(!password && !helpPassword){
          setHelpPassword("Password is required")
        }
        if(!confirmPassword && !helpConfirmPassword){
          setHelpConfirmPassword("Confirm Password is required")
        }
        if(!phoneNumber && !helpPhoneNumber){
          setHelpPhoneNumber("Phone Number is required")
        }
      }
    }
  return (
    <div id="register">
      <Row type="flex" justify="center" align="middle" style={{height:"100%"}}>
      <Card title="Signup"  >
      <Form className="registerForm" >
      <Form.Item
          label="Username" validateStatus={helpUsername?"error":"success"}
          help={helpUsername}
          colon={false} {...formItemLayout} 
        >
          <Input  placeholder="username" id="username" onChange={(e)=>saveValues(e)} onBlur={(e)=>onBlurValues(e)} value={username}/>
        </Form.Item>
        <Form.Item label="Email" colon={false} {...formItemLayout} help={helpEmail} validateStatus={helpEmail?"error":"success"}>
          <Input placeholder="email" id="email" onChange={(e)=>saveValues(e)} onBlur={(e)=>onBlurValues(e)} value={email}/>
        </Form.Item>
        <Form.Item label="Password"  colon={false} {...formItemLayout} help={helpPassword} validateStatus={helpPassword?"error":"success"} >
          <Input.Password placeholder="password" id="password" onChange={(e)=>saveValues(e)} onBlur={(e)=>onBlurValues(e)} value={password}/>
        </Form.Item>
        <Form.Item label="Confirm Password" colon={false}{...formItemLayout}  help={helpConfirmPassword} validateStatus={helpConfirmPassword?"error":"success"}  >
         <Input.Password placeholder="confirm password" id="confirmPassword" onChange={(e)=>saveValues(e)} onBlur={(e)=>onBlurValues(e)} value={confirmPassword} />
        </Form.Item>
        
        
        <Form.Item label="Phone Number"  colon={false} {...formItemLayout}  help={helpPhoneNumber} validateStatus={helpPhoneNumber?"error":"success"} >
          <Input  style={{ width: '100%' }} placeholder="phone number" id="phoneNumber" value={phoneNumber} onBlur={(e)=>onBlurValues(e)} onChange={(e)=>saveValues(e)} />
        </Form.Item>
        <Form.Item>
        <div style={{display:"flex",justifyContent:"center"}}><a href="/Login" >Already Registered? Try Login</a></div>
        </Form.Item>
        <Form.Item {...tailFormItemLayout} colon={false}>
          <Button type="primary" onClick={()=>Register()}>
           Signup
          </Button>
        </Form.Item>
      </Form>
      </Card>
      </Row>
    </div>
  );
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);
export default WrappedRegistrationForm;
