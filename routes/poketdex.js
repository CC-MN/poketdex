var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();

/* GET home page. */
router.get('/', function(req, res, next) {
	renderContent(req, res); //default to master-ball
});



function renderContent(req, res){
	var content = { title : 'Pokemon API' }

	Pokedex.getJSON(Pokedex.getPokemon('?limit=999'))
	.then(function(response){

			errorHandling(response, res);

			//get pokemon info
			content.pokemonString = JSON.stringify(response);
			content.pageName = 'Pokemon List';

			content.partials = {
				header 		: 	'partials/header',
				loading 	: 	'partials/loading'
			}

			if(response.type !== 'err'){
				res.render('poketdex', content);
			}
		});
}

function errorHandling(response, req, res){
	if(response.type === 'err'){
		if(res.headersSent){
			//return next(response);
		}else{
			res.status(response.status);
			res.render('error', {err : response.err, message : response.message, response: response.err });
		}
	}
}

module.exports = router;
