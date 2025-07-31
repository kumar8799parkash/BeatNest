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