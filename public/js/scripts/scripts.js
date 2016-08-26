// GLOBAL VARIABLES
var URL_PARAMS = {};
var POKEMON_MOVES = [];
var POKEMON_NAMES = [];
var POKEDEXTEXT = null;
var POKEMONMAX = 720;
var POKEMONMIN = 1;
var DEXTER_STATE = 0;
var FLAMEBODY = "off"
var BREEDING_CYCLES = 1;
var BREEDING_STEPS_PER_CYCLE = 257;
var BREEDING_MOD_CYCLES = 1;
var BREEDING_MOD_STEPS = 257;
var VERSION_GEN1 = ["blue","red", "yellow"];
var VERSION_GEN2 = ["gold","silver","crystal"];
var VERSION_GEN3 = ["ruby","sapphire", "emerald", "firered","leafgreen"];
var VERSION_GEN4 = ["diamond","pearl","platinum","heartgold","soulsilver"];
var VERSION_GEN5 = ["black","white","black-2","white-2"];
var VERSION_GEN6 = ["x","y","omega-ruby","alpha-sapphire"];


$(document).ready(function(){
	getQS(URL_PARAMS);
	BREEDING_CYCLES = responsePokemonSpecies.hatch_counter + 1;
	BREEDING_MOD_CYCLES = responsePokemonSpecies.hatch_counter + 1;

	//builds pokdex list in select input
	$.each(pokedexList, function(key, value) {
		$('#pokedexList')
		.append($("<option></option>")
			.attr("value",key)
			.text(key + " - " + value));
		// console.log("logging: " + key + value)
	});

	//auto complete for pokemon search
	pokemonAutoComplete();

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


	//type chart scripts
	damageChartSetStats(DAMAGE_TO_TYPE,responsePokemon);
	//moved the below to function.js, keeping short-term for reference
	// if (responsePokemon.types.length < 2) {
	// 	//calculate a single type effectiveness
	// 	var damageObjectType1 = DAMAGE_TO_TYPE[responsePokemon.types[0].type.name];
	// 	for(key in damageObjectType1){
	// 		//converts decimal values to symbols
	// 		if (damageObjectType1[key] == 0.25) {
	// 			damageObjectType1[key] = "¼"
	// 		}else if (damageObjectType1[key] == 0.5) {
	// 			damageObjectType1[key] = "½"
	// 		};
	// 		$("td." + key + ".damageValueCell").html(damageObjectType1[key]);
	// 	}
	// }else {
	// 	// calculate for both
	// 	var damageObjectType1 = DAMAGE_TO_TYPE[responsePokemon.types[0].type.name];
	// 	var damageObjectType2 = DAMAGE_TO_TYPE[responsePokemon.types[1].type.name];
	// 	for(key in damageObjectType2){
	// 		var combinedTypeDamage = damageObjectType2[key] * damageObjectType1[key];
	// 		if (combinedTypeDamage == 0.25) {
	// 			combinedTypeDamage = "¼"
	// 		}else if (combinedTypeDamage == 0.5) {
	// 			combinedTypeDamage = "½"
	// 		};
	// 		$("td." + key + ".damageValueCell").html(combinedTypeDamage);
	// 		$("td." + key + ".damageValueCell").addClass("damageRate" + combinedTypeDamage);
	// 	}
	// }
	console.log("number of abilities: " + responsePokemon.abilities.length);
	var damageChartAbilities = [];
	var damageChartAbilitiesHidden = [];
	for (var i = 0; i < responsePokemon.abilities.length; i++) {
		console.log(responsePokemon.abilities[i].ability.name);
		if (responsePokemon.abilities[i].ability.name == "dry-skin" ||
			responsePokemon.abilities[i].ability.name == "filter" ||
			responsePokemon.abilities[i].ability.name == "flash-fire" ||
			responsePokemon.abilities[i].ability.name == "heatproof" ||
			responsePokemon.abilities[i].ability.name == "levitate" ||
			responsePokemon.abilities[i].ability.name == "sap-sipper" ||
			responsePokemon.abilities[i].ability.name == "solid-rock" ||
			responsePokemon.abilities[i].ability.name == "thick-fat" ||
			responsePokemon.abilities[i].ability.name == "volt-absorb" ||
			responsePokemon.abilities[i].ability.name == "water-absorb") {
			if (responsePokemon.abilities[i].is_hidden == true) {
				damageChartAbilitiesHidden.push(responsePokemon.abilities[i].ability.name);
				$("#abilityHiddenModifierName").html(responsePokemon.abilities[i].ability.name);
			}else{
				damageChartAbilities.push(responsePokemon.abilities[i].ability.name)
				$("#abilitySelect").append("<option value='" + responsePokemon.abilities[i].ability.name + "'>" + responsePokemon.abilities[i].ability.name + "</option>");
			}
		};
	};
	console.log("chart abilities: " + damageChartAbilities);
	if (damageChartAbilities.length < 1 && damageChartAbilitiesHidden < 1) {
		$("#damageControls").addClass("hidden");		
	} else if (damageChartAbilities.length < 1) {
		$("#abilityModifier").addClass("hidden");
	} else if (damageChartAbilitiesHidden.length < 1) {
		$("#abilityHiddenModifier").addClass("hidden");
	};
	if (damageChartAbilities.length >= 1) {
		//binding modify function to select
		$('#abilitySelect').change(function(){
			changeAbility();
		});
	};

	//evolution scripts
	

	//breeding scripts
	//calculating gender
	if(responsePokemonSpecies.gender_rate == -1) {
		$("#genderChart").html("This Pokémon has no gender.");
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

	if (responsePokemonSpecies.egg_groups[0].name == "no-eggs") {
		console.log("no babies for you");
		$("#groupTitle").addClass("hidden");
		$("#groupContainer").addClass("hidden");
		$("#hatchingTitle").addClass("hidden");
		$("#hatchingContainer").addClass("hidden");
		$("#stepsChart").addClass("hidden");
		$("#genderContainer").append("This Pokémon cannot breed.");
	};

	//calculating base egg steps
	calculateEggSteps(BREEDING_CYCLES,BREEDING_STEPS_PER_CYCLE);


  //binding functions to egg calculator
  $('#flamebody').click(function(){
  	flameBody(BREEDING_CYCLES);
  });

  $('#opower').change(function(){
  	opower(BREEDING_STEPS_PER_CYCLE,this.value);
  });
  
  //build css chart
  // console.log(responsePokemon.stats[5].base_stat);
  // console.log(responsePokemon.stats[5].base_stat / 255 * 100);
  $('#statHP').width(responsePokemon.stats[5].base_stat / 255 * 100 + "%");
  $('#statHP').html(responsePokemon.stats[5].base_stat);
  $('#statAttack').width(responsePokemon.stats[4].base_stat / 255 * 100 + "%");
  $('#statAttack').html(responsePokemon.stats[4].base_stat);
  $('#statDefense').width(responsePokemon.stats[3].base_stat / 255 * 100 + "%");
  $('#statDefense').html(responsePokemon.stats[3].base_stat);
  $('#statSpAttack').width(responsePokemon.stats[2].base_stat / 255 * 100 + "%");
  $('#statSpAttack').html(responsePokemon.stats[2].base_stat);
  $('#statSpDefense').width(responsePokemon.stats[1].base_stat / 255 * 100 + "%");
  $('#statSpDefense').html(responsePokemon.stats[1].base_stat);
  $('#statSpeed').width(responsePokemon.stats[0].base_stat / 255 * 100 + "%");
  $('#statSpeed').html(responsePokemon.stats[0].base_stat);


	// //set chart data
	// barChartData = {
	// 	labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
	// 	datasets: [{
	// 		//label: 'Stat',
	// 		backgroundColor: ["#FF5959", "#F5AC78", "#FAE078", "#9DB7F5", "#A7DB8D", "#FA92B2"],
	// 		data: [responsePokemon.stats[5].base_stat, responsePokemon.stats[4].base_stat, responsePokemon.stats[3].base_stat, responsePokemon.stats[2].base_stat, responsePokemon.stats[1].base_stat, responsePokemon.stats[0].base_stat]
	// 	}]

	// };
 //  //end chart data
 //  buildChart(barChartData);

  //build css chart
  

  //pokemon moves, store all the move name in a single array
  POKEMON_MOVES = getMoveList();
  if(POKEMON_MOVES.length){
  	buildMoveList(POKEMON_MOVES);
  }

});

$(window).on('beforeunload', function(){
	if(responsiveVoice.isPlaying()){
		responsiveVoice.cancel();
	}
});
