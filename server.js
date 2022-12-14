const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require("./routes/NoteRoutes")

const DB_URL = "mongodb+srv://101337015_Elizaveta:12345@cluster0.iugv30a.mongodb.net/comp3123?retryWrites=true&w=majority"

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

PORT = 8081;

app.use("/", noteRoutes)

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});