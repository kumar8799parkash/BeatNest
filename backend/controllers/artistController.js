const Artist = require('../models/artist');
const mongoose = require('mongoose');
const Song = require('../models/song');

exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find({});
        res.json(artists);
    } catch (err) {
        return res.status(500).json({ msg: "error occured while fetching all the artists inside artistController.js", error: err.message });
    }
}

exports.getArtistById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid artist Id!" });
        }
        const currArtist = await Artist.findById(id).populate('songs');
        if (!currArtist) {
            return res.status(404).json({ error: "Artist not found" });
        }
        res.json(currArtist);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}