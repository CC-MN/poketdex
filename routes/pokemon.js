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

	var pokemonUrlList = [];
	pokemonUrlList.push(Pokedex.getPokemon(id));
	pokemonUrlList.push(Pokedex.getSpecies(id));

	var pokeAPI = Pokedex.getJSON(pokemonUrlList);

	Promise.resolve(pokeAPI).then(function(array){
		// console.log(array);
		//TODO:
		//Look at response of array and create a better structure for objectname
		CONTENT.pokemonData = array[0];
		CONTENT.pokemonStringData = JSON.stringify(array[0]);

		CONTENT.pokemonSpeciesData = array[1];
		CONTENT.pokemonSpeciesStringData = JSON.stringify(array[1]);

		RES.render('pokemon', CONTENT);

	});

}

module.exports = router;
