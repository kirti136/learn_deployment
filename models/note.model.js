const mongoose = require('mongoose');

// Note Schema
const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    sub: { type: String, required: true },
    userID: String
}, {
    versionKey: false
})

// Note Model
const NoteModel = mongoose.model('note', noteSchema)

module.exports = {
    NoteModel
}