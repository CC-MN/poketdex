var URL_PARAMS = {};


$(document).ready(function(){
	getQS(URL_PARAMS);
	console.log(speciesPokeApi);
	$('#dexter').click(function(){
		var pokedexText = speciesPokeApi.flavor_text_entries[1].flavor_text;
		console.log(pokedexText);
		speak(pokedexText);
	});
});

var speak = function(pokedexText) {
  responsiveVoice.speak(pokedexText, "UK English Male");
      };