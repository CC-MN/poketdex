const RP = require('request-promise');
const CACHE = require('memory-cache');

const BASE_URL = 'http://pokeapi.co/api/v2/';	
const CACHE_TIME = 1000000 * 7; // 1 week

function Pokedex(){};

Pokedex.prototype = {

	getPokemon : function(name){
		var url = BASE_URL + 'pokemon/' + name;
		return this.getJSON(url);
	},
	getSpecies : function(name){
		var url = BASE_URL + 'pokemon-species/' + name + '/';
		return this.getJSON(url);
	},
	getJSON : function(URL){
		const cacheResult = CACHE.get(URL);
		//console.log(CACHE.keys());

		if(cacheResult !== null){
			console.log('cached');
			return cacheResult;
		}

		var options = {
			url : URL,
			json : true
		}

		return RP.get(options)
		.then(function(response){
			//put response in cache
			console.log('no cache');
			CACHE.put(URL, response, CACHE_TIME);
			console.log(CACHE.keys());
			return response;
		})
		.catch(function(err){
			console.log(err);
			throw error;
		});
	}

}

module.exports = Pokedex;