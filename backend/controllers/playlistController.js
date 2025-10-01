const Playlist = require('../models/playlist');

exports.getAllPlaylists = async(req , res)=>{
    try{
        const playlists = await Playlist.find({} , 'descriptionShort imageUrl _id');
        res.json(playlists);
    }catch(err){
        res.status(500).json({msg : "Error occured in playlistController.js while fetching playlists" , error : err.message});
    }
}


exports.getPlaylistById = async(req , res)=>{
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){                           // just checking if the id if valid(what ih user sent 123 as id)
            return res.status(400).json({error : "Invalid playlist ID!"})
        }

        const currPlaylist = await Playlist.findById(id).populate('songs');       // equivalent to : Playlist.findOne({ _id: id });  findById is inbuilt mongoose function
        if(!currPlaylist) return res.status(404).json({error : "Playlist not found!"});
        res.json(currPlaylist);

    }catch(err){
        res.status(500).json({error : err.message});
    }
}