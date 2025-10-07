const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title : {type : String , required : true , index : true},
    slug : {type : String , index : true},
    durationSec : Number,
    artistName : String,
    playlistName : String,
    audioUrl : {type : String , required : true},
    coverUrl : {type : String},
    artists : [{type : mongoose.Schema.Types.ObjectId , ref : 'Artist' , index : true}],
    releaseDate : Date,
    genres : [String],              // like romantic, chappri , attitude, etc. etc.
    tags : [String]                 // like movie name, romantic etc. etc.
});

songSchema.index({title : 'text' , tags : 1 , genres : 1});
const Song = mongoose.model("Song" , songSchema);

module.exports = Song;


/*



// models/Song.js
const SongSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, index: true },
  durationSec: Number,
  // File storage: link to S3 / CDN
  audioUrl: { type: String, required: true },
  // A small preview URL for waveform/preview
  previewUrl: String,                                   It stores a URL (string) that points to a short audio preview or waveform image of the track

  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist', index: true }],
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', index: true },                   if i make a Album model in future
  releaseDate: Date,
  genres: [String], // or genreIds
  tags: [String],
  explicit: { type: Boolean, default: false },                                  // for explicit content(adult, offensive lang etc) filtering
  If the user has “Hide explicit content” enabled, you simply don’t show that song in search or playlists.


  // Denormalized fields used by UI for faster reads:
  primaryArtistName: String,
  coverUrl: String,
  // popularity counters
  playCount: { type: Number, default: 0, index: true },
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  metadata: { bitrate: Number, sampleRate: Number, codec: String }
});

// Indexes
SongSchema.index({ title: 'text', tags: 1, genres: 1 }); // text index for search (careful with fields)
SongSchema.index({ playCount: -1 }); // top played




*/