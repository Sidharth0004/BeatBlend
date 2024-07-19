import { useEffect, useRef, useState } from 'react';
import { createContext } from "react";
import { songsData } from '../assets/assets';
// import Player from "../components/Player";

 export const PlayerContext = createContext();

const  PlayerContextProvider = (props)=>{
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0])
    const [playerStatus, setPlayerStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime:{
            minute:0,
            second:0
        },
        totalTime:{
            minute:0,
            second:0
        }
        })

        const play = ()=>{
            audioRef.current.play()
            setPlayerStatus(true)
        }
        const pause = ()=>{
            audioRef.current.pause()
            setPlayerStatus(false)
        }
        const playWithId = async (id)=>{
            await  setTrack(songsData[id]);
            await   audioRef.current.play()
            setPlayerStatus(true)
        }
        useEffect(() => {
          setTimeout(() => {
            audioRef.current.ontimeupdate = ()=>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime) / Math.floor(audioRef.current.duration)) * 100 + "%"
                setTime({
                    currentTime:{
                        minute:Math.floor(audioRef.current.currentTime/60),
                        second:Math.floor(audioRef.current.currentTime%60),
                    },
                    totalTime:{
                        minute:Math.floor(audioRef.current.duration /60),
                        second:Math.floor(audioRef.current.duration %60),
                    }
                })
            }
          }, 1000);
        })
        

    const contextValue = {
     audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause ,
    playWithId  

    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
            </PlayerContext.Provider>
    )
}
export default PlayerContextProvider;