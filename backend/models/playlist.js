const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title : {type : String , required : true , index : true},
    description : String,
    songs : [{type : mongoose.Schema.Types.ObjectId , ref : 'Song'}],
    imageUrl : String,
    tags : [{String}],
    createdAt : {type : Date , default : Date.now}
})





/*

// models/Playlist.js
const PlaylistSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: String,
  ownerType: { type: String, enum: ['system','user','curator'], default: 'user' },
  ownerId: { type: mongoose.Schema.Types.ObjectId }, // if user playlist, a userId
  isPublic: { type: Boolean, default: true },
  // for small playlists: store songs array (fast reads)
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  // metadata:
  imageUrl: String,
  tags: [String],
  followersCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});


*/