const RP = require('request-promise');
const DITTO = require('memory-cache');
const MAP = require('promise-map');
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
		var url = BASE_URL + 'evolution-chain/' + name + '/';
		return url;
		// return this.getJSON(url);
	},
	getJSON : function(URLS){

		return Promise.resolve(URLS).then(MAP(function(url){
			//loop through our URL list and 
			//return back an array of the results in order of URLs passed
			var cacheResult = DITTO.get(url);
			if(cacheResult !== null){
				console.log('cached result for [' + url + ']');
				console.log(DITTO.keys());
				return cacheResult;
			}

			var options = {
				url : url,
				json : true
			}

			return RP.get(options).then(function(response){
				console.log('no cache result for [' + url + ']');
				DITTO.put(url, response, CACHE_TIME);
				console.log(DITTO.keys());
				return response;
			}).catch(function(err){
				console.log(err);
				//throw new Error(err);
			});
			
		}));

	}

}

module.exports = Pokedex;