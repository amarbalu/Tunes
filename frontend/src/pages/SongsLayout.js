import React from "react";
import { Col, Row, Icon,Card } from 'antd';
import atob from 'atob';


const SongsLayout=(props)=>{
  const {Meta}=Card;
    return(
        <Row gutter={32}>
                
        {props.songs.length && props.songs.map((value,index)=>
            <Col key={index} lg={6} xs={12} xl={4} style={{paddingTop:'16px',paddingBottom:'16px'}}> 
        <Card  
        hoverable
        
        cover={<img alt="cover"  onClick={()=>props.songSelected(value._id,value.filename,value.metadata)} src={value.metadata.common && value.metadata.common.picture?'data:image/jpeg;base64,' +value.metadata.common.picture[0].data:require('../images/song_logo.png')}/>} 
   
    actions={process.env.NODE_ENV==="production"?[
        <Icon type="delete" key="delete"  onClick={()=>props.deleteSong(value._id,value.filename)}/>
      ]:[]}
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
    )
}
export default SongsLayout;