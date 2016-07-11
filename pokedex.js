const RP = require('request-promise');
const DITTO = require('memory-cache');
const BASE_URL = 'http://pokeapi.co/api/v2/';	
const CACHE_TIME = 1000000 * 7; // 1 week

function Pokedex(){};

Pokedex.prototype = {

	getPokemon : function(name){
		var url = BASE_URL + 'pokemon/' + name;
		return url;
		// return this.getJSON(url);
	},
	getSpecies : function(name){
		var url = BASE_URL + 'pokemon-species/' + name + '/';
		return url;
		// return this.getJSON(url);
	},
	getEvolutionChain : function(name){
		//var url = BASE_URL + 'evolution-chain/' + name + '/';
		var url = name; //this returns us the whole URL
		return url;
		// return this.getJSON(url);
	},
	getJSON : function(URL){
		const cacheResult = DITTO.get(URL);
		//console.log(DITTO.keys());
		if(cacheResult !== null){
			console.log('cached for [' + URL + ']');
			return Promise.resolve(cacheResult); //allows us to use .then
		}
		var options = {
			url : URL,
			json : true
		}
		return RP.get(options)
		.then(function(response){
			//put response in cache
			console.log('no cache for [' + URL + ']');
			DITTO.put(URL, response, CACHE_TIME);
			console.log(DITTO.keys());
			return response;
		})
		.catch(function(err){
			console.log(err);
			throw error;
		});
	}

}

module.exports = Pokedex;