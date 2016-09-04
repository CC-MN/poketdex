// GLOBAL VARIABLES
var URL_PARAMS = {};
var POKEMON_MOVES = [];
var POKEMON_NAMES = [];
var POKEDEXTEXT = null;
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
var MODIFIER_ABILITIES = ['dry-skin', 'filter', 'flash-fire', 'heatproof', 'levitate', 'sap-sipper', 'solid-rock', 'thick-fat', 'volt-absorb', 'water-absorb'];


$(document).ready(function(){
	getQS(URL_PARAMS);

	BREEDING_CYCLES = responsePokemonSpecies.hatch_counter + 1;
	BREEDING_MOD_CYCLES = responsePokemonSpecies.hatch_counter + 1;

	//auto complete for pokemon search
	pokemonAutoComplete();
	//set POKEDEXTEXT
	getDexterText();

	//Gets ability information from abilities.js object
	getAbilityDetail(responsePokemon.abilities);

	//type chart scripts
	damageChartSetStats(DAMAGE_TO_TYPE,responsePokemon);
	
	console.log("number of abilities: " + responsePokemon.abilities.length);
	var damageChartAbilities = [];
	var damageChartAbilitiesHidden = [];
	for (var i = 0; i < responsePokemon.abilities.length; i++) {
		console.log(responsePokemon.abilities[i].ability.name);
		if ( MODIFIER_ABILITIES.indexOf(responsePokemon.abilities[i].ability.name) > -1 ) {
			if (responsePokemon.abilities[i].is_hidden == true) {
				damageChartAbilitiesHidden.push(responsePokemon.abilities[i].ability.name);
				$("#abilityHiddenModifierName").html(responsePokemon.abilities[i].ability.name);
			}else{
				damageChartAbilities.push(responsePokemon.abilities[i].ability.name)
				$("#abilitySelect").append("<option value='" + responsePokemon.abilities[i].ability.name + "'>" + responsePokemon.abilities[i].ability.name + "</option>");
			}
		};
	};

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
	
	//breeding scripts
	//calculating gender
	if(responsePokemonSpecies.gender_rate == -1) {
		$("#genderChart").html("This Pokémon has no gender.");
	}else {
		console.log("gender rate: " + responsePokemonSpecies.gender_rate);
		var genderFemale = responsePokemonSpecies.gender_rate / 8 * 100;
		var genderMale = 100 - genderFemale;
		// $("#genderChartFemale").width(genderFemale + "%");
		$("#genderChartFemale").html(genderFemale + "%").width(genderFemale + '%');
		$("#genderChartMale").html(genderMale + "%").width(genderMale + '%');
	}

	//finds egg groups

	if (responsePokemonSpecies.egg_groups[0].name == "no-eggs") {
		console.log("no babies for you");
		$('.eggGrouping').addClass('hidden');
		$("#genderContainer").append("This Pokémon cannot breed.");
	};

	//calculating base egg steps
	calculateEggSteps(BREEDING_CYCLES,BREEDING_STEPS_PER_CYCLE);
  
  //build css chart
  buildStatsChart();

  //pokemon moves, store all the move name in a single array
  getMoveList();
  
  //page bindings
  setPokemonPageBindings();

});

$(window).on('beforeunload', function(){
	if(responsiveVoice.isPlaying()){
		responsiveVoice.cancel();
	}
});
