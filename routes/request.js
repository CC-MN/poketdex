var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();

/* GET home page. */
router.get('/', function(req, res, next) {

	var url = req.query.url || null;
	
	if(!url ){
		sendResults({'status' : '404', 'description' : 'no value passed'});
	}

	Pokedex.getJSON(url).then(function(response){
		sendResults(response, res);
	});

});

function sendResults(results, res){
	//send here so we only have one res.send on the page
	res.send(results);
}

module.exports = router;
