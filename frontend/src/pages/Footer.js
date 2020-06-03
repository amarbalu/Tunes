import React, {  useEffect, useState } from "react";
import { Layout, Row, Col, Icon, Card } from "antd";
import useAudioPlayer from "./useAudioPlayer";
import Bar from "./AudioBar.js";
import { connect } from "react-redux";

const FooterComp = (props) => {
  const [state, setState] = useState({
    audioSrc:""
  });
  const {
    playing,
    setPlaying,
    curTime,
    duration,
    setClickedTime,setDuration
  } = useAudioPlayer();
  useEffect(() => {
    if(state.audioSrc !== props.audioSrc){
      setState({ audioSrc: props.audioSrc });
      setPlaying(false)
      setDuration(0.0100)
    }
    
  }, [props.audioSrc]);
  const { Footer } = Layout;

  const onloadData = (second) => {
    if (second) {
      setClickedTime(Math.round(second));
    }
    const sec = parseInt(document.location.search.substr(1));

    if (!isNaN(sec)) setClickedTime(sec);
  };

  const handleClick = (props) => {
    const audio = document.getElementById("audio");
    if (playing) {
      audio.pause();
      document.title = "Tunes";
    } else {
      document.title = props.metadata.common.title;
      audio.play();
    }
    setPlaying(!playing);
  };
  return (
    <Footer
      style={{
        textAlign: "center",
        position: "fixed",
        width: "100%",
        bottom: "0px",
        padding: "12px",
        height: "75px"
      }}
    >
      {props.audioSrc?
      <Row type="flex">
        <Col xs={22} sm={10}>
          <Row>
            <Col span={4}>
              <Card
                hoverable
                style={{
                  width: "40px",
                  height: "40px",
                  display: props.metadata ? "block" : "none",
                }}
                cover={
                  <img
                    alt="song"
                    src={
                      props.metadata && props.metadata.common
                        ? "data:image/jpeg;base64," +
                          props.metadata.common.picture[0].data
                        : require("../images/song_logo.png")
                    }
                  />
                }
              ></Card>
            </Col>

            <Col span={20}>
              <div>
                <span style={{ display: "flex", fontWeight: "bold" }}>
                  <h6>
                    {props.metadata && props.metadata.common
                      ? props.metadata.common.title.split("::")[0]
                      : props.metadata && props.metadata.filename
                      ? atob(props.metadata.filename)
                      : null}
                  </h6>
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {props.metadata &&
                props.metadata.common &&
                props.metadata.common.artist
                  ? props.metadata.common.artist
                  : null}
              </div>
            </Col>
           
          </Row>
        </Col>
        <Col xs={2} sm={2}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {!playing ? (
                  <Icon
                    type="play-circle"
                    theme="filled"
                    style={{ fontSize: "x-large" }}
                    onClick={() => handleClick(props)}
                  />
                ) : (
                  <Icon
                    type="pause-circle"
                    theme="filled"
                    style={{ fontSize: "x-large" }}
                    onClick={() => handleClick(props)}
                  />
                )}
              </div>
            </Col>
        <Col xs={{span:0}} sm={12}>

          <audio
            id="audio"
            autoplay
            src={state.audioSrc}
            onloadedmetadata={onloadData()}
          />
          <Bar
            curTime={curTime}
            duration={duration}
            setClickedTime={(sec) => onloadData(sec)}
          />
        </Col>
      </Row>: <audio
            id="audio"
            autoplay
            src={state.audioSrc}
            onloadedmetadata={onloadData()}
          />}
    </Footer>
  );
};
const mapStateToProps = (state) => {
  return {
    metadata: state.musicReducer.metadata,
  };
};
export default connect(mapStateToProps, null)(FooterComp);
