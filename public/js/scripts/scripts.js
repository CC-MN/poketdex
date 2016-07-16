// GLOBAL VARIABLES
var URL_PARAMS = {};
var POKEDEXTEXT = null;
var POKEMONMAX = 720;
var POKEMONMIN = 1;
var DEXTER_STATE = 0;
var FLAMEBODY = "off"
var BREEDING_CYCLES = 1;
var BREEDING_STEPS_PER_CYCLE = 257;
var BREEDING_MOD_CYCLES = 1;
var BREEDING_MOD_STEPS = 257;

$(document).ready(function(){
	getQS(URL_PARAMS);
	BREEDING_CYCLES = responsePokemonSpecies.hatch_counter + 1;
	BREEDING_MOD_CYCLES = responsePokemonSpecies.hatch_counter + 1;


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

	//handles first and last pokemon
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
			if(url){
				requestInfo(contentClass.trim(), url);
			}
		}
		
	});

	//Gets ability information from abilities.js object
	for (var i = 0; i < responsePokemon.abilities.length ; i++) {
		getAbilityDetail(i);
	};
	

	//breeding scripts
	//calculating gender
	if(responsePokemonSpecies.gender_rate == -1) {
		$("#genderChart").html("This pokemon has no gender.");
	}else {
		console.log("gender rate: " + responsePokemonSpecies.gender_rate);
		var genderFemale = responsePokemonSpecies.gender_rate / 8 * 100;
		var genderMale = 100 - genderFemale;
		$("#genderChartFemale").width(genderFemale + "%");
		$("#genderChartFemale").html(genderFemale + "%");
		$("#genderChartMale").width(genderMale + "%");
		$("#genderChartMale").html(genderMale + "%");
	}

	//finds egg groups
	responsePokemonSpecies.egg_groups[0].name

	//calculating base egg steps
	calculateEggSteps(BREEDING_CYCLES,BREEDING_STEPS_PER_CYCLE);

  
  //binding functions to egg calculator
  $('#flamebody').click(function(){
  	flameBody(BREEDING_CYCLES);
  });

  $('#opower').change(function(){
  	opower(BREEDING_STEPS_PER_CYCLE,this.value);
  });


	//set chart data
	barChartData = {
		labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
		datasets: [{
			//label: 'Stat',
			backgroundColor: ["#FF5959", "#F5AC78", "#FAE078", "#9DB7F5", "#A7DB8D", "#FA92B2"],
			data: [responsePokemon.stats[5].base_stat, responsePokemon.stats[4].base_stat, responsePokemon.stats[3].base_stat, responsePokemon.stats[2].base_stat, responsePokemon.stats[1].base_stat, responsePokemon.stats[0].base_stat]
		}]

	};
  //end chart data
  buildChart(barChartData);


});

$(window).on('beforeunload', function(){
	if(responsiveVoice.isPlaying()){
		responsiveVoice.cancel();
	}
});
