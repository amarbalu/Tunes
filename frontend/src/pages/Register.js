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
                setUsername(e.target.value);
                break;
                case "email":
                    setEmail(e.target.value);
                    break;
                    case "password":
                        setPassword(e.target.value);
                        break;
                        case "confirmPassword":
                          setConfirmPassword(e.target.value);
                          break;
                          case "phoneNumber":
                            setPhoneNumber(e.target.value);
                            break;
                        default:
                            break;
        }
    }

    const Register=()=>{
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
    }
  return (
    <div id="register">
      {/* <div className="col-1 col-xl-6"></div> */}
      {/* <div className=" col-11 col-xl-6" style={{display:"flex",alignItems:"center",justifyContent:"center"}}> */}
      <Row type="flex" justify="center" align="middle" style={{height:"100%"}}>
      <Card title="Signup"  >
      <Form className="registerForm" >
      <Form.Item
          label="Username" 
          colon={false} {...formItemLayout} 
        >
          <Input  placeholder="username" id="username" onChange={(e)=>saveValues(e)} value={username}/>
        </Form.Item>
        <Form.Item label="E-mail" colon={false} {...formItemLayout} >
          <Input placeholder="email" id="email" onChange={(e)=>saveValues(e)} value={email}/>
        </Form.Item>
        <Form.Item label="Password" hasFeedback colon={false} {...formItemLayout} >
          <Input.Password placeholder="password" id="password" onChange={(e)=>saveValues(e)} value={password}/>
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback colon={false}{...formItemLayout} >
         <Input.Password placeholder="confirm password" id="confirmPassword" onChange={(e)=>saveValues(e)} value={confirmPassword} />
        </Form.Item>
        
        
        <Form.Item label="Phone Number"  colon={false} {...formItemLayout} >
          <Input  style={{ width: '100%' }} placeholder="phone number" id="phoneNumber" value={phoneNumber} onChange={(e)=>saveValues(e)} />
        </Form.Item>
        <Form.Item>
        <div style={{display:"flex",justifyContent:"center"}}><a href="/Login" >Already Registered? Try Login</a></div>
        </Form.Item>
        {/* <Form.Item  {...tailFormItemLayout} colon={false} {...formItemLayout} >
          
            <Checkbox>
              I have read the agreement
            </Checkbox>,
          
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout} colon={false}>
          <Button type="primary" onClick={()=>Register()}>
           Signup
          </Button>
        </Form.Item>
      </Form>
      </Card>
      </Row>
      {/* <div className="card bg-light text-dark card-background card-width">
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
    </div> */}
      {/* </div> */}
      
    </div>
  );
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);
export default WrappedRegistrationForm;
