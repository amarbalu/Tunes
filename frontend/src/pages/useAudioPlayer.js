import { useState, useEffect } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState(0.0100);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState(0);
  useEffect(() => {
    
    const audio = document.getElementById("audio");
    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
      setPlay()
      audio.play()
    }
    const setPlay=()=>setPlaying(true)
    const setPause=()=>setPlaying(false)
    audio.addEventListener("play", setPlay,false);
    audio.addEventListener("pause", setPause,false);

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setCurTime(clickedTime)
      setClickedTime(null);
    } 

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    }
  });

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    setCurTime,
    setDuration
  }
}

export default useAudioPlayer;