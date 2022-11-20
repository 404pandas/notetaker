// Require path
const path = require("path")

// Require express.js
const express = require("express");

// Routes folder location
const routes = require('./routes/index.js')

// Express variable, industry standard is "app"
const app = express();

// Port variable, always include process.env.PORT with 3001
const PORT = process.env.PORT || 3001;

// Data parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/routes", routes);

// Route creation and add "/" route
app.use(express.static("public"));

// Route to notes html page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html")));

// Route to index html page
app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, "/public/index.html")));

// Starts server
app.listen(PORT, () => {
  console.log(`Welcome!
    The server is available at http://localhost:${PORT} .
    Enjoy and please star the repo!`);
});
