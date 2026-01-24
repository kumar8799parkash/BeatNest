import initArtistPage from "./artistPage.js"
import initHomePage from "./home.js"
import initLeftCont from "./leftCont.js"
import initPlaylistPage from "./playlistPage.js"
import { subscribe } from "../state/playerState.js"
import '../player/playerEngine.js'


const bellCont = document.getElementById("bell-cont");
const signUpButton = document.getElementById("sign-up-button");
const logInButton = document.getElementById("log-in-button");
const outerProfileCont = document.getElementById("outer-profile-cont");

window.addEventListener("load", () => {
    const isUserExists = localStorage.getItem("beatNestToken");

    if (isUserExists) {
        window.location.href = "./mainPage.html";
    }
})


signUpButton.addEventListener('click', () => {
    window.location.href = 'html/signUpPage.html'
})

logInButton.addEventListener('click', () => {
    window.location.href = 'html/loginPage.html'
})


function loadRightCont(targetPage) {
    fetch(`html/${targetPage}.html`)
        .then(response => {
            return response.text();                         // .text() converts to String
        })
        .then(data => {
            const rightCont = document.getElementById('right-cont');
            rightCont.innerHTML = '';
            rightCont.innerHTML = data;

            if (targetPage == 'home') initHomePage();
            else if (targetPage == 'playlistPage') initPlaylistPage();
            else if (targetPage == 'artistPage') initArtistPage();

            /* const oldScript = document.getElementById('right-dynamic-script');
            if (oldScript) oldScript.remove();

            const pageScript = document.createElement('script');
            pageScript.src = `scripts/${targetPage}.js`;
            pageScript.defer = true;        //Delays execution until HTML is parsed. Improves performance.(optional)
            pageScript.id = 'right-dynamic-script';  // Allows you to find/remove/replace this script easily in the DOM.(optional) */

            /*
            What it does: Sets the id attribute of the <script> element to 'dynamic-script'.
            Why it's used:
            To uniquely identify the script tag

            const oldScript = document.getElementById('dynamic-script');
            if (oldScript) {
                oldScript.remove(); // remove the previously loaded script
            }
            */

            /* document.body.appendChild(pageScript); */
        })
}


function loadLeftCont(targetPage) {
    fetch(`html/${targetPage}.html`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById('left-cont').innerHTML = data;

            if (targetPage == 'leftCont') initLeftCont();


            /* const oldScript = document.getElementById('left-dynamic-script');
            if (oldScript) oldScript.remove();

            const pageScript = document.createElement('script');
            pageScript.src = `scripts/${targetPage}.js`;
            pageScript.defer = true;        //Delays execution until HTML is parsed. Improves performance.(optional)
            pageScript.id = 'left-dynamic-script';  // 	Allows you to find/remove/replace this script easily in the DOM.(optional)

            document.body.appendChild(pageScript); */
        })
}


window.addEventListener("load", () => {
    loadRightCont('home');
    loadLeftCont('leftCont');
})


/*
URL(uniform resource locator) looks like : protocol://hostname:port/pathname?queryString#hash
*/
const homeLogoCont = document.getElementById('home-logo-cont');
homeLogoCont.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('playlistId');
    url.searchParams.delete('artistId');
    window.history.pushState({}, '', url.pathname, url.search);
    loadRightCont('home');
})

/*
When we are on home.js, and when user clicks on a particular playlist, this playlist's id get added to the url. and page changes to playlistPage.js(code is inside home.js)
now we want that when user clicks on the backward button, then page should change to home.js again and when clicks on forward button, then page should change to that particular playlist page again

to do this 'popstate' eventListener comes into play, 'popstate' triggers when:
        You press the Back button.
        You press the Forward button.
        You call history.back(), history.forward(), or history.go(n).
**** it does not triggers on history.pushState() and history.replaceState().
*/

window.addEventListener('popstate', () => {
    const url = new URL(window.location.href);
    const playlistId = url.searchParams.get('playlistId');
    const artistId = url.searchParams.get('artistId');

    if (playlistId) {
        loadRightCont('playlistPage');
    }
    else if (artistId) {
        loadRightCont('artistPage');
    }
    else {
        loadRightCont('home');
    }
})

/* artistCont = document.getElementsByClassName('artist-cont');
Array.from(artistCont).forEach((artist, index) => {
    artist.addEventListener('click', () => {
        window.history.pushState({}, '', `?artistIndex=${index}`);
        loadRightCont('artistPage');
    })
}) */

const footerImage = document.getElementById('footer-image');
const footerSongName = document.getElementById('footer-text-cont');
const mainSlider = document.getElementById('main-slider');
const volumeSlider = document.getElementById('volume-slider');
const backwardPlayButton = document.getElementById('backward-play-button');
const forwardPlayButton = document.getElementById('forward-play-button');
const playPauseButton = document.getElementById('play-pause-button');
let playingSvgImage = document.getElementById('playing-svg-image');





let currentSound = null;
let currentSongItem = null;
let currentSongId = localStorage.getItem('currentSongId') || null;
let currentSongImageSource = localStorage.getItem('currentSongImageSource') || null;
let currentSongName = localStorage.getItem('currentSongName') || null;


if (currentSongImageSource) {
    footerImage.src = currentSongImageSource;
}

if (currentSongName) {
    footerSongName.textContent = currentSongName;
}


function updateSliderSmoothly() {
    if (currentSound && !currentSound.paused) {
        mainSlider.value = currentSound.currentTime;
        requestAnimationFrame(updateSliderSmoothly);
    }
}


function playSong(songItem, audioSource) {

    if (currentSound) {
        currentSound.pause();
        currentSound = null;
    }

    document.querySelectorAll('.active-song-bg').forEach(el => {
        el.classList.remove('active-song-bg');
    })

    currentSongId = songItem.dataset.id;
    localStorage.setItem('currentSongId', currentSongId);

    const songImage = songItem.querySelector('.song-cover-cont img').src;
    localStorage.setItem('currentSongImageSource', songImage);
    footerImage.src = songImage;

    const songName = songItem.querySelector('.song-name-cont').textContent;
    localStorage.setItem('currentSongName', songName);
    footerSongName.textContent = songName;

    currentSongItem = songItem;
    currentSongItem.classList.add("active-song-bg");


    const playlistContainer = songItem.closest('.song-items-cont');
    currentPlaylist = Array.from(playlistContainer.querySelectorAll('.song-item'));


    currentSound = new Audio(audioSource);
    currentSound.play();

    currentSound.addEventListener('playing', () => {
        playingSvgImage.classList.add('full-opacity');
        playPauseButton.src = "images/musicButtons/pause.svg";
    })


    currentSound.addEventListener('ended', () => {
        nextPlay();
        playingSvgImage.classList.remove('full-opacity');
        playPauseButton.src = "images/musicButtons/play.svg";
    })


    currentSound.addEventListener('loadedmetadata', () => {
        mainSlider.max = currentSound.duration;
    })

    mainSlider.addEventListener('input', () => {
        currentSound.currentTime = mainSlider.value;
    })

    volumeSlider.addEventListener('input', () => {
        if (currentSound) {
            currentSound.volume = volumeSlider.value / 100;
        }
    })

    currentSound.addEventListener('loadedmetadata', () => {
        mainSlider.max = currentSound.duration;
        requestAnimationFrame(updateSliderSmoothly);
    })

}

playPauseButton.addEventListener('click', () => {
    if (currentSound && !currentSound.paused && !currentSound.ended) {
        currentSound.pause();
        playPauseButton.src = "images/musicButtons/play.svg";
        playingSvgImage.classList.remove('full-opacity');
    }
    else if (currentSound) {
        currentSound.play();
        playPauseButton.src = "images/musicButtons/pause.svg";
        playingSvgImage.classList.add('full-opacity');
        requestAnimationFrame(updateSliderSmoothly);
    }
})


function nextPlay() {
    let len = currentPlaylist.length;
    let currentIndex = currentPlaylist.findIndex(song => song.dataset.id === currentSongItem.dataset.id);
    nextIndex = (currentIndex + 1) % len;
    let nextSong = currentPlaylist[nextIndex];
    let nextAudioSrc = nextSong.dataset.audio;
    playSong(nextSong, nextAudioSrc, currentPlaylist);
}


function previousPlay() {
    let len = currentPlaylist.length;
    let currentIndex = currentPlaylist.findIndex(song => song.dataset.id === currentSongItem.dataset.id);
    prevIndex = (currentIndex - 1 + len) % len;
    let prevSong = currentPlaylist[prevIndex];
    let prevAudioSrc = prevSong.dataset.audio;
    playSong(prevSong, prevAudioSrc, currentPlaylist);
}


forwardPlayButton.addEventListener('click', () => { nextPlay() });
backwardPlayButton.addEventListener('click', () => { previousPlay() });


export {loadLeftCont , loadRightCont , playSong} ;