const express = require('express') 
const bcrypt = require('bcrypt')            // bcrypt is a password-hashing function designed for securely storing passwords.
const dotenv = require('dotenv')            // Hide secrets (DB passwords, API keys, JWT secrets).
const mongoose = require('mongoose')        // Mongoose allows you to define a schema, mongoDB is itself schema-less(no defined structure)
const app = express()
const port = 3000

dotenv.config();                            // This line reads your .env file and adds the variables inside it to process.env
                                            // So after dotenv.config(), you can use process.env.MY_VARIABLE anywhere in your app.

app.use(express.json())                     // Middleware to parse JSON data from frontend


async function connectDB(){
    const uri = process.env.MONGO_URI;
    if(!uri) throw new Error("MONGO_URI does not exists in secrets.env file!");

    try{
        await mongoose.connect(uri);
        console.log("database connected");
    }
    catch(err){
        console.log("mongoDB connection error!" , err.message);
    }
    
}

connectDB();

const userSchema = new mongoose.Schema({
  email : {type:String , required:true , unique:true},
  password : {type:String},
  googleId : {type:String}
});
const User = mongoose.model("User" , userSchema);

app.post('/signup' , async (req , res)=>{
  const {email , password} = req.body;
  const existingUser = await User.findOne({email});
  if(existingUser){
    return  res.status(400).json({msg : "User already exists!"});
  }

  const hashedPassword = await bcrypt.hash(password , 10);          // hashing the password
  const newUser = new User({email , password : hashedPassword});
  await newUser.save();


})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
