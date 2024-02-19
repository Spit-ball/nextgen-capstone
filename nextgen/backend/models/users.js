// user schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'coach', 'player'] // accepts only these values for role -- default is user.
    }
});

module.exports = mongoose.model('User', UserSchema);