import React,{useRef, useEffect} from 'react';
import {Layout,Row, Col,Icon,Card} from 'antd';
import useAudioPlayer from './useAudioPlayer';
import Bar from './AudioBar.js';
import {connect} from 'react-redux'

const FooterComp=(props)=>{
  const { playing, setPlaying } = useAudioPlayer();
    const {Footer} = Layout;
    const player = useRef();
    useEffect(()=>{
    const audio = document.getElementById("audio");
    //audio.addEventListener("play", setPlay,false)
    //audio.addEventListener("pause", setPause,false)
    //const setPlay=()=>setPlaying(true)
    //const setPause=()=>setPlaying(false)
    })
    return(
        <Footer style={{ textAlign: 'center',position: "fixed",
        width: "100%",
        bottom: "0px",padding:"12px",display:props.metadata?"block":"none"}}>
          <Row type="flex">
          <Col xs={12} sm={8}>
            <Row>
              <Col span={6}>
          <Card
    hoverable
    style={{ width: "40px" ,height:"40px"}}
    cover={<img alt="song" src={props.metadata && props.metadata.common?'data:image/jpeg;base64,' +props.metadata.common.picture[0].data:require('../images/song_logo.png')} />}
  >
  </Card>
  </Col>

  <Col span={18}>
    <div>
  <span style={{display:'flex',fontWeight:'bold'}}>
  <h6>{props.metadata&& props.metadata.common?props.metadata.common.title.split("::")[0]:props.metadata && props.metadata.filename?atob(props.metadata.filename):null}</h6>
  </span>
  </div>
  <div>
  <span style={{display:'flex'}}>
   <h6>{props.metadata && props.metadata.common && props.metadata.common.composer ?props.metadata.common.composer.toString():null}</h6>
  </span>
  </div>
  </Col>
  </Row>
          </Col>
          <Col xs={12} sm={{span:16}}>
          <audio id="audio" ref={player} src={props.audioSrc}   />
          <div style={{display:"flex"}}> 
          {!playing?<Icon type="play-circle" theme="filled"  style={{fontSize:"x-large",margin:'10px'}} onClick={()=>{setPlaying(true)
          }} />:
          <Icon type="pause-circle" theme="filled" style={{fontSize:"x-large",margin:'10px'}}   onClick={()=>{
            setPlaying(false)
           }}/>}
   <Bar />
</div>
          </Col>
          
        </Row>
          
          </Footer>
    )
}
const mapStateToProps=state=>{
  return{
    metadata:state.musicReducer.metadata
  }
}
export default connect(mapStateToProps, null)(FooterComp)
