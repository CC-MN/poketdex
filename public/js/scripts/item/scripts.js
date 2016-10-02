// GLOBAL VARIABLES
var URL_PARAMS = {};
var ITEM_NAMES = [];
var PAGE_TYPE = "item";
var POKEDEXTEXT = null;
var DEXTER_STATE = 0;



$(document).ready(function(){
	getQS(URL_PARAMS);

	//auto complete for pokemon search
	setAutoComplete(responseItemNames.results, 'itemSearchBox', ITEM_NAMES);
	//set POKEDEXTEXT
	getDexterText();
  
  //page bindings
  setItemPageBindings();

  //gets full item description
  getItemDescription();

  //finds all pokemon that hold this item and lists them
  checkIfHeld();

  //checks if item triggers a baby form
  //removed for now as requires ajax request
  // checkBabyItem();

});

$(window).on('beforeunload', function(){
	if(responsiveVoice.isPlaying()){
		responsiveVoice.cancel();
	}
});
