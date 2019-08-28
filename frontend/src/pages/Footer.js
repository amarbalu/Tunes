import React,{useRef, useEffect} from 'react';
import {Layout,Row, Col,Icon,Card} from 'antd';
import useAudioPlayer from './useAudioPlayer';
import Bar from './AudioBar.js';
import {connect} from 'react-redux'

const FooterComp=(props)=>{
  const { playing, setPlaying , curTime, duration, setClickedTime } = useAudioPlayer();
    const {Footer} = Layout;
    const player = useRef();
    const audio = document.getElementById("audio");
    useEffect(() =>{
      const audio = document.getElementById("audio");
      audio.addEventListener("pause",()=> {
        audio.pause()
      },false)
      audio.addEventListener("play",()=> {
        audio.play()
      },false)
    },[])
 
  // const setPlay=()=>{
  //   setPlaying(true);
  //   //audio.removeEventListener("play",setPlay,false);
  //    audio.addEventListener("pause",()=> setPause(),false)
  // }
  // const setPause=()=>{
  //   setPlaying(false)
  //   //audio.removeEventListener("pause",setPause,false);
  //   audio.addEventListener("play", ()=>setPlay(),false);
    
  // }
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
        <Footer style={{ textAlign: 'center',position: "fixed",
        width: "100%",
        bottom: "0px",padding:"12px"
        // ,display:props.metadata?"block":"none"
        }}>
          <Row type="flex">
          <Col xs={12} sm={8}>
            <Row>
              <Col span={6}>
          <Card
    hoverable
    style={{ width: "40px" ,height:"40px",display:props.metadata?"block":"none"}}
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
   <h6>{props.metadata && props.metadata.common && props.metadata.common.artist ?props.metadata.common.artist:null}</h6>
  </span>
  </div>
  </Col>
  </Row>
          </Col>
          <Col xs={12} sm={{span:16}}>
          <audio id="audio" ref={player} src={props.audioSrc}   />
          <div style={{display:"flex"}}> 
          {!playing?<Icon type="play-circle" theme="filled"  style={{fontSize:"x-large",margin:'10px'}} onClick={()=>handleClick(props)} />:
          <Icon type="pause-circle" theme="filled" style={{fontSize:"x-large",margin:'10px'}}   onClick={()=>handleClick(props)}/>}
   <Bar curTime={curTime} duration={duration} setClickedTime={(time)=>setClickedTime(time)}/>
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
