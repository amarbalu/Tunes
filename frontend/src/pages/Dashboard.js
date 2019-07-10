import React,{useState,useEffect} from 'react';
import { Layout, Menu, Icon,Row, Col  } from 'antd';
import SongsList from './SongsList.js';
import Upload from './Upload.js'


const Dashboard=(props)=>{
    const { Header, Content, Footer, Sider } = Layout;
    const [menuKeys,setMenuKeys]=useState("");
    const [audioSrc,setAudioSrc]=useState("");
    const [collapsible,setCollapible]=useState(window.innerWidth<480);
  
   

    const menu=(item)=>{
      setMenuKeys(item.key)
    }

    const songSelected=(id,filename)=>{
    setAudioSrc(`${process.env.REACT_APP_API_URL}
    /music/files/${filename}`)
    }

    const onLogout=()=>{
        fetch(`${process.env.REACT_APP_API_URL}
        /logout`,{
        method:"GET"
    }).then(res=>{
            return res.json()
        }).then(res => {
          if(res.success){
            props.history.push("/Login")
          }
        }).catch(err=>console.log(err));
    }
return (
      <div style={{height:"100%"}}>
      <Header style={{  padding: 0,position: "fixed",
    top:"0",
    width: "100%",
    zIndex: "1000" }} >
    <Row type="flex" >
      <Col xs={19} md={17} lg={19} xl={20} >
      <div className="logo" style={{display:"flex"}} ><img  alt="music-logo" style={{width:"40px",height:"40px",margin:"13px"}} src={`${process.env.PUBLIC_URL}/music_logo.png`}/>
      <span style={{fontSize: "large",
    position: "relative",color:"white",
    }}>Tunes</span>
    
    </div>
      </Col>
      <Col xs={5} md={7} lg={5} xl={4}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
         <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Settings
            </span>
          }
        >
         
           
            <Menu.Item key="logout" onClick={()=>onLogout()} >Logout</Menu.Item>
          
        </Menu.SubMenu>
       
      </Menu>
      </Col>
    </Row>
    </Header>
    <div style={{    height: "calc(100% - 64px)",
    display: "flex",position:"relative",top:"64px"

}}>
      <div>
    <Sider
      breakpoint="xs"
      collapsedWidth="0"
      style={{height:"100%"
      ,position:"fixed"
      ,left:"0",zIndex:"1000"
    }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}   onSelect={(item)=>menu(item)}>
        <Menu.Item key="home">
          <Icon type="home" theme="filled" />
          <span className="nav-text">Home</span>
        </Menu.Item>
        <Menu.Item key="search">
          <Icon type="search" />
          <span className="nav-text">Search</span>
        </Menu.Item>
       
         
          <Menu.SubMenu
            key="lib"
            title={
              <span>
                 <Icon type="folder-open" theme="filled" />
          <span className="nav-text">Your library</span>
              </span>
            }
          >
           <Menu.Item key="albums">Albums</Menu.Item>
        <Menu.Item key="artists">Artists</Menu.Item>
        <Menu.Item key="songs">Songs</Menu.Item>
          </Menu.SubMenu>
        
        <Menu.Item key="add">
        <Icon type="cloud-upload" />
          <span className="nav-text">Add to your library</span>
        </Menu.Item>
      </Menu>
    </Sider>
    </div>
    <div className="sidebar">
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        {menuKeys==="add"?<Upload/>:null}
            {menuKeys==="songs"?<SongsList songSelected={(id,filename)=>songSelected(id,filename)}/>:null}
        </div>
      </Content>
      </div>
    </div>
      <Footer style={{ textAlign: 'center',position: "fixed",
    width: "100%",
    bottom: "0",padding:"12px"}}>
      <Row>
      <Col xl={6}>
        
        </Col>
      <Col xl={18}>
      <audio  controls src={audioSrc}   autoPlay/>
      
      </Col>
      
    </Row>
      
      </Footer>
  </div>
  
);
}

export default Dashboard;