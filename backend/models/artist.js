const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name : {type : String , required : true , index : true},
    slug : {type : String , unique : true},               // for user friendly URLs
    bio : String,
    images : {avatar : String , cover : String},
    genres : [String],                                                      // [] means it can have many genres(like pop , jazz etc.)
    createdAt : {type : Date , default : Date.now}
});

const Artist = mongoose.model("Artist" , artistSchema);

module.exports = Artist;