// GLOBAL VARIABLES
var URL_PARAMS = {};
var PAGE_TYPE = "pokemon";
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
	
	//check for abilities that may update damage chart
	checkAbilityDamageModifier(responsePokemon);
	
	//breeding scripts
	determineGenderAndBreeding(responsePokemonSpecies);

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
