const Playlist = require('../models/playlist');

exports.getAllPlaylists = async(req , res)=>{
    try{
        const playlists = await Playlist.find({} , 'descriptionShort imageUrl');
        res.json(playlists);
    }catch(err){
        res.status(500).json({msg : "Error occured in playlistController.js while fetching playlists" , error : err.message});
    }
    
}