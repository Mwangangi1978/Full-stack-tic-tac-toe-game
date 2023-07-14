const mongoose = require('mongoose')
const eventLogger = require('../middleware/eventLogger')

async function connectDB(){
    try{
        await mongoose.connect(
            process.env.DATABASE_URI,
            
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
    }catch(error){
        eventLogger(error.name, error.message, 'errorLogs.txt')
    }
}

module.exports = connectDB