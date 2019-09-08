import React,{useRef, useEffect} from 'react';
import {Layout,Row, Col,Icon,Card} from 'antd';
import useAudioPlayer from './useAudioPlayer';
import Bar from './AudioBar.js';
import {connect} from 'react-redux'

const FooterComp=(props)=>{
  const { playing, setPlaying , curTime, duration, setClickedTime,setCurTime } = useAudioPlayer();
    const {Footer} = Layout;
    const player = useRef();
    const audio = document.getElementById("audio");
    useEffect(() =>{
      const audio = document.getElementById("audio");
      audio.addEventListener("pause",()=> {
        audio.pause()
setPlaying(false)
      },false)
      audio.addEventListener("play",()=> {
        audio.play()
setPlaying(true)
      },false)
    },[])

  const timeUpdate=(time)=>{
    setClickedTime(time)
  }
  const handleClick=(props)=> {
    if (playing) {
      audio.pause();
      document.title="Tunes"
    } else {
      document.title=props.metadata.common.title;
       audio.play();
    }
    setPlaying(!playing)
 };
    return(
        <Footer style={{ textAlign: 'center',position: "fixed",width: "100%",bottom: "0px",padding:"12px",height:"75px"// ,display:props.metadata?"block":"none"
        }}>
          <Row type="flex">
          <Col xs={24} sm={10}>
            <Row>
              <Col span={3}>
          <Card hoverable style={{ width: "40px" ,height:"40px",display:props.metadata?"block":"none"}} cover={<img alt="song" src={props.metadata && props.metadata.common?'data:image/jpeg;base64,' +props.metadata.common.picture[0].data:require('../images/song_logo.png')} />}>
          </Card>
          </Col>

            <Col span={18}>
             
              <div>
              <span style={{display:'flex',fontWeight:'bold'}}>
              <h6>{props.metadata&& props.metadata.common?props.metadata.common.title.split("::")[0]:props.metadata && props.metadata.filename?atob(props.metadata.filename):null}</h6>
              </span>
            </div>
              <div style={{ display:"flex",   width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"}}>
 
   {props.metadata && props.metadata.common && props.metadata.common.artist ?props.metadata.common.artist:null}

  </div>
  </Col>
  <Col xs={{span:3}}>
  <div style={{display:"flex",justifyContent:"flex-end"}}> 
          {!playing?<Icon type="play-circle" theme="filled"  style={{fontSize:"x-large"}} onClick={()=>handleClick(props)} />:
          <Icon type="pause-circle" theme="filled" style={{fontSize:"x-large"}}   onClick={()=>handleClick(props)}/>}
  

  </div>
  </Col>
  </Row>
          </Col>
          <Col xs={{span:0}} sm={14}>
          <audio id="audio" ref={player} src={props.audioSrc}   />
   <Bar curTime={curTime} duration={duration} setClickedTime={timeUpdate}/>        
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
