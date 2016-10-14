$(document).ready(function(){
	var poketdex = new PoketDex(responsePokemon.results, '.pokemonList');

	console.log(poketdex);
	// auto complete for pokemon search
	// setAutoComplete(poketdex.pokemonNames, 'pokemonSearchBox', poketdex.pokemonNames);

});