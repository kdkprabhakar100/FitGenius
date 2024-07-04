const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    age: { type: Number, required: true },
});

module.exports = mongoose.model('User', UserSchema);
