var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();
var CONTENT = {};
var RES;

/* GET home page. */
router.get('/', function(req, res, next) {
	RES = res;
	var url = req.query.url || null;
	
	if(!url ){
		sendResults({'status' : '404', 'description' : 'no value passed'});
	}

	Pokedex.getJSON(url).then(function(response){
		sendResults(response);
	});

});

function sendResults(results){
	//send here so we only have one res.send on the page
	RES.send(results);
}

module.exports = router;
