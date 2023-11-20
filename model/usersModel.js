const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username: {
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
    }
}, {
    timestamps: true, // Enable timestamps
})

const userModel = mongoose.model('user', user);

module.exports = userModel;