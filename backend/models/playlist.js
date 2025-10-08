const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title : {type : String , required : true , index : true},
    descriptionShort : String,
    descriptionLong : String,
    songs : [{type : mongoose.Schema.Types.ObjectId , ref : 'Song'}],
    imageUrl : String,
    tags : [String],
    createdAt : {type : Date , default : Date.now}
},{
  timestamps : true         // auto adds createdAt and updatedAt fields on each playlist
})

playlistSchema.index({title : 'text'});
playlistSchema.index({tags : 'text'});

const Playlist = mongoose.model('Playlist' , playlistSchema);
module.exports = Playlist;



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