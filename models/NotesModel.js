const mongoose = require('mongoose');

 const notesSchema = new mongoose.Schema({

    noteTitle: {
        type: String,
        required: true,
        maxLength: 100
    },
    noteDescription: {
        type: String,
        maxLength: 50
    },
    priority: {
        type: String,
        required: true,
        maxLength: 25,
        enum: ["HIGH", "LOW", "MEDUIM"]
    },
    
    dateAdded: {
        type: Date, 
        default: Date.now
    },
    dateUpdated: {
        type: Date, 
        default: Date.now
    },
    
})

module.exports = mongoose.model("notes", notesSchema)
