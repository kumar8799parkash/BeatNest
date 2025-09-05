const express = require('express')
const cors = require('cors')                // CORS = Cross-Origin Resource Sharing. to specify frontend(3000 here) who can send requests
const jwt = require('jsonwebtoken')         // To create login session tokens
const bcrypt = require('bcrypt')            // bcrypt is a password-hashing function designed for securely storing passwords.
const dotenv = require('dotenv')            // Hide secrets (DB passwords, API keys, JWT secrets).
const mongoose = require('mongoose')        // Mongoose allows you to define a schema, mongoDB is itself schema-less(no defined structure)
const app = express()
const port = 5000

//   app.use(cors());      to allow all the origins(even hackers can send request here)

app.use(cors({
  origin : ["http://127.0.0.1:3000" , "http://localhost:3000"],
  methods : ['GET' , 'POST'],
  allowedHeaders : ["Content-Type", "Authorization"]
}))

dotenv.config();                            // This line reads your .env file and adds the variables inside it to process.env
// So after dotenv.config(), you can use process.env.MY_VARIABLE anywhere in your app.

app.use(express.json())                     // Middleware to parse JSON data from frontend and store it in req.body


async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI does not exists in .env file!");

  try {
    await mongoose.connect(uri);
    console.log("database connected");
  }
  catch (err) {
    console.log("mongoDB connection error!", err.message);
  }
}

connectDB();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String }
});
const User = mongoose.model("User", userSchema);

app.post('/signup', async (req, res) => {              // remember that here we have declared it as a ASYNC function so we CAN USE AWAIT

  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists! Go and Log-in" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);          // hashing the password
    const newUser = new User({ email: email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: newUser._id, email: newUser.email } });
    } catch (err) {
    res.status(500).json({ error: "Error during signUp!" , details: err.message })
  }

});


app.post('/login', async (req, res) => {                 // remember that here we have declared it as a ASYNC function so we CAN USE AWAIT

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist!" })

    // if user exists the check if the current password(password) is equal to the user.password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, email: user.email } });
  }catch(err){
    res.status(500).json({error : "Error in login logic!" , details: err.message})
  }

})

app.get('/', (req, res) => {                              // req and res are built-in objects created by Express for every request.(refer notes for more)
  res.send('Hello World! he he!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})