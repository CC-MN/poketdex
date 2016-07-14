// GLOBAL VARIABLES
var URL_PARAMS = {};
var POKEDEXTEXT = null;
var POKEMONMAX = 720;
var POKEMONMIN = 1;
var DEXTER_STATE = 0;
var FLAMEBODY = "off"
var BREEDING_FLAMEBODYSTEPS = 0;
var BREEDING_OPOWERSTEPS = 0;
var FLAMEBODY_MOD = 1;
var OPOWER_MOD = 1;
var BREEDING_CYCLES = 1;
var BREEDING_STEPS_PER_CYCLE = 257;

$(document).ready(function(){
	getQS(URL_PARAMS);
	console.log("cycles: " + BREEDING_CYCLES);
	BREEDING_CYCLES = responsePokemonSpecies.hatch_counter + 1;
	console.log("cycles: " + BREEDING_CYCLES);
	
	//sense checking for breeding
	// var number = 100
	// var numberModifier = number / 1.25;
	// console.log(number);
	// console.log(numberModifier - number);


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

	//breeding scripts
	calculateEggSteps(BREEDING_CYCLES,BREEDING_STEPS_PER_CYCLE);
  // var breedingStepsToHatch = (responsePokemonSpecies.hatch_counter + 1) * 257;
  // $("#totalSteps").html(breedingStepsToHatch);

  // $('#flamebody').click(function(){
  // 	flameBody(breedingStepsToHatch);
  // });

  // $('#opower').change(function(){
  // 	opower(breedingStepsToHatch,this.value);
  // });


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
  buildChart(barChartData);


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
