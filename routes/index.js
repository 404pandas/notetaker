// Subrouting process for urls starting with /notes and routes into notes.js

// Express
const express = require("express");

// Notes route
const notesRoute = require("./notes");

// App
const app = express();

// Routes that start with /notes taken care of at notes.js
app.use("/notes", notesRoute);

module.exports = app;
