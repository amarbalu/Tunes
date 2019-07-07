import React,{useState,useEffect} from 'react';
import { Layout, Menu, Icon,Row, Col  } from 'antd';
import SongsList from './SongsList.js';
import Upload from './Upload.js'


const Dashboard=(props)=>{
    const { Header, Content, Footer, Sider } = Layout;
    const [menuKeys,setMenuKeys]=useState("");
    const [audioSrc,setAudioSrc]=useState("");
    const [collapsible,setCollapible]=useState(window.innerWidth<480);
  
   
  
    // useEffect(()=> {
      
    //   setCollapible( window.innerWidth<480)
    // },[])
    const menu=(item)=>{
      setMenuKeys(item.key)
    }

    const songSelected=(id,filename)=>{
      // http://localhost:4000
    setAudioSrc(`
    /music/files/${filename}`)
    }

    const onLogout=()=>{
      // http://localhost:4000
        fetch(`
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
  console.log(collapsible)  
return (
  <React.Fragment>
    <Sider
    collapsible
    collapsed={collapsible}
     
      style={{
        overflow: 'auto',
        height: 'calc(100% - 80px)',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" style={{display:"flex"}} ><img  alt="music-logo" style={{width:"50px",height:"50px",margin:"20px"}} src={`${process.env.PUBLIC_URL}/music_logo.png`}/>
      {/* <span style={{fontSize: "x-large",
    position: "relative",color:"white",
    top:"5px"}}>play</span> */}
    {/* <Typography.Title  style={{color:"white"}}level={3}>play</Typography.Title> */}
    </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}   onSelect={(item)=>menu(item)}>
        <Menu.Item key="home">
          <Icon type="home" theme="filled" />
          <span className="nav-text">Home</span>
        </Menu.Item>
        <Menu.Item key="search">
          <Icon type="search" />
          <span className="nav-text">Search</span>
        </Menu.Item>
        <Menu.Item key="lib">
          <Icon type="folder-open" theme="filled" />
          <span className="nav-text">Your library</span>
        </Menu.Item>
        <Menu.Item key="add">
        <Icon type="cloud-upload" />
          <span className="nav-text">Add to your library</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Header className="header" 
    style={{marginLeft:!collapsible?"200px":"80px"}}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['setting']}
        style={{ lineHeight: '64px' }}
        onSelect={(item)=>menu(item)}
      >
        <Menu.Item key="albums">Albums</Menu.Item>
        <Menu.Item key="artists">Artists</Menu.Item>
        <Menu.Item key="songs">Songs</Menu.Item>
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              settings
            </span>
          }
        >
         
            <Menu.Item key="setting:1">Profile</Menu.Item>
            <Menu.Item key="setting:2" onClick={()=>onLogout()} >Logout</Menu.Item>
          
        </Menu.SubMenu>
       
      </Menu>
    </Header>
      <Content style={{ margin: '24px 16px 0',marginLeft:!collapsible?"250px":"80px" }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            {menuKeys==="add"?<Upload/>:null}
            {menuKeys==="songs"?<SongsList songSelected={(id,filename)=>songSelected(id,filename)}/>:null}
         
        </div>
      </Content>
      <Footer style={{ textAlign: 'center',    height: "80px",    position: "fixed",
    bottom: "0",
    width: "100%" }}>
      <Row>
      <Col span={18} push={6}>
      <audio  controls src={audioSrc}   autoPlay/>
      
      </Col>
      <Col span={6} pull={18}>
        
      </Col>
    </Row>
      
          </Footer>
          </React.Fragment>
  
);
}

export default Dashboard;