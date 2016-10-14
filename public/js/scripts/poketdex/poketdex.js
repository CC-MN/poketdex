function PoketDex(array, element){
	this.pokemonArray = array;
	this.pokemonElement = element;
	console.log(this);

	this.getID(this.pokemonArray);
}

PoketDex.prototype.getID = function(array) {
	var _self = this;
	var names = [];
	$.each(array, function(i, v){
		var id = getIDFromPokemonURL(v.url);
		var pokemonName = v.name;
		var object = {
			id 					: 	id,
			pokemonName : 	pokemonName
		};
		names.push(pokemonName);
		_self.listPokemon(object)

	});

	this.pokemonNames = names;

};

PoketDex.prototype.listPokemon = function(object){
	
	var html 		= 		'<div class="pokemon">';
	html 				+= 		'<div class="pokemonId">#' + object.id + '</div>';
	html 				+= 		'<div class="pokemonName">' + object.pokemonName + '</div>';
	html				+=		'<div class="pokemonImage"><img src="/images/dex/pokemon-large/' + object.id + '.png" /></div>'
	html 				+=		'</div>';

	$(this.pokemonElement).append(html);

}