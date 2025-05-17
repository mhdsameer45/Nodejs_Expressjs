// var express = require('express');
// var app = express();
// var fs = require("fs");
// app.get('/', function (req, res) {
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       res.end( data );
//    });
// })
// var server = app.listen(5000, function () {
//    console.log("Express App running at http://127.0.0.1:5000/");
// })



// var express = require('express');
// var app = express();
// var fs = require("fs");
// app.get('/:id', function (req, res) {
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       var users = JSON.parse( data );
//       var user = users["user" + req.params.id] 
//       res.end( JSON.stringify(user));
//    });
// })
// var server = app.listen(5000, function () {
//    console.log("Express App running at http://127.0.0.1:5000/");
// })

const express = require('express');
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // for global unique IDs

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usersFilePath = path.join(__dirname, "users.json");

// GET user by ID
app.get('/:id', function (req, res) {
   fs.readFile(usersFilePath, 'utf8', function (err, data) {
      if (err) return res.status(500).send("File read error");

      const users = JSON.parse(data);
      const user = users["user" + req.params.id];

      if (!user) {
         return res.status(404).send("User not found");
      }

      res.json(user);
   });
});

// POST new user
app.post('/', function (req, res) {
   fs.readFile(usersFilePath, 'utf8', function (err, data) {
      if (err) return res.status(500).send("File read error");

      const users = JSON.parse(data);
      const user = req.body;

      // Assign a unique global ID
      user.id = uuidv4();
      users["user" + user.id] = user;

      // Save back to file
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), function (err) {
         if (err) return res.status(500).send("File write error");

         res.json(user);
      });
   });
});

const server = app.listen(5000, function () {
   console.log("Express App running at http://127.0.0.1:5000/");
});
