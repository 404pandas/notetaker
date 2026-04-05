// Routes for get, post, put, delete notes will go here
const note = require("express").Router();
const { readFromFile, appendToFile, writeToFile } = require("../utilities/fs");

// Get notes
note.get("/", (req, res) => {
  // Calls readFromFile function in fs.js and parses JSON data response
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Post new notes
note.post("/", (req, res) => {
  // Requests data in string or JSON from client side
  const { title, text } = req.body;
  // Logical AND operator will be true if all operands are true
  if (title && text) {
    // Method returns the number of milliseconds that have elapsed since January 1, 1970
    var id = Date.now();
    // Adds title, text, and date of note
    const addNote = {
      title,
      text,
      id,
    };
    // Appends note information to db.json
    appendToFile(addNote, "./db/db.json");
    // Adds responses to console.log depending on logical AND operator being truthy or falsey
    res.json("Note added!");
  } else {
    res.error("Could not add note.");
  }
});

// Delete notes
note.delete("/:id", (req, res) => {
  // Sets a variable for the parameters of the note ID
  const id = req.params.id;
  // Calls readFromFile function in fs.js and parses JSON data response
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Inequality operator != checks whether note.id and id are not equal
      // Filter method creates shallow copy of portion of array created
      // and filters the elements that pass the inequality operator
      const result = json.filter((note) => note.id != id);
      writeToFile("./db/db.json", result);
      res.json("Note deleted!");
    });
});

// Update a note
note.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, text } = req.body;

  // Validate input
  if (!title && !text) {
    return res.status(400).json("No update data provided.");
  }

  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notes) => {
      let noteFound = false;

      const updatedNotes = notes.map((note) => {
        if (note.id == id) {
          noteFound = true;
          return {
            ...note,
            title: title || note.title,
            text: text || note.text,
          };
        }
        return note;
      });

      if (!noteFound) {
        return res.status(404).json("Note not found.");
      }

      writeToFile("./db/db.json", updatedNotes);
      res.json("Note updated!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("Error updating note.");
    });
});

module.exports = note;
