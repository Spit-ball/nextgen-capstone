// saved player schema for storing players that have been saved by a user with a ref to the user and the player's statistics

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedPlayerSchema = new Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    battletag: {
        type: String,
        required: false // not required because not all players have a battletag depending on the game
    },
    playerStats: {
        type: Map,
        of: Number,
        required: false // some players may have private profiles and not all stats will be available
    },
    competitiveStats: {
        pc: {
            type: Object,
            required: false
        },
        console: {
            type: Object,
            required: false
        }
    },
    dateSaved: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('SavedPlayer', SavedPlayerSchema);