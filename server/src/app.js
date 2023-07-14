import express from 'express'
import bcrypt from 'bcrypt'
const app=express()
const port=8080

app.listen(port,()=>{
    console.log(`Server is functional and running on port ${port}`)
})
// The frontend code bridge should be added here ie:
/* app.use(express.static('<directory of client folder>'))
app.use(express.urlencoded({extended:false})) */


app.use(express.json())

app.post('/register', async(req,res)=>{
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

app.post('/login',async(req,res)=>{
    try {
        const { username, password } = req.body;
        // useerdata ni hiyo collection kwa database
        const { users } = await userdata.find({ name: username });
        if (users.length === 0){ return res.json({ message: "User not found" })};
    
        
        const passwordMatch = await bcrypt.compare(
          password,
          users[0].hashedPassword
        );
    
        if (passwordMatch) {
          res.json({
            username,
          })
        }
      } catch (error) {
        res.json(error);
      }
})