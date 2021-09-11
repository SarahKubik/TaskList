// Dependencies

const express = require('express');
const path = require('path');
let notes = require("./db/db.json");
const fs = require('fs');
// Unique ID for new notes
const uuid = require('uuid');

// Sets up the Express App

const app = express();
// set new port in terminal export = number.
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware
app.use(express.static("public"));




// Routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));


// // Displays all characters
// app.get('/api/characters', (req, res) => res.json(characters));
app.get('/api/notes', (req, res) => res.json(notes));



app.post("/api/notes", function (req, res) {
  try {
    // reads the json file
    notes = fs.readFileSync("db/db.json", "utf8");
    console.log(notes);

    // parse the data to get an array of objects
    notes = JSON.parse(notes);
    // Set new notes id
    req.body.id = uuid.v4();
    // add the new note to the array of note objects
    notes.push(req.body); // req.body - user input
    // make it string(stringify)so you can write it to the file
    notes = JSON.stringify(notes);

    // writes the new note to file
    fs.writeFile("./db/db.json", notes, "utf8", function (err) {

      // error handling
      if (err) throw err;
      notes = JSON.parse(notes);
      res.json(notes);
    });

  } catch (err) {
    console.error(err);
    throw err;
  }
});

// Delete a note

app.delete("/api/notes/:id", function (req, res) {
  try {
    //  reads the json file
    notes = fs.readFileSync("./db/db.json", "utf8");

    // parse the data to get an array of the objects
    notes = JSON.parse(notes);

    // delete the old note from the array on note objects
    notes = notes.filter(function (note) {
      return note.id != req.params.id;
    });

    // make it string(stringify)so you can write it to the file
    notes = JSON.stringify(notes);
    // write the new notes to the file
    fs.writeFile("./db/db.json", notes, "utf8", function (err) {
      // error handling
      if (err) throw err;
      notes = JSON.parse(notes);
      res.json(notes);
    });

    // error handling
  } catch (err) {

    console.log(err);
    throw err;
  }
});


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
