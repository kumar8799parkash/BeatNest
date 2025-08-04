

fetch('data/playlists.json')
.then(res=>res.json())
.then(playlists=>{


    function loadPlayListPage(index){
        const songItemsCont = document.getElementById('song-items-cont');
        const songsArray = playlists[index].songs;
        songsArray.forEach((song , songIndex)=>{
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            
            const songNumberCont = document.createElement('div');
            songNumberCont.classList.add('song-number-cont');
            songNumberCont.textContent = `${songIndex}`;

            const songCoverCont = document.createElement('div');
            songCoverCont.classList.add('song-cover-cont');
            const songCoverImage = document.createElement('img');
            songCoverImage.src = 

            const songNameCont = document.createElement('div');
            songNameCont.classList.add('song-name-cont');

            const songDurationCont = document.createElement('div');
            songDurationCont.classList.add('song-duration-cont');

            const songAddCont = document.createElement('div');
            songAddCont.classList.add('song-add-cont');
            songAddCont.textContent = '+';

            songItem.appendChild(songNumberCont);
            songItem.appendChild(songCoverCont);
            songItem.appendChild(songNameCont);
            songItem.appendChild(songDurationCont);
            songItem.appendChild(songAddCont);

            songItemsCont.appendChild(songItem);
        })
    }


    const playlistItemCont = document.getElementById('playlist-item-cont');
    playlists.forEach((playlist,index) => {
        const playlistItem = document.createElement('div');                      // playlistItem = div in CHATGPT
        playlistItem.classList.add('playlist-item');

        playlistItem.dataset.playlistIndex = index;

        const playlistItemImageCont = document.createElement('div');
        playlistItemImageCont.classList.add('playlist-item-image-cont');
        const image = document.createElement('img');
        image.src = `${playlist.cover}`;
        playlistItemImageCont.appendChild(image);

        const playlistItemDescCont = document.createElement('div');
        playlistItemDescCont.classList.add('playlist-item-desc-cont');
        playlistItemDescCont.textContent = `${playlist.name}`;

        playlistItem.appendChild(playlistItemImageCont);
        playlistItem.appendChild(playlistItemDescCont);

        playlistItemCont.appendChild(playlistItem);
    });

    const playlistItems = document.getElementsByClassName('playlist-item');
    Array.from(playlistItems).forEach(playList => {
        playList.addEventListener('click' , ()=>{
            const index = playList.dataset.playlistIndex;
            loadRightCont('playlistPage');
            loadPlayListPage(index);
        })
    });
})




/*
Array.from(document.getElementsByClassName('playlist-item')).forEach(playlistItem => {
    playlistItem.addEventListener('click', () => {
        const currTargetPage = playlistItem.getAttribute('data-targetPage');
        loadRightCont(currTargetPage);
    })
});

Array.from(document.getElementsByClassName('recents-item')).forEach(recentItem => {
    recentItem.addEventListener('click', () => {
        const currTargetPage = recentItem.getAttribute('data-targetPage');
        loadRightCont(currTargetPage);
    })
});
*/


/*


document.addEventListener("DOMContentLoaded", () => {
  loadPage("home", () => {
    fetch('data/playlists.json')
      .then(res => res.json())
      .then(playlists => {
        const container = document.getElementById("playlists-container");
        playlists.forEach((playlist, index) => {
          const div = document.createElement("div");
          div.className = "playlist";
          div.innerHTML = `
            <img src="${playlist.cover}" />
            <h3>${playlist.name}</h3>
            <button data-index="${index}">Open</button>
          `;
          container.appendChild(div);
        });

        // Add click handler
        container.querySelectorAll("button").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            localStorage.setItem("playlistIndex", index); // Pass data
            loadPage("playlist", () => {
              initPlaylistPage(); // Run logic after loading page
            });
          });
        });
      });
  });
});



*/