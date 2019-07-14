import React,{useRef} from 'react';
import {Layout,Row, Col  } from 'antd';


const FooterComp=(props)=>{
    const {Footer} = Layout;
    const player = useRef();
    const playFunc=()=>{
         player.current.play()
    }
    return(
        <Footer style={{ textAlign: 'center',position: "fixed",
        width: "100%",
        bottom: "0",padding:"12px"}}>
          <Row>
          <Col xl={6}>
            
            </Col>
          <Col xl={18}>
          <audio ref={player} autoPlay controls  src={props.audioSrc}   />
          {/* <div> 
  <button onClick={playFunc}>Play</button> 
  <button onClick={()=>{ player.current.pause()}}>Pause</button> 
  <button onClick={()=>{ player.current.pause()}}>Vol +</button> 
  <button onClick={()=>{ player.current.pause()}}>Vol -</button> 
</div> */}
          </Col>
          
        </Row>
          
          </Footer>
    )
}
export default FooterComp