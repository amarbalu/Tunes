import React from "react";
import { Layout, Button,Row, Col,Menu,Icon } from 'antd';

const Homepage=(props)=>{
    const { Header, Footer, Content } = Layout;
return(
    <div style={{height:"100%"}} >

        <Header style={{  position: "sticky",backgroundColor:"#090909",
    top:"0",width:"100%",padding:"0 25px",
    zIndex: "1000" }}>
       <Row type="flex" >
      <Col xs={19} md={17} lg={19} xl={21} >
      <div className="logo" style={{display:"flex"}} >
          <img  alt="music-logo" style={{width:"40px",height:"40px",margin:"13px"}} src={`${process.env.PUBLIC_URL}/music_logo.png`}/>
      <h3 style={{position: "relative",color:"white",fontFamily:"sans-serif",margin: "15px 0"}}>Tunes</h3>
    
    </div>
      </Col>
      <Col xs={5} md={7} lg={5} xl={3}>
      <Menu
        theme="dark"
        mode="horizontal"
        
        style={{ lineHeight: '64px',backgroundColor:"#090909" }}
      >
         <Menu.Item key="signup"  onClick={()=>{props.history.push("/Register")}}>Signup</Menu.Item>
        
         
           
            <Menu.Item key="login"  onClick={()=>{props.history.push("/Login")}} >Login</Menu.Item>
          
        
       
      </Menu>
      </Col>
    </Row>
    </Header>
        <Content className="homepageContent"  >

<Row type="flex" style={{height:"calc(100% - 64px)",alignItems:"Center"}}>
  <Col xs={{span:21,offset:3}}  md={{span:16,offset:8}} lg={{span:15,offset:9}} xl={{span:12,offset:4}}>
    <h1 style={{color:"#fafafa",fontFamily:"sans-serif"
    }} >STAY TUNED...</h1>
    <Button  style={{width: "270px",fontWeight:"bold",
    height: "60px",fontSize:"larger",borderRadius:"20px"}}
    onClick={()=>{props.history.push("/Login")}}>Try it for free</Button>
  </Col>
  </Row>
    </Content>
      <Footer style={{backgroundColor:"#090909"}}>
         <div style={{display:"flex",justifyContent:"center",color:"white"}}>
         <div><Icon type="copyright" style={{position:"relative",bottom:"3px"}} /> <span>2019 Tunes</span></div>
         </div>
      </Footer>

    </div>


)
}

export default Homepage;