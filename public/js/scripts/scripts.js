// GLOBAL VARIABLES
var URL_PARAMS = {};
var POKEDEXTEXT = null;
var POKEMONMAX = 720;
var POKEMONMIN = 1;
var DEXTER_STATE = 0;
// var pokedexList = {"1":"Bulbasaur", "2":"Ivysaur", "3":"Venusaur", "4":"Charmander"};

$(document).ready(function(){
	getQS(URL_PARAMS);

	//builds pokdex list in select input
	$.each(pokedexList, function(key, value) {
		$('#pokedexList')
		.append($("<option></option>")
			.attr("value",key)
			.text(key + " " + value));
		// console.log("logging: " + key + value)
	});


	//get dexter text
	$.each(responsePokemonSpecies.flavor_text_entries, function(index, value){
		var v = value;
		if(v.language.name === 'en'){
			POKEDEXTEXT = v.flavor_text;
			return false; //break out of .each loop
		}
	});

	// binding dexter click event
	$('#dexter').click(function(){
		if(POKEDEXTEXT){
			speak(POKEDEXTEXT);
		}
	});

	$("#pokedexList").val(responsePokemon.id);
	var pokemonNavPrevious = (parseInt(responsePokemon.id) === POKEMONMIN) ? POKEMONMAX : parseInt(responsePokemon.id) - 1;
	var pokemonNavNext = (parseInt(responsePokemon.id) === POKEMONMAX) ? POKEMONMIN : parseInt(responsePokemon.id) + 1;
	//set pokemonNav images and links
	$("#pokemonNavPreviousImage").attr("src", "/images/dex/pokemon-large/" + pokemonNavPrevious + ".png");
	$("#pokemonNavNextImage").attr("src", "/images/dex/pokemon-large/" + pokemonNavNext + ".png");
	$("#pokemonNavPreviousLink").attr("href", "./" + pokemonNavPrevious);
	$("#pokemonNavNextLink").attr("href", "./" + pokemonNavNext);

	//binding section tabs & configure AJAX requests
	$('section div.tab').click(function(){
		var contentClass = $(this).attr('class').replace('tab', '');
		contentClass = contentClass.replace('request', '');

		showSection(contentClass);

		if($(this).hasClass('request') && !$('#' + contentClass.trim()).hasClass('hidden')){
			var url = requestID(contentClass.trim());
			requestInfo(url);
		}
		
	});


	//set chart data
	barChartData = {
    labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: ["#FF5959", "#F5AC78", "#FAE078", "#9DB7F5", "#A7DB8D", "#FA92B2"],
      data: [responsePokemon.stats[5].base_stat, responsePokemon.stats[4].base_stat, responsePokemon.stats[3].base_stat, responsePokemon.stats[2].base_stat, responsePokemon.stats[1].base_stat, responsePokemon.stats[0].base_stat]
    }]

  };
  //end chart data
  console.log("here's chart data: " + responsePokemon.stats[0].base_stat + " and " + responsePokemon.stats[1].base_stat)
  buildChart(barChartData)

});

//builds baseStats Chart
// for (var i = 0; i < responsePokemon.stats.length; i++) {
// 	console.log(responsePokemon.stats[i].stat.name + ": " + responsePokemon.stats[i].base_stat);
// 	$('#stat-' + responsePokemon.stats[i].stat.name).css({"height": responsePokemon.stats[i].base_stat });

// };

$(window).on('beforeunload', function(){
	if(responsiveVoice.isPlaying()){
		responsiveVoice.cancel();
	}
});
