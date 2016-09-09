var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();

/* GET home page. */
router.get('/', function(req, res, next) {
	renderContent('1', req, res, next); //default to bulbasaur
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	renderContent(req.params.id, req, res, next);
});


function renderContent(id, req, res, next){
	var content = { title : 'Pokemon API'};
	try{
		Pokedex.getJSON(Pokedex.getPokemon(id))
		.then(function(response){

			errorHandling(response, res, next);

			//get pokemon info
			content.pokemonResponse = response;
			content.pokemonResponseString = JSON.stringify(response);
			return Pokedex.getJSON(Pokedex.getSpecies(id));
		})
		.then(function(response){

			//get species info
			content.pokemonSpeciesData = response;
			content.pokemonSpeciesDataString = JSON.stringify(response);

			//get all pokemon so we will not pass through an id/name but a query string
			return Pokedex.getJSON(Pokedex.getPokemon('?limit=999'));
			
		}).then(function(response){

			content.allPokemonNames = response;
			content.allPokemonNamesString = JSON.stringify(response);

			if(response.type !== 'err'){
				res.render('pokemon', content);
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
			// next();
		}
	}
}

module.exports = router;
