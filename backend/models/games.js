// game schema for storing games that are available in the system...currently only Overwatch is available but more games will be added in the future, so this schema will be used to store the games and associate them with players

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Game', GameSchema);