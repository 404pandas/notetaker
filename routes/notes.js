// Routes for get, post, put, delete notes will go here
const note = require("express").Router();
const { readFromFile } = require("../utilities/fs");

// Get notes
note.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Post new notes

// Delete notes

module.exports = note;