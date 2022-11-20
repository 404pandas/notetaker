// To kill port:
// npm install -global kill-port #
// kill-port -port 3000

// Express dependency
const express = require("express");

// File system dependency
const fs = require("fs");

//
const app = express();

// Port
const PORT = 3001;

// Route creation and add "/" route
app.use(express.static("./public/"));

// Data parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Round files
require("./public/assets/routes/apiRoutes")(app);
require("./public/assets/routes/htmlRoutes")(app);

// Starts server

app.listen(PORT, () => {
  console.log(`Welcome!
    The server is available at localhost${PORT}.
    Enjoy and please star the repo!`);
});
