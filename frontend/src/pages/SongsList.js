import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SongsLayout from './SongsLayout';


const SongsList = (props) => {


    
    useEffect(() => {
       if(!props.songs.length){
        props.loader_songs(true);
        fetch(`${process.env.REACT_APP_API_URL}/music/files`, {
            method: "GET",
        }).then(function (res) {
            return res.json()
        }).then(res => {
            if (!res.err) {
                props.set_songs(res);
                props.loader_songs(false);
            }
        }).catch(err => console.log(err));
    }
    }, [])
    const deleteSong = (id, filename) => {
        fetch(`${process.env.REACT_APP_API_URL}/music/trashit/${id}`, {
            method: "DELETE",
        }).then(function (res) {
            return res.json()
        }).then(res => {

            if (res.success) {
                props.set_songs(props.songs.filter(check => check._id !== id))
            }
        }).catch(err => console.log(err));
    }
    return (
        <React.Fragment>
            <SongsLayout songs={props.songs} deleteSong={deleteSong}
                songSelected={props.songSelected} />
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
export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
