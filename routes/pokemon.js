var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();
var CONTENT = {};
var RES;

/* GET home page. */
router.get('/', function(req, res, next) {
	CONTENT.title = 'Pokemon API';
	RES = res;
	renderContent('1'); //default to bulbasaur
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	CONTENT.title = 'Pokemon API';
	RES = res;
	renderContent(req.params.id);
});

function renderContent(id){

	Pokedex.getJSON(Pokedex.getPokemon(id))
	.then(function(response){
		//get pokemon info
		CONTENT.pokemonData = response;
		CONTENT.pokemonStringData = JSON.stringify(response);
		return Pokedex.getJSON(Pokedex.getSpecies(id));
	})
	.then(function(response){
		//get species info
		CONTENT.pokemonSpeciesData = response;
		CONTENT.pokemonSpeciesStringData = JSON.stringify(response);

		RES.render('pokemon', CONTENT);
	});

}
module.exports = router;
