let state = {
    currentSongId : localStorage.getItem('currentSongId'),
    currentPlaylist : JSON.parse(localStorage.getItem('currentPlaylist')) || [],
    isPlaying : false
};

const listeners = new Set();

export function getState(){
    return {...state};
}

export function setPlaying(isPlaying){
    state.isPlaying = isPlaying;
    notify();
}

export function setSong({songId , playlist}){
    state.currentSongId = songId;
    state.currentPlaylist = playlist;
    state.isPlaying = true;

    localStorage.setItem('currentSongId' , songId);
    localStorage.setItem('currentPlaylist' , JSON.stringify(playlist));

    notify();
}

export function subscribe(callback){
    listeners.add(callback);
    callback(state);            // instant sync
}

function notify(){
    listeners.forEach(cb => {
        cb({...state});
    });
}