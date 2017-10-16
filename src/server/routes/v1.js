var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

function Scores() {
  return knex('scores');
};

function Users() {
  return knex('users');
}

router.get('/', function(req, res, next) {
  res.status(200).send({
    title: 'v1 Routes'
  });
});

router.get('/users', function(req, res, next) {
  Users().select().then((data) => {
    if (data) {
      res.status(200).send({
        users: data,
      });
    } else {
      res.status(400).send({
        status: 'error',
        message: 'No users found',
      });
    }
  });
});

router.post('/users', function(req, res, next) {
  Users().insert(req.body).then((data) => {
    res.status(200).send({
      status: 'success',
      message: 'User added successfully.'
    });
  });
});

router.get('/scores', function(req, res, next) {
  knex.raw("SELECT CONCAT(b.first_name, ' ', b.last_name) AS p1_name, a.p1_score, CONCAT(c.first_name, ' ', c.last_name) AS p2_name, a.p2_score, a.win_by_amount FROM scores a INNER JOIN users b ON a.p1_id = b.id INNER JOIN users c ON a.p2_id = c.id;")
  .then((data) => {
    res.status(200).send({
      scores: data.rows
    });
  });
});

router.post('/scores', function(req, res, next) {
  knex.raw(
    "SELECT CONCAT(b.first_name, ' ', b.last_name) AS p1_name, a.p1_score, "
    + "CONCAT(c.first_name, ' ', c.last_name) AS p2_name, a.p2_score, a.win_by_amount "
    + "FROM scores a "
    + "INNER JOIN users b ON a.p1_id = b.id "
    + "INNER JOIN users c ON a.p2_id = c.id "
    + "WHERE a.p1_id IN (SELECT id FROM users WHERE id=" + req.body.p1_id + " OR id=" + req.body.p2_id + ") "
    + "AND a.p2_id IN (SELECT id FROM users WHERE id=" + req.body.p1_id + " OR id=" + req.body.p2_id + "); "
  )
  .then((data) => {
    if (data.rows.length) {
      res.status(200).send({
        scores: data.rows
      });
    } else {
      res.status(400).send({
        status: 'error',
        message: 'No games found',
      });
    }
  });
});

router.post('/scores/add', function(req, res, next) {
  if (!req.body.p1_id || !req.body.p2_id || !req.body.p1_score || !req.body.p2_score || !req.body.win_by_amount) {
    res.status(400).send({
      status: 'error',
      message: 'Score add error. Please make sure the data is complete.'
    });
  } else {
    Scores().insert(req.body).returning('*').then((data) => {
      if (data[0].id) {
        res.status(200).send({
          status: 'success',
          message: 'Score added successfully.'
        });
      } else {
        res.status(400).send({
          status: 'error',
          message: 'Score add error. Please try again.'
        });
      }
    });
  }
});

module.exports = router;
