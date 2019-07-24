import React,{useState,useEffect} from 'react';
import { Card,Col,Row } from 'antd';
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
        
        cover={<img alt="cover" src={value.metadata.common && value.metadata.common.picture?'data:image/jpeg;base64,' +value.metadata.common.picture[0].data:require('../images/song_logo.png')}/>} 
    onClick={()=>props.songSelected(value._id,value.filename,value.metadata)}
  >
    <Meta
     
      title={value.metadata.common ? value.metadata.common.title.split("::")[0]:atob(value.filename)}
      description={value.metadata.common && value.metadata.common.composer?value.metadata.common.composer.toString():null}
    />
  </Card>
  </Col> 
        )}
        
        </Row>
        </React.Fragment>
    )
}

export default SongsList;
