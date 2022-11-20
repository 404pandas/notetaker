// Require file system module from node.js
const fs = require("fs");

// Require util module from node.js
const util = require("util");

// Loads the value of a string or binary field from file
const readFromFile = util.promisify(fs.readFile);

// Asynchronously append the given data to a file. New file is created if it doesn't exist.
const appendFile = (content, file) => {
    fs.readFile(file, "utf-8", (err, data))
};

module.exports = {readFromFile, appendFile};