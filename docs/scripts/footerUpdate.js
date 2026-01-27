import { subscribe , getState , setSong , setPlaying } from "../state/playerState.js";
import CONFIG from "../config/config.js";
import { subscribeEngine } from "../player/playerEngine.js";

const footerImage = document.getElementById('footer-image');
const footerSongName = document.getElementById('footer-text-cont');
const playPauseButton = document.getElementById('play-pause-button');
let playingSvgImage = document.getElementById('playing-svg-image');

function getSongById(songId) {
    return fetch(`${CONFIG.BASE_URL}/songs/${songId}`)
        .then((res) => { return res.json() });
}


subscribe((state) => {
    if (!state.currentSongId) return;

    getSongById(state.currentSongId).then((song) => {
        footerImage.src = song.coverUrl;
        footerSongName.textContent = song.title;
    })

    if(state.isPlaying){
        playPauseButton.src = 'images/musicButtons/pause.svg';
        playingSvgImage.classList.add('full-opacity');
    }
    else{
        playPauseButton.src = 'images/musicButtons/play.svg';
        playingSvgImage.classList.remove('full-opacity');
    }

})


const backwardPlayButton = document.getElementById('backward-play-button');
const forwardPlayButton = document.getElementById('forward-play-button');



backwardPlayButton.addEventListener('click' , ()=>{
    const state = getState();

    const len = (state.currentPlaylist).length;
    if(len == 0) return;

    const index = (state.currentPlaylist).findIndex((song)=>{
        return song.id === state.currentSongId
    })
    if(index == -1) return;

    const prevIndex = (index + (len-1))%len;

    setSong({songId : state.currentPlaylist[prevIndex].id , playlist : state.currentPlaylist});
})


forwardPlayButton.addEventListener('click' , ()=>{
    const state = getState();

    const len = (state.currentPlaylist).length;
    if(len == 0) return;

    const index = (state.currentPlaylist).findIndex((song)=>{
        return song.id === state.currentSongId
    })
    if(index == -1) return;

    const nextIndex = (index + 1)%len;

    setSong({songId : state.currentPlaylist[nextIndex].id , playlist : state.currentPlaylist});
})


playPauseButton.addEventListener('click' , ()=>{
    const state = getState();
    setPlaying(!(state.isPlaying));
})


const mainSlider = document.getElementById('main-slider');
const volumeSlider = document.getElementById('volume-slider');

subscribeEngine((event , payload)=>{
    
})