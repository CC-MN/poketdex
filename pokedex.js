var RP = require('request-promise');
var CACHE = require('memory-cache');

const BASE_URL = 'http://pokeapi.co/api/v2/';	
const CACHE_TIME = 1000000;

module.exports = {

	//pokemon api list here
	getPokemon : function(pokemon){
		console.log('get pokemon');
		var url = BASE_URL + 'pokemon/' + pokemon;
		getJSON(url, 'callback');
	}

}

getJSON = function(URL, callback){

	var cacheResult = CACHE.get(URL);
	console.log(CACHE.keys());

	if(cacheResult !== null){
		console.log('got a cachedResult');
		console.log(cacheResult)
		//not null so lets do a callback
		return true;
	}

	console.log('no cached result so lets grab some data!');

	var options = {
		url : URL,
		json : true
	}

	RP(options)
	.then(function(response){
		console.log('got a response!');
		//put response in cache
		CACHE.put(URL, response, CACHE_TIME);
		console.log(CACHE.keys());
		//do call back
		return true;
	})
	.catch(function(err){
		console.log(err);
	});

}