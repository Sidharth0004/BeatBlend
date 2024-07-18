import { useRef } from 'react';
import { createContext } from "react";
// import Player from "../components/Player";

 export const PlayerContext = createContext();

const  PlayerContextProvider = (props)=>{
    const audioRef = useRef(null);
    const contextValue = {
     audioRef
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
            </PlayerContext.Provider>
    )
}
export default PlayerContextProvider;