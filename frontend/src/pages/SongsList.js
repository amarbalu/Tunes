import React,{useState,useEffect} from 'react';
import { Card,Col,Row,Icon } from 'antd';
import atob from 'atob';
import {connect} from 'react-redux';


const SongsList=(props)=>{
    const [songs,setSongs]=useState([]);
    
const { Meta } = Card;
    useEffect(()=>{
        props.loader_songs(true);
        fetch(`${process.env.REACT_APP_API_URL}/music/files`,{
            method:"GET",
        }).then(function(res){ 
            return res.json() }).then(res=>{
                
                if(!res.err){

                    setSongs(res);
                    props.loader_songs(false);
                }
            }).catch(err=>console.log(err));
    },[])
    const deleteSong=(id,filename)=>{
        fetch(`${process.env.REACT_APP_API_URL}/music/trashit/${id}`,{
            method:"DELETE",
        }).then(function(res){ 
            return res.json() }).then(res=>{
                
                if(res.success){
                    setSongs(songs.filter(check => check._id !== id))
                }
            }).catch(err=>console.log(err));
    }
    return(
        <React.Fragment>
            <Row gutter={32}>
                
        {songs.map((value,index)=>
            <Col key={index} lg={6} xs={12} xl={4} style={{paddingTop:'16px',paddingBottom:'16px'}}> 
        <Card  
        hoverable
        
        cover={<img alt="cover"  onClick={()=>props.songSelected(value._id,value.filename,value.metadata)} src={value.metadata.common && value.metadata.common.picture?'data:image/jpeg;base64,' +value.metadata.common.picture[0].data:require('../images/song_logo.png')}/>} 
   
    actions={[
        <Icon type="delete" key="delete"  onClick={()=>deleteSong(value._id,value.filename)}/>
      ]}
  >
    <Meta
     style={{ whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"}}  onClick={()=>props.songSelected(value._id,value.filename,value.metadata)}
      title={value.metadata.common ?  value.metadata.common.title.indexOf('::')>=0?value.metadata.common.title.split("::")[0]:value.metadata.common.title.split("-")[0]:atob(value.filename)}
      description={value.metadata.common && value.metadata.common.artist?value.metadata.common.artist.toString():<div style={{visibility:'hidden'}}>{atob(value.filename)}</div>}
    />
  </Card>
  </Col> 
        )}
        
        </Row>
        </React.Fragment>
    )
}
const mapDispatchToProps=dispatch=>{
    return{
      loader_songs:(value)=>{
        dispatch({
          type:"LOADER_CARD",
          loader:value
        })
      }
    }
  }
export default connect(null,mapDispatchToProps)(SongsList);
