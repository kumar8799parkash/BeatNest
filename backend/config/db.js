const mongoose = require('mongoose');
//const dotenv = require('dotenv')              here we do not need this because it will be loaded in server.js(entry file) and you need dotenv in server.js

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI does not exists in .env file!");

    try {
        await mongoose.connect(uri);
        console.log("database connected");
    }
    catch (err) {
        console.log("mongoDB connection error!", err.message);
        process.exit(1);                    // this will immediately stop the Node.js process if the connection fails(server will not keep running and all kinds of requests will fail)
    }
};


module.exports = connectDB;