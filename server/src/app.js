import express from 'express'
const app=express()
const port=8080

app.listen(port,()=>{
    console.log(`Server is functional and running on port ${port}`)
})
// The frontend code bridge should be added here ie:
/* app.use(express.static('<directory of client folder>'))
app.use(express.urlencoded({extended:false})) */


app.use(express.json())
