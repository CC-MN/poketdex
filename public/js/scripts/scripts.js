var URL_PARAMS = {};


$(document).ready(function(){
	getQS(URL_PARAMS);
	window.pokedexText = speciesPokeApi.flavor_text_entries[1].flavor_text;
	console.log(speciesPokeApi);
	console.log(pokedexText);
	speak();
});

var speak = function() {
  responsiveVoice.speak(window.pokedexText, "UK English Male");
      };