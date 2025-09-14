fetch('data/playlists.json')
  .then(res => res.json())
  .then(playlists => {


    const playlistItemCont = document.getElementById('playlist-item-cont');
    playlists.forEach((playlist, index) => {
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
      playlistItemDescCont.textContent = `${playlist.playlistDesc}`;

      playlistItem.appendChild(playlistItemImageCont);
      playlistItem.appendChild(playlistItemDescCont);

      playlistItemCont.appendChild(playlistItem);
    });

    const playlistItems = document.getElementsByClassName('playlist-item');
    Array.from(playlistItems).forEach(playList => {
      playList.addEventListener('click', () => {
        const index = playList.dataset.playlistIndex;
        // Load the playlist page
        window.history.pushState({}, '', `?playlistIndex=${index}`);
        /*
        📌 1. When a user selects a playlist (e.g., clicks on a playlist card), you do something like:
              window.history.pushState({}, '', `?playlistIndex=${index}`);
              📖 What does this line mean?

              window.history.pushState() is used to change the URL in the browser without reloading the page.
              It takes 3 arguments:
              state object: {} (you can store state info here, not needed in this case)
              title: '' (ignored by most browsers, safe to leave blank)
              URL: `?playlistIndex=${index}` → updates the URL to show something like ?playlistIndex=2


              So if your current URL is:  https://example.com/

              And index = 2, after calling this line it becomes:   https://example.com/?playlistIndex=2

              📌 2. Later (or on page load), you can extract this index using:

                    const urlParams = new URLSearchParams(window.location.search);
                    const index = parseInt(urlParams.get('playlistIndex'));
        
        */
        loadRightCont('playlistPage');
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