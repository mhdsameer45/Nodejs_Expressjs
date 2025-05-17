// var express = require('express');
// var app = express();

// app.get('/', function(req, res) {
//     res.send("Hello World");
// })

// var server = app.listen(5000, () => {
//     console.log("Express App running at http://127.0.0.1:5000/");
// })


// GET Method 

// var express = require('express');
// var app = express();
// var path = require('path');

// app.use(express.static('public'));

// app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname,"index.html"));
// })

// app.get('/process_get', function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.query.first_name,
//       last_name:req.query.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// var server = app.listen(5000, function () {
//    console.log("Express App running at http://127.0.0.1:5000/");
// })


// POST Method

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Serve static files (if needed)
app.use(express.static('public'));

// Serve HTML file
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, "index.html"));
});

// Handle GET request (optional)
app.get('/process_get', function (req, res) {
   const response = {
      first_name: req.query.first_name,
      last_name: req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

// ✅ Correctly handle POST request
app.post('/process_post', urlencodedParser, function (req, res) {
   const response = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

// Start server
var server = app.listen(5000, function () {
   console.log("Express App running at http://127.0.0.1:5000/");
});
