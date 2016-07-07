const MAP = require('promise-map');
const MAPPROMISE = require('map-promise');
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
	console.log(id);	
	var Pokemon = Pokedex.getPokemon(id);

	Promise.resolve(Pokemon).then(function(response){
		CONTENT.pokemonData = response;
		CONTENT.pokemonStringData = JSON.stringify(response);
		//TODO : Find a better way to chain requests
		var Species = Pokedex.getSpecies(response.id);
		Promise.resolve(Species).then(function(r){
			CONTENT.pokemonSpeciesData = r;
			CONTENT.pokemonSpeciesStringData = JSON.stringify(r);
			RES.render('pokemon', CONTENT);
		});
	});
}
module.exports = router;
