// game schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Game', GameSchema);