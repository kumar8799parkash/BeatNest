fetch('data/playlists.json')
.then(res=>res.json())
.then(playlists=>{
    const playlistItemCont = document.getElementById('playlist-item-cont');

    playlists.forEach(playlist => {
        const playlistItem = document.createElement('div');                      // playlistItem = div in CHATGPT
        playlistItem.classList.add('playlist-item');

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