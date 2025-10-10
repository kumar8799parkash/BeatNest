const express = require('express');
const connectDB = require('./config/db');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const crypto = require('crypto');
const cors = require('cors');                // CORS = Cross-Origin Resource Sharing. to specify frontend(3000 here) who can send requests
const jwt = require('jsonwebtoken');         // To create login session tokens
const bcrypt = require('bcrypt');            // bcrypt is a password-hashing function designed for securely storing passwords.
const dotenv = require('dotenv');            // Hide secrets (DB passwords, API keys, JWT secrets).
//const mongoose = require('mongoose');       // Mongoose allows you to define a schema, mongoDB is itself schema-less(no defined structure) although it is not needed here as are just using the schemas(like User)in server.js , but we are not defining them here and also we are not using any mongoose function here
const app = express();
const port = 5000;
const playlistRoutes = require('./routes/playlistRoutes');
const artistRoutes = require('./routes/artistRoutes');

//   app.use(cors());      to allow all the origins(even hackers can send request here)


app.use(cors({ origin: "*" }));
/* app.use(cors({
  origin: "*",
  methods: ['GET', 'POST'],
  allowedHeaders: ["Content-Type", "Authorization"]
})) */

dotenv.config();                            // This line reads your .env file and adds the variables inside it to process.env
// So after dotenv.config(), you can use process.env.MY_VARIABLE anywhere in your app.

app.use(express.json());                     // Middleware to parse JSON data from frontend and store it in req.body

app.use(express.static('public'));                                    // eg Url : http://localhost:3000/images/pic.jpg
//app.use('/static', express.static('public'));                       // it's same as above : eg Url : http://localhost:3000/static/images/pic.jpg
//app.use('/images' , express.static('public/images'));               // if we want to serve images only

app.use('/playlists' , playlistRoutes);
app.use('/artists' , artistRoutes);

connectDB();




app.post('/signup', async (req, res) => {              // remember that here we have declared it as a ASYNC function so we CAN USE AWAIT

  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists! Go and Log-in" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);          // hashing the password

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      email: email,
      password: hashedPassword,
      verified: false,
      verificationToken: verificationToken,
      verificationTokenExpiry: Date.now() + 60 * 60 * 1000    // verification token valid for 1 HOUR only
    })

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const verificationURL = `http://192.168.1.10:5000/verify/${verificationToken}`;
    await transporter.sendMail({
      from: `"BeatNest" <${process.env.EMAIL_USER}>`,          //SYNTAX : "Display Name" <email@domain.com>  (Display name displayed in inbox)
      to: email,
      subject: "Verify your BeatNest account",
      html: `<p>Click   <a href="${verificationURL}">here</a>   to verify your email</p>`
    });

    res.json({ msg: "Sign up successful! please check your Gmail to verify." });


    //const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    //res.json({ token, user: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ error: "Error during signUp!", details: err.message })
  }

});






app.get('/verify/:token', async (req, res) => {

  try {
    const token = req.params.token;                         // destructuring(also okay) : const {token} = req.params;
                                                            // for multiple params : const { userId, postId } = req.params;
    const user = await User.findOne({
      verificationToken : token,
      verificationTokenExpiry : {$gt : Date.now() }         // find documents where verificationTokenExpiry time is greater than current time, this means that the token is not expired yet
    });

    if (!user) {
      return res.status(400).json({ error: "your time is expired, signUp again!" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.send("Email verified successfully! now you can log in");
  }catch(err){
    res.status(500).json({msg : "Error while user verification!" , details : err.message});
  }

})







app.post('/login', async (req, res) => {                 // remember that here we have declared it as a ASYNC function so we CAN USE AWAIT

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist!" })

    
    if(!user.verified){
      return res.status(401).json({msg : "Please verify your email before logging in!"});
    }

    // if user exists the check if the current password(password) is equal to the user.password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token,
      user: { id: user._id, email: user.email } 
    });

  } catch (err) {
    res.status(500).json({ error: "Error in login logic!",
    details: err.message
  });
  }

});



app.get('/', (req, res) => {                              // req and res are built-in objects created by Express for every request.(refer notes for more)
  res.send('Hello World! he he!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})