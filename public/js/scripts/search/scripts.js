var Utilities = new Utilities();
var PoketDex = new PoketDex(responsePokemon.results, '.pokemonList');

$(document).ready(function(){
	console.log(Utilities);
	console.log(PoketDex);

	$('#filter').click(function(){
		var type1 = $('#type1').val() || null;
		var type2 = $('#type2').val() || null;
		console.log(type1, type2);
		filterType(type1, type2)
	});

	$('#reset').click(function(){
		PoketDex.reset();
	});

	$('#andor span').click(function(){
		PoketDex.toggleRule();
	});

	$('#type1').change(function(){
		PoketDex.toggleInputs();
	});

	$('#type2').change(function(){
		PoketDex.resetRule();
	});

});