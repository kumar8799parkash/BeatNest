import { subscribe , setPlaying } from "../state/playerState";

let audio = null;

subscribe((state)=>{
    if(!state.currentSongId) return;

    const song = getSongById(state.currentSongId);

    if(!audio || audio.src !== song.audio){

    }

})