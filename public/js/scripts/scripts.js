var URL_PARAMS = {};


$(document).ready(function(){
	getQS(URL_PARAMS);
	var pokemonNavPrevious = responsePokemon.id - 1
	var pokemonNavNext = responsePokemon.id + 1

	for (var i = 0; i < responsePokemonSpecies.flavor_text_entries.length; i ++) {
		if (responsePokemonSpecies.flavor_text_entries[i].language.name === "en" && responsePokemonSpecies.flavor_text_entries[i].version.name === "alpha-sapphire") {
			window.pokedexText = responsePokemonSpecies.flavor_text_entries[i].flavor_text
			// console.log("you got: " + responsePokemonSpecies.flavor_text_entries[i].language.name);
			// console.log("you got: " + responsePokemonSpecies.flavor_text_entries[i].flavor_text);
		}
	};


	// binding dexter click event
	$('#dexter').click(function(){
		// var pokedexText = responsePokemonSpecies.flavor_text_entries[1].flavor_text;
		// console.log(pokedexText);
		speak(window.pokedexText);
	});

	$("#pokedexList").val(responsePokemon.id);
	$("#pokemonNavPrevious").src("/images/dex/pokemon-large/" + pokemonNavPrevious ".png");
	$("#pokemonNavNext").src("/images/dex/pokemon-large/" + pokemonNavNext ".png");

});

var speak = function(pokedexText) {
	responsiveVoice.speak(pokedexText, "UK English Male");
};

// Set the width of the side navigation to show 
function openNav() {
	$('#mySidenav').css('width', '50%');
}

// Set the width of the side navigation to 0 
function closeNav() {
	$('#mySidenav').css('width','0px');
}

function changePokemon(pokemonID) {
	window.location = "./" + pokemonID;
}

//get selected option and set text
//$( "#myselect option:selected" ).text();