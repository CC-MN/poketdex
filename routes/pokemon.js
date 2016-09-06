var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();
var CONTENT = {};

/* GET home page. */
router.get('/', function(req, res, next) {
	CONTENT.title = 'Pokemon API';
	renderContent('1', req, res, next); //default to bulbasaur
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	CONTENT.title = 'Pokemon API';
	renderContent(req.params.id, req, res, next);
});


function renderContent(id, req, res, next){
	try{
		Pokedex.getJSON(Pokedex.getPokemon(id))
		.then(function(response){

			errorHandling(response, res, next);

			//get pokemon info
			CONTENT.pokemonResponse = response;
			CONTENT.pokemonResponseString = JSON.stringify(response);
			return Pokedex.getJSON(Pokedex.getSpecies(id));
		})
		.then(function(response){

			//get species info
			CONTENT.pokemonSpeciesData = response;
			CONTENT.pokemonSpeciesDataString = JSON.stringify(response);

			//get all pokemon so we will not pass through an id/name but a query string
			return Pokedex.getJSON(Pokedex.getPokemon('?limit=999'));
			
		}).then(function(response){

			CONTENT.allPokemonNames = response;
			CONTENT.allPokemonNamesString = JSON.stringify(response);

			if(response.type !== 'err'){
				res.render('pokemon', CONTENT);
			}
		});
	}catch(e){
		console.log(e);
		res.render('error', {err : response.err, message : response.message, response: response.err });
	}

}

function errorHandling(response, res, next){
	if(response.type === 'err'){
		if(res.headersSent){
			//return next(response);
		}else{
			res.status(response.status);
			res.render('error', {err : response.err, message : response.message, response: response.err });
			next();
		}
	}
}

module.exports = router;
