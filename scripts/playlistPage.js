const url = new URL(window.location.href);
const id = url.searchParams.get('playlistId');
if(!id){
    alert('no playlist found in the URL!');
    return;
}

fetch(`http://localhost:5000/playlists/${id}`)                    // `data/playlists.json`
    .then(res => res.json())
    .then(playlist => {
        console.log(playlist);

        /* const urlPrams = new URLSearchParams(window.location.search);
        const index = parseInt(urlPrams.get('playlistIndex'));
        if (isNaN(index)) return; */

        const playlistPageHeadingImage = document.getElementById('playlistPage-heading-image');
        playlistPageHeadingImage.src = playlist.imageUrl;

        const playlistPageHeadingText = document.getElementById('playlistPage-heading-text');
        playlistPageHeadingText.textContent = playlist.title;

        const playlistPageHeadingDesc = document.getElementById('playlistPage-heading-desc');
        playlistPageHeadingDesc.textContent = playlist.descriptionShort;


        const songItemsCont = document.getElementById('song-items-cont');
        if (!songItemsCont) {
            console.warn('song-items-cont not found!');
            return;
        }

        // songItemsCont.innerHTML = '';  clearing the existing HTML

        const songsArray = playlist.songs;
        songsArray.forEach((song, songIndex) => {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.dataset.audio = song.audioUrl;

            songItem.dataset.id = song._id;

            const songNumberCont = document.createElement('div');
            songNumberCont.classList.add('song-number-cont');
            songNumberCont.textContent = `${songIndex+1}`;

            const songCoverCont = document.createElement('div');
            songCoverCont.classList.add('song-cover-cont');
            const songCoverImage = document.createElement('img');
            songCoverImage.src = song.coverUrl;
            songCoverCont.appendChild(songCoverImage);

            const songNameCont = document.createElement('div');
            songNameCont.classList.add('song-name-cont');
            songNameCont.textContent = song.title;



            const songDurationCont = document.createElement('div');
            songDurationCont.classList.add('song-duration-cont');

            const currSongDurationInSeconds = song.durationSec;
            songDurationCont.textContent = formatTime(currSongDurationInSeconds);


            /* const currAudio = document.createElement('audio');
            currAudio.src = song.audioUrl;
            currAudio.preload = "metadata";

            currAudio.addEventListener('loadedmetadata' , ()=>{
                const currDuration = currAudio.duration;
                songDurationCont.textContent = formatTime(currDuration);
            })*/

            function formatTime(seconds){
                const minutes = Math.floor(seconds/60);
                const secs = Math.floor(seconds%60);
                return `${minutes}:${secs.toString().padStart(2 , '0')}`
            }



            const songAddCont = document.createElement('div');
            songAddCont.classList.add('song-add-cont');
            songAddCont.textContent = '+';

            songItem.appendChild(songNumberCont);
            songItem.appendChild(songCoverCont);
            songItem.appendChild(songNameCont);
            songItem.appendChild(songDurationCont);
            songItem.appendChild(songAddCont);

            songItemsCont.appendChild(songItem);
        });


        // playing songs
        const songItems = document.getElementsByClassName('song-item');
        const songItemsArray = Array.from(songItems);
        songItemsArray.forEach((songItem , songIndex)=>{
            songItem.addEventListener('click' ,()=>{

                songItem.classList.add('active-song-bg');
                const audioSource = songItem.dataset.audio;
                playSong(songItem , audioSource);
            });

            if(songItem.dataset.id === currentSongId){
                songItem.classList.add('active-song-bg');
            }
        })
    });