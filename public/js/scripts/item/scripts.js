// GLOBAL VARIABLES
var URL_PARAMS = {};
var PAGE_TYPE = "item";
var POKEDEXTEXT = null;
var DEXTER_STATE = 0;
var Utilities = new Utilities();

$(document).ready(function(){

  
	Utilities.getQS(URL_PARAMS);

	//auto complete for pokemon search
	Utilities.setAutoComplete(responseItemNames.results, 'itemSearchBox');
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
