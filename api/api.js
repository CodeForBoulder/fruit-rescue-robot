// BASE SETUP
// =============================================================================
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var port = 3000;

// start api
var api = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }));

// MIDDLEWARES
// =============================================================================

function get_human_by_id(req, res, next) {
  var id = req.params.id;
  var sql = 'SELECT * FROM humans WHERE id = $1';
  db.client.query(sql, [id], function(err, result) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({ error: ['Query failed'] });
    }
    if (result.rows.length == 0) {
      res.statusCode = 404;
      return res.json({ error: ['Not found'] });
    }
    req.human = result.rows[0];
    next();
  });
}

// ROUTES
// =============================================================================

// Define routes
var router = express.Router();

// welcome
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the Fruit Rescue API!' });   
});

// humans
router.route('/humans')
  .get(function(req, res) {
    var sql = 'SELECT * FROM humans';
    db.client.query(sql, function(err, result) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ error: ['Query failed'] });
      } else {
        res.json(result.rows);
      }
    });
  })
  .post(function(req, res) {
    var sql = 'INSERT INTO humans (name, address, phone, email) VALUES ($1, $2, $3, $4) RETURNING *';
    var data = [
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email
    ];
    db.client.query(sql, data, function(err, result) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ error: ['Create failed'] });
      } else {
        res.statusCode = 201;
        res.json(result.rows[0]);
      }
    });
  });
router.route('/humans/:id')
  .all(get_human_by_id)
  .get(function(req, res) {
    res.json(req.human);
  })
  .patch(function(req, res) {})
  .delete(function(req, res) {
    var id = req.params.id;
    var sql = 'DELETE FROM humans WHERE id = $1';
    db.client.query(sql, [id], function(err, result) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ error: ['Delete failed'] });
      } else {
        res.statusCode = 200;
        return res.json({ message: ['Delete successful'] });
      }
    });
  });

// Register routes
// all routes will be prefixed with /api
api.use('/api', router);

// START SERVER
// =============================================================================
var server = api.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('API started at http://%s:%s', host, port);
});