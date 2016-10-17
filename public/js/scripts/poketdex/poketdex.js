(function() {

 'use strict';

	this.PoketDex = function(array, element){
		console.log(this);
		this.pokemonArray = array;
		this.pokemonElement = element;
		this.Utilities = new Utilities();
		// console.log(this);

		this.getID(this.pokemonArray);

	}

	/*	
		Prototype Methods
	*/
	// PoketDex.prototype = new Utilities(); //pull in all our utility functions
	PoketDex.prototype = {
		getID  : function(array){
			var _self = this;
			var names = [];
			for(var i = 0; i < array.length; i++){
				var id = _self.Utilities.getIDFromPokemonURL(array[i].url);
				var pokemonName = array[i].name;
				var object = {
					id 					: 	id,
					pokemonName : 	pokemonName
				}
				names.push(pokemonName);
				_self.listPokemon(object);
			}

			this.pokemonNames = names;
		},
		listPokemon : function(object){
			var imageUrl = '/images/dex/pokemon-large/' + object.id + '.png';
			// imageUrl = ( imageExists(imageUrl) ) ? imageUrl : '/images/dex/default.png';
		
			var html 		= 		'<div class="pokemon">';
			html 				+= 		'<div class="pokemonId">#' + object.id + '</div>';
			html 				+= 		'<div class="pokemonName">' + object.pokemonName.replace(/\-/g, ' ') + '</div>';
			html				+=		'<div class="pokemonImage"><img src="' + imageUrl + '" /></div>'
			html 				+=		'</div>';

			document.querySelector(this.pokemonElement).innerHTML += html;
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

    var exists = (http.status === 200) ? true : false;
    return exists;

	}

}).call(this);
