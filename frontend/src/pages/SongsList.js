import React,{useState,useEffect} from 'react';
import { Card, Icon, Avatar,Col,Row } from 'antd';


const SongsList=(props)=>{
    const [songs,setSongs]=useState([]);
    
const { Meta } = Card;
    useEffect(()=>{
        
        fetch(`${process.env.REACT_APP_API_URL}/music/files`,{
            method:"GET",
        }).then(function(res){ 
            return res.json() }).then(res=>{
                
                if(!res.err){

                    setSongs(res);
                }
            }).catch(err=>console.log(err));
    },[])
    return(
        <React.Fragment>
            <Row>
                
        {songs.map((value,index)=>
            <Col lg={12} xs={21} xl={8}> 
        <Card keys={index} 
    onClick={()=>props.songSelected(value._id,value.filename)}
  >
    <Meta
      avatar={<Avatar src={require("../images/song_logo.png")} />}
      title={value.filename}
      description={value.chunkSize}
    />
  </Card>
  </Col> 
        )}
        
        </Row>
        </React.Fragment>
    )
}

export default SongsList