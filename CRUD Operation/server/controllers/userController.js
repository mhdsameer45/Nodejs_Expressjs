const mysql = require('mysql2');

// MySQL Connection
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Active Users
exports.view = (req, res) => {
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
  });
};

// Search Users
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  connection.query(
    'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', 
    ['%' + searchTerm + '%', '%' + searchTerm + '%'], 
    (err, rows) => {
      if (!err) {
        res.render('home', { rows });
      } else {
        console.log(err);
      }
    }
  );
};

// Show Add User Form
exports.form = (req, res) => {
  res.render('add-user');
};

// Add New User
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  connection.query(
    'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?, status = "active"', 
    [first_name, last_name, email, phone, comments], 
    (err, rows) => {
      if (!err) {
        res.render('add-user', { alert: 'User added successfully.' });
      } else {
        console.log(err);
      }
    }
  );
};

// Edit User
exports.edit = (req, res) => {
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
  });
};

// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  connection.query(
    'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', 
    [first_name, last_name, email, phone, comments, req.params.id], 
    (err) => {
      if (!err) {
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
          if (!err) {
            res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
};

// Delete User (Hard Delete)
exports.delete = (req, res) => {
  connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successfully removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
  });

  // Uncomment to use Soft Delete instead
  /*
  connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successfully removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
  });
  */
};

// View Single User Details
exports.viewall = (req, res) => {
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
  });
};

// Development Only: Truncate Table & Reset IDs
exports.resetTable = (req, res) => {
  connection.query('TRUNCATE TABLE user', (err) => {
    if (!err) {
      res.send('User table truncated and AUTO_INCREMENT reset.');
    } else {
      console.log(err);
    }
  });
};
