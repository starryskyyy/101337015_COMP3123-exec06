const NoteModel = require('../models/NotesModel.js');

const express = require("express")

const routes = express.Router()

// add note
routes.post('/notes', async (req, res) => {
    // Validate request
    try {
        let noteParams = {
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority,
            dateAdded: new Date
        };

        const newNote = new NoteModel(noteParams)
        const note = await newNote.save()
        res.status(201).send(note)
    } catch (error) {
        if (!req.body) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
            res.status(400).send({ message: error.message })
        }
    }
});

// display all notes
routes.get('/notes', async (req, res) => {
    try {
        const notes = await NoteModel.find()
        if (notes.length == 0) {
            res.status(400).json({ message: "no notes were found" })
        }
        else {
            res.status(200).send(notes)
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
});

// display note by id
routes.get('/notes/:noteId', async (req, res) => {
    try {

        const note = await NoteModel.findById(req.params.noteId)
        res.status(200).json(note)

    } catch (error) {
        if (error.kind === "ObjectId") {
            res.status(400).send({ message: `note with id: ${req.params.noteId} was not found` });
        }
        else {
            res.status(400).json({ message: error.message })
        }
    }

});

//update note
routes.put('/notes/:noteId', async (req, res) => {
    try {
        let noteParams = {
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority,
            dateUpdated: new Date
        };
        const updateNote = await NoteModel.findByIdAndUpdate(req.params.noteId, noteParams, { runValidators: true })
        res.status(200).send(updateNote)
        
    }catch (error) {
        
    if (error.kind === "ObjectId") {
        res.status(400).send({ message: `note with id: ${req.params.noteId} was not found` });
    }
    else {
        res.status(400).json({ message: error.message })
    }
}
});

// delete note
routes.delete('/notes/:noteId', async (req, res) => {
    try{
        const deletedNote = await NoteModel.findByIdAndDelete(req.params.noteId)
        res.status(200).send(deletedNote)
    }catch(error){
        if (error.kind === "ObjectId") {
            res.status(400).send({ message: `note with id: ${req.params.noteId} was not found` });
        }
        else {
            res.status(400).json({ message: error.message })
        }
    }
});

module.exports = routes