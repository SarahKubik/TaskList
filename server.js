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

//View notes
app.get('/api/notes', (req, res) => res.json(notes));

app.post("/api/notes", function (req, res) {
  try {
    // reads the json file
    notes = fs.readFileSync("db/db.json", "utf8");
    console.log(notes);
   
    // Converts/parse data to get an array of objects
     // Set new notes id
    // adding new note to the array of note objects
    // User input is req.body
     // String to write to the file
    notes = JSON.parse(notes);
    req.body.id = uuid.v4();
    notes.push(req.body); 
    notes = JSON.stringify(notes);

    // writes the new note to file
    fs.writeFile("./db/db.json", notes, "utf8", function (err) {
      if (err) throw err;
       //Converts to get an array of objects
      notes = JSON.parse(notes);
      res.json(notes);
    });
   // error handling
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
    // Converts data to an array of the objects
    notes = JSON.parse(notes);
    // delete the old note 
    notes = notes.filter(function (note) {
      return note.id != req.params.id;
    });
    // String to write to file.
    notes = JSON.stringify(notes);
    fs.writeFile("./db/db.json", notes, "utf8", function (err) {
      // error handling
      if (err) throw err;
      notes = JSON.parse(notes);
      res.json(notes);
    });

       } catch (err) {
        console.log(err);
       throw err;
       }
    });

  // Starts the server 
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
