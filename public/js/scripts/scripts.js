var URL_PARAMS = {};


$(document).ready(function(){
	getQS(URL_PARAMS);

	console.log("starting loop");
	console.log(responsePokemonSpecies.flavor_text_entries);
	for (var i = 0; i < 5; i ++) {
		// console.log("this actually works");
		if (responsePokemonSpecies.flavor_text_entries[i].language.name === "en") {
			window.pokedexText = responsePokemonSpecies.flavor_text_entries[i].flavor_text
			console.log("you got: " + responsePokemonSpecies.flavor_text_entries[i].language.name);
		}
	};

	// binding dexter click event
	$('#dexter').click(function(){
		// var pokedexText = responsePokemonSpecies.flavor_text_entries[1].flavor_text;
		// console.log(pokedexText);
		speak(window.pokedexText);
	});

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