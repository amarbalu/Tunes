import React, { useEffect } from "react";
import { connect } from "react-redux";
import SongsLayout from "./SongsLayout";
import Fetch from "../components/Fetch";

const SongsList = (props) => {
  useEffect(() => {
    props.fetch(
      `/music/files`,
      "GET",null,
      (res) => {
        console.log(res)
        if (!res.err) {
          props.set_songs(res);
        }
      },
      (err) => {
        if(err.status===401){
          props.history.push("/login")
        }
      }
    );
  }, []);
  const deleteSong = (id, filename) => {
    props.fetch(
      `/music/trashit/${id}`,
      "DELETE",null,
      (res) => {
        if (res.success) {
          props.set_songs(props.songs.filter((check) => check._id !== id));
        }
      },
      (err) => {
        if(err.status===401){
          props.history.push("/login")
        }
      }
    );
  };
  return (
    <React.Fragment>
      <SongsLayout
        songs={props.songs}
        deleteSong={deleteSong}
        songSelected={props.songSelected}
      />
    </React.Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    loader_songs: (value) => {
      dispatch({
        type: "LOADER_CARD",
        loader: value,
      });
    },
    set_songs: (songs) => {
      dispatch({
        type: "SET_SONGS",
        songs,
      });
    },
    fetch:(appendUrl,type,payload,success,failure)=>
    dispatch(Fetch(appendUrl,type,payload,success,failure))
  };
};
const mapStateToProps = (state) => {
  return {
    songs: state.loginReducer.songs,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
