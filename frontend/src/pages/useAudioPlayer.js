import { useState, useEffect } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    
    const audio = document.getElementById("audio");
    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }
    // const setPlay=()=>setPlaying(true)
    // const setPause=()=>setPlaying(false)
    // audio.addEventListener("play", setPlay,false);
    // audio.addEventListener("pause", setPause,false);

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    } 

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    }
  });
  useEffect(()=>{
    const audio = document.getElementById("audio");
    const setPlay=()=>setPlaying(true)
    const setPause=()=>setPlaying(false)
   !playing? audio.addEventListener("play", setPlay,false):
    audio.addEventListener("pause", setPause,false)
  },[playing])

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime
  }
}

export default useAudioPlayer;