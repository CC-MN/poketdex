var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();

Pokedex.getPokemon('charmander')
.then(function(response){
	console.log(response);
})
.catch(function(error){
	console.log(error);
});

/* GET home page. */
router.get('/', function(req, res, next) {
	var content = {
		title : 'Pokemon API',
	};
	res.render('pokemon', content);
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	var content = {
		title : 'Pokemon API'
	};
	res.render('pokemon', content);
});


module.exports = router;
