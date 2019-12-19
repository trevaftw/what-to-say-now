const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// Handles Axios request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

//this route gets all the content from the content table to map over based on user info
router.get('/content', rejectUnauthenticated, (req, res) => {
  pool.query(`
  SELECT * FROM "content";
  `).then((result) => {
      res.send(result.rows)
  })
      .catch((error) => {
          console.log('error with admin get, error:', error)
          res.sendStatus(500)

      });
});


//this route will get the info from content table based on the params passed to it
router.get('/weekly/:role/:week/:age', rejectUnauthenticated, (req, res) => {
  pool.query(`
  SELECT * FROM "content" WHERE ("role_id"=$1 AND "week" = $2 AND "ageGroup_id"=$3);
  `,[req.params.role, req.params.week, req.params.age]).then((result) => {
      res.send(result.rows)
  })
      .catch((error) => {
          console.log('error with WEEKLY get, error:', error)
          res.sendStatus(500)

      });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  console.log('----------> register thingy');
  const queryText = 'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
  pool.query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log('----------> login thingy');
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
