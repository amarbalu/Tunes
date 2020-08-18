import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SongsList from "./SongsList";
import AlbumContent from "./AlbumContent";
import Upload from "./Upload";
import {Icon,Menu,Layout} from "antd"

const SidebarContent=props=>{
    const { Content, Sider } = Layout;
    const [state,setState]=useState({
        menuKeys:""
       
      })
      useEffect(()=>{
        setState({menuKeys:"songs"})
      },[])
      const menu=(item)=>{
        setState({
          ...state,
          menuKeys:item.key
        })
      }
  
      const songSelected=async(id,filename,metadata)=>{
       await props.loading_music(metadata);
       await props.set_audio_data(`${process.env.REACT_APP_API_URL}/music/files/${id}`,
      id
      )
      }
      
    return(
          <React.Fragment>
    <Sider
    breakpoint="sm"
    collapsedWidth="0"
    className="sidebar-menu"
    style={{
    position:"fixed"
    ,left:"0",zIndex:"1000",height: "calc(100% - 140px)"
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
  
  <div className="sidebar">
        
        <Content style={{margin:"15px",marginBottom:'52px'}} >
        <div style={{ background: '#fff', minHeight: 360 }}>
        {state.menuKeys==="add"?<Upload/>:null}
            {state.menuKeys==="songs"?<SongsList songSelected={(id,filename,metadata)=>songSelected(id,filename,metadata)}/>:null}
            {state.menuKeys==="artists"?<AlbumContent filterby="artists" songSelected={(id,filename,metadata)=>songSelected(id,filename,metadata)}/>:null}
            {state.menuKeys==="albums"?<AlbumContent filterby="album" songSelected={(id,filename,metadata)=>songSelected(id,filename,metadata)}/>:null}
        </div>
      </Content>
      </div>
      </React.Fragment>
    )
}
const mapDispatchToProps=dispatch=>{
    return{
      loading_music:(value)=>{
        dispatch({
          type:"LOAD_MUSIC",
          metadata:value
        })
      }
  }
}
  export default connect(null,mapDispatchToProps)(SidebarContent)