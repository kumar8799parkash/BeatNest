fetch(`data/playlists.json`)
    .then(res => res.json())
    .then(playlists => {
        const urlPrams = new URLSearchParams(window.location.search);
        const index = parseInt(urlPrams.get('playlistIndex'));

        if (isNaN(index)) return;

        const playlistPageHeadingImage = document.getElementById('playlistPage-heading-image');
        const imageSource = playlistPageHeadingImage.setAttribute('src' , `songs/${playlists[index].folder}/cover.jpeg`);

        const playlistPageHeadingText = document.getElementById('playlistPage-heading-text');
        playlistPageHeadingText.textContent = `${playlists[index].name}`;

        const playlistPageHeadingDesc = document.getElementById('playlistPage-heading-desc');
        playlistPageHeadingDesc.textContent = `${playlists[index].description}`;


        const songItemsCont = document.getElementById('song-items-cont');
        if (!songItemsCont) {
            console.warn('song-items-cont not found!');
            return;
        }

        // songItemsCont.innerHTML = '';  clearing the existing HTML

        const songsArray = playlists[index].songs;
        songsArray.forEach((song, songIndex) => {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.dataset.dataAudio = `songs/${playlists[index].folder}/${songsArray[songIndex].file}`;

            const songNumberCont = document.createElement('div');
            songNumberCont.classList.add('song-number-cont');
            songNumberCont.textContent = `${songIndex}`;

            const songCoverCont = document.createElement('div');
            songCoverCont.classList.add('song-cover-cont');
            const songCoverImage = document.createElement('img');
            songCoverImage.src = `songs/${playlists[index].folder}/${songsArray[songIndex].songCover}`;
            songCoverCont.appendChild(songCoverImage);

            const songNameCont = document.createElement('div');
            songNameCont.classList.add('song-name-cont');
            songNameCont.textContent = `${songsArray[songIndex].title}`

            const songDurationCont = document.createElement('div');
            songDurationCont.classList.add('song-duration-cont');
            songDurationCont.textContent = '3:50';

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
    });