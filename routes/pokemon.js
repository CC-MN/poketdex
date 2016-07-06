var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();

/* GET home page. */
router.get('/', function(req, res, next) {
	var content = {
		title : 'Pokemon API',
	};
	renderContent('1'); //default to bulbasaur
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	var content = {
		title : 'Pokemon API'
	};
	renderContent(req.params.id)
});

function renderContent(id){
	console.log(id);	
	var Pokemon = Pokedex.getPokemon(id);

	Promise.resolve(Pokemon).then(function(response){
		content.pokemonData = response;
		content.pokemonStringData = JSON.stringify(response);
		//TODO : Find a better way to chain requests
		var Species = Pokedex.getSpecies(response.id);
		Promise.resolve(Species).then(function(r){
			content.pokemonSpeciesData = r;
			content.pokemonSpeciesStringData = JSON.stringify(r);
			res.render('pokemon', content);
		});
	});
}

module.exports = router;
