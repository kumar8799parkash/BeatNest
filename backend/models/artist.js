const mongoose = require('mongoose');
const Song = require('./song')

const artistSchema = new mongoose.Schema({
    name : {type : String , required : true , index : true},
    slug : {type : String , unique : true},               // for user friendly URLs
    descriptionLong : String,
    bio : String,
    //images : {avatar : String , cover : String},
    image : String,
    songs : [{type : mongoose.Schema.Types.ObjectId , ref : 'Song'}],
    genres : [String],                                                      // [] means it can have many genres(like pop , jazz etc.)
    createdAt : {type : Date , default : Date.now}
});

const Artist = mongoose.model("Artist" , artistSchema);

module.exports = Artist;