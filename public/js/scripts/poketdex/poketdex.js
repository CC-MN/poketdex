(function() {

	this.PoketDex = function(array, element){

		this.pokemonArray = array;
		this.pokemonElement = element;
		// console.log(this);

		this.getID(this.pokemonArray);

	}

	/*	
		Prototype Methods
	*/

	PoketDex.prototype = {
		getID : function(array) {
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

		},

		listPokemon : function(object){

			var imageUrl = '/images/dex/pokemon-large/' + object.id + '.png';
			imageUrl = ( imageExists(imageUrl) ) ? imageUrl : '/images/dex/default.png';
		
			var html 		= 		'<div class="pokemon">';
			html 				+= 		'<div class="pokemonId">#' + object.id + '</div>';
			html 				+= 		'<div class="pokemonName">' + object.pokemonName.replace(/\-/g, ' ') + '</div>';
			html				+=		'<div class="pokemonImage"><img src="' + imageUrl + '" /></div>'
			html 				+=		'</div>';

			$(this.pokemonElement).append(html);

		}
	}

	/*	
		Private Methods
	*/

	function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    // console.log(http);
    // console.log(http.status);

    var exists = (http.status === 200) ? true : false;

    return exists;

	}

}());
	