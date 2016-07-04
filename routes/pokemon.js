var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();

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

	var Pokemon = Pokedex.getPokemon(req.params.id);
	// TODO : Need to find a better way of checking if this is a promise or not...
	if(typeof Pokemon.then === 'function'){
		
		Pokemon.then(function(response){

			content.pokemonData = response;
			content.pokemonStringData = JSON.stringify(response);
			res.render('pokemon', content);

		}).catch(function(e){
			console.log('Error: ' + e);
		});

	}else{
		content.pokemonData = Pokemon;
		content.pokemonStringData = JSON.stringify(Pokemon);
		res.render('pokemon', content);
	}

});


module.exports = router;
