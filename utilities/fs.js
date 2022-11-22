// Require file system module from node.js
const fs = require("fs");

// Require util module from node.js
const util = require("util");

// Loads the value of a string or binary field from file
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 10), (err) =>
    err ? console.error(err) : console.info("Note data has been written")
  );

// Asynchronously append the given data to a file. New file is created if it doesn't exist.
const appendToFile = (content, file) => {
  // Parameters are the path to the file that is to be read and the callback function that is called when file is read completely.
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error("Error appending content", err);
    } else {
      const parseData = JSON.parse(data);
      console.log(content);
      parseData.push(content);
      writeToFile(file, parseData);
    }
  });
};

module.exports = { readFromFile, writeToFile, appendToFile };
