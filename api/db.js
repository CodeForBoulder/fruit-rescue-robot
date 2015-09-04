// Setup
var db = {};
db.pg = require('pg');
var dbconf = {
  username: "fruit_rescue_user",
  password: "password",
  host: "localhost",
  database: "fruit_rescue_db"
}
var conString = "postgres://" + dbconf["username"] + ":" + dbconf["password"] + "@" + dbconf["host"] + "/" + dbconf["database"];

// Connect to database and test connection
db.client = new db.pg.Client(conString);
db.client.connect(function(err, client, done) {
  if (err) {
    return console.error('Error connecting to database!', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //done();
    if (err) {
      return console.error('Error running test query!', err);
    } else {
      return console.log('Connected to database.');
    }
  });
});

db.client.query('SELECT $1::int AS number', ['1'], function(err, result) {});

module.exports = db;