const Artist = require('../models/artist');
const mongoose = require('mongoose');
const Song = require('../models/song');

exports.getAllArtists = async(req , res)=>{
    try{
        const artists = await Artist.find({} , 'name image');
        res.json(artists);
    }catch(err){
        return res.status(500).json({msg : "error occured while fetching all the artists inside artistController.js" , error : err.message});
    }
}
