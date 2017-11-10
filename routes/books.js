'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
const knex = require('../knex');
const humps = require('humps');

router.get('/books', function (req, res) {
  res.set('Content-Type', 'application/json');
  knex.select().from('books').orderBy('title', 'asc').then(function(results){
    res.json(humps.camelizeKeys(results));
  })

})

router.get('/books/:id', function (req, res) {
  res.set('Content-Type', 'application/json');
  knex('books').where('id', req.params.id).select().then(function(results){
    res.json(humps.camelizeKeys(results[0]));
  })

})

router.post('/books', function (req, res) {
  res.set('Content-Type', 'application/json');
  knex('books').insert(humps.decamelizeKeys(req.body)).returning('*').then(function(results){
    res.json(humps.camelizeKeys(results[0]));
  })

})

router.patch('/books/:id', function (req, res) {
  res.set('Content-Type', 'application/json');
  knex('books').where('id', req.params.id).returning('*').update(
    humps.decamelizeKeys(req.body)
  ).then(function(results){
    res.json(humps.camelizeKeys(results[0]));
  })
})

router.delete('/books/:id', function (req, res) {
  res.set('Content-Type', 'application/json');
  var result = null;
  const id = Number.parseInt(req.params.id);
  knex('books').where('id', id).first().select().then(function(results){
    console.log("1 id: " + id + "results: " + JSON.stringify(results));
    result = humps.camelizeKeys(results);
    delete result.id;
  }).then(function(){
    knex('books').where('id', id).del().then(function(results){
      console.log("2 id: " + id + "result: " + JSON.stringify(result));
      res.json(result);
    });
  });
})

module.exports = router;
