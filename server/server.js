// IMPORT THE REQUIRED MODULES AND FILES
const express = require('express')
const eventLogger = require('./middleware/eventLogger')
const {Server} = require('socket.io')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/connectDB')

// INSTANSIATE AN EXPRESS APP, TO USE MIDDLEWARES AND INITIATE ANOTHER SERVER
const app = express()
// INSTANSIATE A SERVER USING THE EXPRESS APP
const server = require('http').createServer(app)
// INSTANTIATE THE IO USING THE SERVER
const io = new Server(server)
// INITIATE THE DOTENV MODULE
dotenv.config()
// CONNECT TO DB
connectDB()

const port = process.env.PORT_NUMBER || 5173

// MIDDLEWARES
app.use(cors())
app.use(express.json())

    // OBTAIN THE DATA FROM CLIENT ON USERNAME
// CREATE TWO LIST TO DEAL WITH THE RECEIVED AND PAIRED PLAYERS
const receivedPlayersArray = []

// DEALING WITH DATA SENT ON CLIENT, THAT IS THE USERNAME WITH ON EVENTLISTENER
io.on("connection", (socket) => {
    socket.on("checkUser", (data) => {
        if(data.username){
            receivedPlayersArray.push(data.username)

            // ONLY PAIR 1ST 2 PLAYERS
            if(receivedPlayersArray.length >= 2){
                const playerOne = {
                    username: receivedPlayersArray[0],
                    chosenPlayer: "X",
                    movedPosition: ""
                }
                const playerTwo = {
                    username: receivedPlayersArray[1],
                    chosenPlayer: "O",
                    movedPosition: ""
                }
                // A LIST OF PAIRED PLAYERS TO PUSH TO THE CLIENT
                const pairedPlayers = [playerOne, playerTwo]
                // CLEAR THE TWO OBTAINED PLAYERS
                receivedPlayersArray.splice(0,2)
                console.log('received by server')

                // FINALLY, RESPOND TO THE CHECKUSER EVENTLISTENER
                socket.emit("sendUser", {pairedPlayers: pairedPlayers})

            }
        }
    })
})

// ONLY START SERVER IF A CONNECTION IS MADE
mongoose.connection.once('open', () => {
    server.listen(port, () => {
        eventLogger('Connection to MongoDB successful', `server listening to port ${port}`, 'databaseLogs.txt')
    })
})