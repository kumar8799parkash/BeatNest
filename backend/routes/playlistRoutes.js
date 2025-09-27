const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController')

router.get('/' , playlistController.getAllPlaylists);

module.exports = router;


/*
This is the code for million playlists (here page=1 and limit=20 are default values if not present in URL, otherwise URL's values will be taken)
CONCEPT : cannot send million playlists at once (will lead to bandwidth wastage), it will take too much time to load(bad user experience)
          thatswhy playlists are sent in small chunks(like group of 20 playlists here means only 20 playlists will be sent at once)

          How pagination works : 
          Case: page=1&limit=20
            pageNum = 1, limitNum = 20
            skip = (1 - 1) * 20 = 0
            Query returns playlists 0–19 (first 20 playlists)

          Case: page=2&limit=20
            pageNum = 2, limitNum = 20
            skip = (2 - 1) * 20 = 20
            Query returns playlists 20–39 (next 20 playlists)

          Case: page=50&limit=20
            pageNum = 50, limitNum = 20
            skip = (50 - 1) * 20 = 980
            Query returns playlists 980–999 (last 20 playlists)

exports.getAllPlaylists = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query; // default pagination
    const playlists = await Playlist.find()
      .populate('songs', 'title artist duration') // show limited song fields
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

*/

