const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    age: { type: Number, required: true }
}, {
    versionKey: false
})

// User Model
const UserModel = mongoose.model('user', userSchema);

module.exports = {
    UserModel
}


