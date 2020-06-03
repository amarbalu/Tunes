import React, { useState } from 'react';
import FooterComp from './Footer.js';
import SidebarContent from "./SidebarContent";
import AppBar from '../components/AppBar.js';

const Dashboard=(props)=>{
   const [state,setState]=useState({
    audioSrc:"",
    songid:""
   })
   const setData=(audioSrc,songid)=>{
     setState({
      audioSrc,
      songid
     })
   }
return (
      <React.Fragment>
     
    
    <div style={{    height: "calc(100% - 154px)",
    display: "flex",position:"relative"

}}>
    
      <SidebarContent set_audio_data={(url,id)=>setData(url,id)}/>
      
    </div>
      <FooterComp {...state} />
  </React.Fragment>
  
);
}
const WrppedComponent = AppBar({title:"Dashboard"})

export default WrppedComponent(Dashboard);
