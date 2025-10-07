function initLeftCont() {
    fetch(`http://localhost:5000/artists`)
        .then(res => res.json())
        .then(artistPlaylists => {
            const leftMainCont = document.getElementById('left-main-cont');
            artistPlaylists.forEach((artistPlaylist, index) => {
                const artistCont = document.createElement('div');
                artistCont.classList.add('artist-cont');
                artistCont.dataset.artistId = artistPlaylist._id;

                const artistImageCont = document.createElement('div');
                artistImageCont.classList.add('artist-image-cont');

                const artistImage = document.createElement('img');
                artistImage.src = artistPlaylist.image;

                const artistDetailCont = document.createElement('div');
                artistDetailCont.classList.add('artist-detail-cont');

                const nameCont = document.createElement('div');
                nameCont.classList.add('name-cont');
                nameCont.textContent = artistPlaylist.name;

                const professionCont = document.createElement('div');
                professionCont.classList.add('profession-cont');
                professionCont.textContent = 'Artist';

                const visualizerCont = document.createElement('div');
                visualizerCont.classList.add('visualizer-cont');

                const speakerImage = document.createElement('img');
                speakerImage.src = `svgs/speaker.svg`;

                artistImageCont.appendChild(artistImage);
                artistDetailCont.appendChild(nameCont);
                artistDetailCont.appendChild(professionCont);
                visualizerCont.appendChild(speakerImage);

                artistCont.appendChild(artistImageCont);
                artistCont.appendChild(artistDetailCont);
                artistCont.appendChild(visualizerCont);

                leftMainCont.appendChild(artistCont);

            });

            artistConts = document.getElementsByClassName('artist-cont');
            artistContsArray = Array.from(artistConts);
            artistContsArray.forEach((artistCont, index) => {
                artistCont.addEventListener('click', () => {
                    const Id = artistCont.dataset.artistId;
                    window.history.pushState({}, '', `?artistId=${Id}`);
                    loadRightCont('artistPage');
                })
            })

        })
}
