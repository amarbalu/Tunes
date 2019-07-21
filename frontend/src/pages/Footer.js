import React,{useRef,useState,useEffect} from 'react';
import {Layout,Row, Col,Icon } from 'antd';
import useAudioPlayer from './useAudioPlayer';
import Bar from './AudioBar.js';

const FooterComp=(props)=>{
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();
    const {Footer} = Layout;
    const player = useRef();
 

    return(
        <Footer style={{ textAlign: 'center',position: "fixed",
        width: "100%",
        bottom: "0px",padding:"12px"}}>
          <Row type="flex">
          
          <Col xs={24} sm={{span:16,offset:8}}>
          <audio id="audio" ref={player} src={props.audioSrc}   />
          <div style={{display:"flex"}}> 
          {!playing?<Icon type="play-circle" theme="filled"  style={{fontSize:"x-large",margin:'10px'}} onClick={()=>{setPlaying(true)}} />:
          <Icon type="pause-circle" theme="filled" style={{fontSize:"x-large",margin:'10px'}}   onClick={()=>{setPlaying(false)}}/>}
   <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
</div>
          </Col>
          
        </Row>
          
          </Footer>
    )
}
export default FooterComp