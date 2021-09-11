//Dependencies 
const fs = require('fs');
const path = require('path');
let notes = require('/db/db.json');

// Express Server and PORT
const express = require("express");
const app = express();
// set new port in terminal export = number.
const PORT = process.env.PORT || 5000;

//Setup for app to handle data parsing.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Middleware 
app.use(express.json());

// const { stringify } = require('querystring');

// Display
app.get('/api/notes/', function (req, res) {
  fs.readFile('/db/db.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      res.json(notes);
  });
});

// Create new note

app.post('/api/notes', function (req, res) {
    let randLetter = String.fromCharCode(65 + Math.floor(Math.random()*26));
    let id = randLetter + Date(now);
    let newNote = {
      id: id,
      title: req.body.title,
      text: req.body.text
};
    console.log(typeof notes);
    notes.push(newNote);
    const stringifyNote = JSON.stringify(notes);
    res.json(notes);
    fs.writeFile('/db/db.json', stringifyNote, (err) => {
      if (err) console.log (err);
      else {
        console.log("Successfully saved note.");
      }
    
  });
});

// Delete note
app.delete('/api/notes/:id', function (req, res) {
  let noteId = req.params.id;
  fs.readFile('/db/db.json', "utf-8", function (err,data) {
    let updatedNotes = JSON.parse(data).filter((note) => {
      console.log ('note.id', note.id);
      console.log ('noteID', noteID);
      return note.id !== noteID;
    });
    notes = updatedNotes;
    const stringifyNote = JSON.stringify(updatedNotes);
    fs.writeFile('/db/db.json', stringifyNote, (err) => {
      if (err) console.log (err);
      else {
        console.log ( "Successfully deleted note.");
      }
    });
    res.json (stringifyNote);
  });
});

//HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

