import { subscribe, setSong } from "../state/playerState.js";
import CONFIG from "../config/config.js";

let sound = null;

function playNextSong(state) {
    const len = (state.currentPlaylist).length;
    if (len == 0) return;
    const index = (state.currentPlaylist).findIndex((song) => {
        return song.id === state.currentSongId;
    })
    if (index == -1) return;

    const nextIndex = (index + 1) % (len);
    const nextId = state.currentPlaylist[nextIndex].id
    setSong({ songId: nextId, playlist: state.currentPlaylist });
}


let engineListeners = new Set();

export function seek(time){
    if(sound){
        sound.currentTime = time;
    }
}

export function setVolume(volume){
    if(sound){
        sound.volume = volume;
    }
}

export function subscribeEngine(cb){
    engineListeners.add(cb);
}

function emit(event , payload={}){
    engineListeners.forEach((cb)=>{ cb(event , payload) });
}


subscribe((state) => {
    if (!state.currentSongId) return;

    getSongById(state.currentSongId).then((song) => {
        if (!sound || sound.src !== song.audioUrl) {
            if (sound) sound.pause();
            sound = new Audio(song.audioUrl);
            sound.play();
        }

        if (state.isPlaying) {
            sound.play();
        }
        else {
            sound.pause();
        }
        
        sound.addEventListener("loadedmetadata" , ()=>{
            emit('metadata', {duration : sound.duration});
        });

        sound.addEventListener("timeupdate" , ()=>{
            emit('timeupdate' , {currentTime : sound.currentTime})
        })

        sound.onended = () => {
            playNextSong(state);
        }
    })

})

function getSongById(songId) {

    return fetch(`${CONFIG.BASE_URL}/songs/${songId}`)
        .then((res) => { return res.json() });

}





// below are both correct and learning approaches
// FETCH RETURNS PROMISE
// .then() RETURNS PROMISE
// .then() ONLY RUNS AFTER THE PROMISE IS RESOLVED  ex : in   const promise2 = promise1.then((res) => {return res.json()});   it only runs after promise1 get resolved
// .then() takes a function(callback) that will be called later, when the promise resolves. 

/*
    const promise1 = fetch(`${CONFIG}/songs/${songId}`);
    const promise2 = promise1.then((res) => {return res.json()});
    return promise2;
*/

/* 
const song = fetch(`${CONFIG}/songs/${songId}`)
    .then((res) => { return res.json() })
return song;
*/