const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title : {type : String , required : true , index : true},
    description : String
})