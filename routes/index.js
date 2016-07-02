var express = require('express');
var router = express.Router();
var Pokedex = require('../pokedex');

Pokedex.getPokemon('charmander');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pokemon API' });
});

module.exports = router;
