//Importing required modules
const express=require('express')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const cors =require('cors')
const schema = require ('./models/Schema.js')
const app=express()
const port=5173


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
      username,
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
app.post('/login',async(req,res)=>{
    try {
        const {username,password} = req.body
        const user = await User.find({username})
        if(user.length === 0){
          return res.status(404).send("User not found")
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user[0].hashedPassword
        )

        if(passwordMatch){
        res.status(200).json({
          status:"Logged In",
          username:username,
          password:password
        })
      }
      } catch (error) {
        res.json(error);
      }
})

//Start the server
app.listen(port,()=>{
  console.log(`Server is functional and running on port ${port}`)
})
app.listen(port,()=>{
  console.log(`Server is functional and running on port ${port}`)
})