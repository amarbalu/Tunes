import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import {  Row } from 'antd';
import SongsLayout from "./SongsLayout";

const AlbumContent=(props)=>{
   
    const[map,setMap]=useState({});
    useEffect(()=>{
        const map={};
if(props.songs.length){
    if(props.filterby==="artists"){
    const artistFilter=props.songs.map(check => check.metadata.common.composer[0]).filter((value,index,self)=>self.indexOf(value)===index);
    
    artistFilter.forEach(value=>{
        map[value]=props.songs.filter(check => check.metadata.common.composer[0] === value);
    });}else{
        const albumFilter=props.songs.map(check => check.metadata.common.album).filter((value,index,self)=>self.indexOf(value)===index);
    
        albumFilter.forEach(value=>{
        map[value]=props.songs.filter(check => check.metadata.common.album === value);
    });
    }
    setMap(map);
}
    },[])
    return(

        <React.Fragment>
            {Object.keys(map).length && Object.keys(map).map(key=>            
        <Row>
                <div><span>{key}</span></div>
                <SongsLayout songs={map[key]}/>

        </Row>
            )}
        </React.Fragment>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        loader_songs: (value) => {
            dispatch({
                type: "LOADER_CARD",
                loader: value
            })
        },
        set_songs: (songs) => {
            dispatch({
                type: "SET_SONGS",
                songs
            })
        }
    }
}
const mapStateToProps = state => {
    return {
        songs: state.loginReducer.songs
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlbumContent);