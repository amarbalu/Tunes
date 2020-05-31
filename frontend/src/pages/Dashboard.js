import React,{useState} from 'react';
import { Layout, Menu, Icon,Row, Col,Spin  } from 'antd';
import SongsList from './SongsList.js';
import Upload from './Upload.js';
import FooterComp from './Footer.js';
import {connect} from'react-redux'
import AlbumContent from './AlbumContent.js';
import Fetch from '../components/Fetch.js';

const antIcon = <img alt="Tunes" src={require("../images/tunes_icon.svg")} style={{width:"60px",height:"60px"}}/>;
const Loader = props => <div className={props.isshow ? "spinner-back  show spinnerLayout" : "hide"}>
  
  <Spin size="large" className={"spinner " + (props.isshow ? "show" : "hide")} 
  indicator={antIcon}  />

</div>
const Dashboard=(props)=>{
    const { Header, Content, Sider } = Layout;
    const [menuKeys,setMenuKeys]=useState("songs");
    const [audioSrc,setAudioSrc]=useState("");
  
   

    const menu=(item)=>{
      setMenuKeys(item.key)
    }

    const songSelected=(id,filename,metadata)=>{
      setAudioSrc(`${process.env.REACT_APP_API_URL}/music/files/${id}`)
      props.loading_music(metadata);
    }

    const onLogout=()=>{
      props.fetch(
        `/logout`,
        "GET",
        null,
        async (response) => {
          if (response.success) {
           
            props.history.push("/homepage")
          } 
        },
        (err) => {
          if(err.status===401){
            props.history.push("/loginpage")
          }
        }
      );
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
      
        style={{ lineHeight: '64px' }}
      >
         <Menu.Item key="profile">
         <Icon type="user" />
          <span className="nav-text">Profile</span>
         </Menu.Item>
            <Menu.Item key="logout" onClick={()=>onLogout()} >
            <Icon type="logout" />
          <span className="nav-text">Logout</span>
            </Menu.Item>
      </Menu>
      </Col>
    </Row>
    </Header>
    <div style={{    height: "calc(100% - 154px)",
    display: "flex",position:"relative",top:"64px"

}}>
      <div>
    <Sider
      breakpoint="sm"
      collapsedWidth="0"
      className="sidebar-menu"
      style={{
      position:"fixed"
      ,left:"0",zIndex:"1000",height: "calc(100% - 154px)"
    }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline"  defaultSelectedKeys={['songs']}
        defaultOpenKeys={['lib']}  onSelect={(item)=>menu(item)}>
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
        
        {process.env.NODE_ENV!=="production"?<Menu.Item key="add">
        <Icon type="cloud-upload" />
          <span className="nav-text">Add to your library</span>
        </Menu.Item>:null}
      </Menu>
    </Sider>
    </div>
    <div className="sidebar">
      <Content style={{margin:"15px",marginBottom:'52px'}} >
        <div style={{ background: '#fff', minHeight: 360 }}>
        <Loader isshow={props.loader}/>
        {menuKeys==="add"?<Upload/>:null}
            {menuKeys==="songs"?<SongsList songSelected={(id,filename,metadata)=>songSelected(id,filename,metadata)}/>:null}
            {menuKeys==="artists"?<AlbumContent filterby="artists" songSelected={(id,filename,metadata)=>songSelected(id,filename,metadata)}/>:null}
            {menuKeys==="albums"?<AlbumContent filterby="album" songSelected={(id,filename,metadata)=>songSelected(id,filename,metadata)}/>:null}
        </div>
      </Content>
      </div>
    </div>
      <FooterComp audioSrc={audioSrc}/>
  </div>
  
);
}
const mapDispatchToProps=dispatch=>{
  return{
    loading_music:(value)=>{
      dispatch({
        type:"LOAD_MUSIC",
        metadata:value
      })
    },loader_songs:(value)=>{
      dispatch({
        type:"LOADER_CARD",
        loader:value
      })
    },
    fetch:(appendUrl,type,payload,success,failure)=>
    dispatch(Fetch(appendUrl,type,payload,success,failure))
  }
}
const mapStateToProps=state=>{
  return{
    loader:state.loginReducer.loader
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
