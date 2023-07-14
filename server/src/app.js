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
function checkUsername(username){
 return username===userdata[1].name
}
app.post('/login',async(req,res)=>{
    try {
        const {username,password} = req.body
        const {user}=await userdata.find(checkUsername)
        if(user==undefined){return res.status(404).send("User not found")}
        res.status(200).json({
          status:"Logged In",
          username:username,
          password:password
        })
      } catch (error) {
        res.json(error);
      }
})
app.listen(port,()=>{
  console.log(`Server is functional and running on port ${port}`)
})