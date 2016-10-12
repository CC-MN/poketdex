var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();

/* GET home page. */
router.get('/', function(req, res, next) {
	renderContent('1', req, res); //default to master-ball
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	renderContent(req.params.id, req, res);
});


function renderContent(id, req, res){
	var content = { title : 'Pokemon API' }

	Pokedex.getJSON(Pokedex.getLocation(id))
	.then(function(response){

		errorHandling(response, req, res);
		
		content.locationData = response;
		content.locationDataString = JSON.stringify(response);
		
		if(response.type !== 'err'){
			res.render('location', content);
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
