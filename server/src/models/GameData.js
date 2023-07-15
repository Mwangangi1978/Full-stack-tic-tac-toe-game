const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerX: {
    type: String,
    required: true
  },
  playerO: {
    type: String,
    required: true
  },
  moves: [
    {
      player: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
