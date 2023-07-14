const express=require('express')
const bcrypt=require('bcrypt')
const cors=require('cors')
const {gamedata,userdata}=require("../data")
const app=express()
const port=8080




app.use(express.json())
app.use(cors())
app.post('/signup', async(req,res)=>{
 try{
    const {username,password}=req.body;
    const hashedPass= await bcrypt.hash(password,10)
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
// THIS IS A LOCAL FUNCTION THAT CHECKS USERNAME IS AVALABLE IN DATA.JS FILE 
// THIS WILL BE REPLACED WHEN THE EXTERNAL DB IS CONNECTED 

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    let userFound = false; // Flag variable to track if a matching username is found

    for (let i = 0; i < userdata.length; i++) {
      if (username === userdata[i].name) {
        userFound = true;
        break; // Exit the loop once a match is found
      }
    }

    if (userFound) {
      res.status(404).send("Username not found");
    }else{
      res.status(200).json({
        status: "Logged In",
        username: username,
        password: password
      })
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(port,()=>{
  console.log(`Server is functional and running on port ${port}`)
})