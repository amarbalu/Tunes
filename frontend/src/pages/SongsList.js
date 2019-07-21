import React,{useState,useEffect} from 'react';
import { Card, Avatar,Col,Row } from 'antd';
import atob from 'atob';


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
            <Row gutter={32}>
                
        {songs.map((value,index)=>
            <Col key={index} lg={6} xs={12} xl={4}> 
        <Card  
        hoverable
        
        cover={<img alt="cover" src={'data:image/jpeg;base64,' +value.metadata.common.picture[0].data}/>} 
    onClick={()=>props.songSelected(value._id,value.filename)}
  >
    <Meta
     
      title={atob(value.filename)}
      description={value.metadata.common.composer.toString()}
    />
  </Card>
  </Col> 
        )}
        
        </Row>
        </React.Fragment>
    )
}

export default SongsList