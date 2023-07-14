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
const userdata=[{
    userId:12,
    username:"dgdgd",
    password:192
}]

app.use(express.json())

app.post('/register', async(req,res)=>{
 try{
    const {username,password}=req.body;
    const hashedPass= await bcrypt.hash(password,10)
    res.status(201).send({
        success:true,
        status:"registered",
        name:username,
        password:hashedPass
    })
 }
 catch(error){
 res.status(401).json(error)
 }
})

app.post("/login", async (req,res)=>{

     try {
        const { username, password } = req.body;
        // useerdata ni hiyo collection kwa database
        // Finds the name of the user in the database
        const user =userdata.find({ name: username });
        // Displays message if user is not available;
        if (user.length === 0){ return res.json({ message: "User not found" })};
        
        const passwordMatch=(password)=>{
            if (password==user[0].password){
                return password
            }else{
            res.status(404).json({
                status:"Passwords dont match"
                
            })}
        }
        /* const passwordMatch = await bcrypt.compare(
          password,
          user[0].hashedPass
        ); */
    
        if (passwordMatch) {
            console.log(user)
          res.json({
            username,
            userId: user[0].userId,
          });
        }
      } catch (error) {
        res.json(error);
      } 
})