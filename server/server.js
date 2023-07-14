const express = require('express')
const eventLogger = require('./middleware/eventLogger')
const {Server} = require('socket.io')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/connectDB')
const path = require('path')

const app = express()
dotenv.config()
connectDB()

const port = process.env.PORT_NUMBER || 5500

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'docs', 'index.html')))

mongoose.connection.once('open', () => {
    app.listen(port)
    eventLogger('Connection to MongoDB successful', `server listening to port ${port}`, 'databaseLogs.txt')
})