const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: String,
    start_date: Date,
    registered_players: [String],
    answers: [Object],
    turn: Object,
});

const Game = mongoose.model('game', gameSchema);

export default Game;
