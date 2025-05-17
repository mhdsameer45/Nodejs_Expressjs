const express = require('express');
const exphbs = require('express-handlebars');
//const bodyParser = require('body-parser'); // No longer Required
//const mysql = require('mysql'); // Not required -> moved to userController

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Template Engine
const hbs = exphbs.create({ extname: '.hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// // Mysql Connectivity
// const pool = mysql.createPool({
//     connectionLimit : 100,
//     host            : process.env.DB_HOST,
//     user            : process.env.DB_USER,
//     password        : process.env.DB_PASS,
//     database        : process.env.DB_NAME
// });

// // Create Connection
// pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log('Connected as ID ' + connection.threadId);

// });

// Router
// app.get('/', (req, res) => {
//     res.render('home');
// })

// app.get('/favicon.ico', (req, res) => res.status(204).end());

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

