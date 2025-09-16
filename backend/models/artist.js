const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name : {type : String , required : true , index : true},
    slug : {type : String , required : true , unique : true},               // for user friendly URLs
    bio : String,
    images : {}

})