const express = require('express');
const noteRouter = express.Router()
const { NoteModel } = require("../models/note.model")
const jwt = require("jsonwebtoken")

// Get a note
noteRouter.get("/", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "hello")

    try {
        if (decoded) {
            const note = await NoteModel.find({ "userID": decoded.userID })
            res.status(200).send(note)
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

// Post a note
noteRouter.post("/add", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "Note added" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

// Patch a note
noteRouter.patch("/update/:noteID", async (req, res) => {
    const { noteID } = req.params;
    const payload = req.body

    try {
        await NoteModel.findByIdAndUpdate({ _id: noteID }, payload)
        res.status(200).send({ "msg": "Note Updated" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

// Delete a note
noteRouter.delete("/delete/:noteID", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "hello")
    const noteID = req.params.noteID;
    const req_id = decoded.userID
    const note = NoteModel.findOne({ _id: noteID })
    const userID_in_note = note.userID

    try {
        if (req_id === userID_in_note) {
            await NoteModel.findByIdAndDelete({ _id: noteID })
            res.status(200).send({ "msg": "Note Delete" })
        }else{
            res.status(400).send({ "msg": "Not Authorised" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


module.exports = {
    noteRouter
}