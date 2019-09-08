import React from "react";
import moment from "moment";
import useAudioPlayer from './useAudioPlayer';
import { Progress } from 'antd';
import momentDurationFormatSetup from "moment-duration-format";
import '../css/styles.css'

export default function Bar(props) {
  const { duration, curTime, setClickedTime } = props;

  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    setClickedTime(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      setClickedTime(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <div className="bar">
      <span className="bar__time" style={{marginLeft:'10px',fontSize:'small'}}>{formatDuration(curTime)}</span>
      
        {/* <Progress percent={curPercentage}  showInfo={false}  onMouseDown={e => handleTimeDrag(e)}/> */}
        <input type="range" className="bar__progress" value={curPercentage}  onMouseDown={e => handleTimeDrag(e)}/>
      <span className="bar__time" tyle={{marginLeft:'10px',fontSize:'small'}}>{formatDuration(duration)}</span>
    </div>
  );
}
