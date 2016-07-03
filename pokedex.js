const RP = require('request-promise');
const CACHE = require('memory-cache');

const BASE_URL = 'http://pokeapi.co/api/v2/';	
const CACHE_TIME = 1000000;

getJSON = function(URL){

	const cacheResult = CACHE.get(URL);
	console.log(CACHE.keys());

	if(cacheResult !== null){
		console.log('got a cachedResult');
		//console.log(cacheResult)
		//not null so lets do a callback
		return cacheResult;
	}

	console.log('no cached result so lets grab some data!');

	var options = {
		url : URL,
		json : true
	}

	return RP.get(options)
	.then(function(response){
		console.log('no cache');
		//put response in cache
		CACHE.put(URL, response, CACHE_TIME);
		console.log(CACHE.keys());
		//do call back
		return response;
	})
	.catch(function(err){
		console.log(err);
		throw error;
	});

}

const Pokedex = (function(){

	function Pokedex(){}

	//pokemon api list here
	Pokedex.prototype.getPokemon = function(name){
		var url = BASE_URL + 'pokemon/' + name;
		return getJSON(url);
	};

	return Pokedex;

})();

module.exports = Pokedex;