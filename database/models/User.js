const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    playerInfo: {
        type: Array,
        required: true
    },
    playerInventory: {
        type: Array,
        required: true
    }
}, {versionKey: false});

module.exports = mongoose.model("User", UserSchema, 'users');