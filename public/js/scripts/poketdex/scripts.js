$(document).ready(function(){

	var poketdex = new PoketDex(responsePokemon.results, '.pokemonList');
	console.log(poketdex);

  // set global bindings
  $('#navButton').click(function(){
    poketdex.Utilities.openNav();
  });

  $('.closebtn').click(function(){
    poketdex.Utilities.closeNav();
  });

});