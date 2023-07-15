/* //Importing required modules
const express=require('express')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const cors =require('cors')
const schema = require ('./models/Schema.js')
const app=express()
const port=8080


//Middlewares
//To enable Cross-Origin Resource Sharing
app.use(cors())
app.use(express.static('../docs/index.html'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//Defining Mongoose Schema
const userSchema = new mongoose.Schema(schema);
//Defining Mongoose model
const User = mongoose.model('User', userSchema);


//Connect to MongoDB
const mongoUri=`mongodb+srv://iamfrank:frankmunenenjari@cluster0.mgxurrc.mongodb.net/TechTitans?retryWrites=true&w=majority`
mongoose.connect(mongoUri, { useNewUrlParser: true}).then(() => console.log("DB Connected"))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})


//Signup route
app.post('/signup', async(req,res)=>{
 try{
    const {username,password}=req.body;
    const hashedPass= await bcrypt.hash(password,10)
    //Create a new user with hashed password
    const user = new User({
      username:username,
      password: hashedPass
    })
    //Save user to DB
    await user.save()

    res.status(201).json({
        status:"registered",
        name:username,
        password:hashedPass
    })
 }
 catch(error){
 res.status(401).json(error)
 }
} )

//Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    if (user) {
      // Compare the provided password with the hashed password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        res.status(200).json({
          status: 'Logged In',
          username: username
        });
      } else {
        res.status(401).send('Incorrect password');
      }
    } else {
      res.status(404).send('Username not found');
    }
  } catch (error) {
    res.json(error);
  }
});


//Start the server
app.listen(port,()=>{
  console.log(`Server is functional and running on port ${port}`)
})
 */
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/GameData'); // Import the tic-tac-toe game schema
const app = express();
const port = 8080;

// Middlewares
app.use(cors());
app.use(express.static('../docs/index.html'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
const mongoUri = `mongodb+srv://iamfrank:frankmunenenjari@cluster0.mgxurrc.mongodb.net/TechTitans?retryWrites=true&w=majority`;
mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(`DB connection error: ${err.message}`));

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new game document with playerX and playerO
    const game = new Game({
      playerX: username,
      playerO: '',
      moves: []
    });

    // Save the game to the database
    await game.save();

    // Create a new user with the hashed password and associated game
    const user = new User({
      username: username,
      password: hashedPass,
      game: game._id
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      status: 'registered',
      name: username,
      password: hashedPass
    });
  } catch (error) {
    res.status(401).json(error);
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username }).populate('game');

    if (user) {
      // Compare the provided password with the hashed password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        res.status(200).json({
          status: 'Logged In',
          username: username,
          game: user.game
        });
      } else {
        res.status(401).json({ Error: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ Error: 'Username not found' });
    }
  } catch (error) {
    res.json(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is functional and running on port ${port}`);
});
