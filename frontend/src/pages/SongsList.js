import React,{useState,useEffect} from 'react';
import { Card, Icon, Avatar } from 'antd';


const SongsList=(props)=>{
    const [songs,setSongs]=useState([]);
    
const { Meta } = Card;
    useEffect(()=>{
        // http://localhost:4000
        fetch('/music/files',{
            method:"GET",
            // credentials: 'include'
        }).then(function(res){ 
            return res.json() }).then(res=>{
                
                if(!res.err){

                    setSongs(res);
                }
            }).catch(err=>console.log(err));
    },[])
    return(
        <React.Fragment>
        {songs.map((value,index)=>

        <Card keys={index} 
    style={{ width: 300 }} onClick={()=>props.songSelected(value._id,value.filename)}
  >
    <Meta
      avatar={<Avatar src={require("../images/song_logo.png")} />}
      title={value.filename}
      description={value.chunkSize}
    />
  </Card> 
        )}
        </React.Fragment>
    )
}

export default SongsList