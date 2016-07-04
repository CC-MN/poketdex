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

	Promise.resolve(Pokemon).then(function(response){
		content.pokemonData = response;
		content.pokemonStringData = JSON.stringify(response);
		//TODO : Find a better way to chain requests
		Pokedex.getSpecies(response.id).then(function(r){
			content.pokemonSpeciesData = r;
			content.pokemonSpeciesStringData = JSON.stringify(r);
			res.render('pokemon', content);
		});
	});

});

module.exports = router;
