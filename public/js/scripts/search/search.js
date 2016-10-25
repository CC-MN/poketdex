(function() {

 'use strict';

	var PoketDex = function(array, element){
		/*	
			Set the object
		*/
		console.log(this);
		this.pokemonArray = array;
		this.pokemonElement = element;
	}

	/*	
		Prototype Methods
	*/
	PoketDex.prototype = {
		getID  : function(array, type){
			var _self = this;
			var names = [];
			var ids		= [];
			for(var i = 0; i < array.length; i++){
				var id = (type === 'type') ? Utilities.getIDFromPokemonURL(array[i].pokemon.url) : Utilities.getIDFromPokemonURL(array[i].url);
				var pokemonName = (type === 'type') ? array[i].pokemon.name : array[i].name;
				var object = {
					id 					: 	id,
					pokemonName : 	pokemonName
				}
				ids.push(id);
				names.push(pokemonName);
				_self.listPokemon(object);
			}
			if(!this.pokemonName){
				this.pokemonIds		= ids;
				this.pokemonNames = names;
			}
		},
		listPokemon : function(object){
			var imageUrl = '/images/dex/pokemon-large/' + object.id + '.png';
			// imageUrl = ( imageExists(imageUrl) ) ? imageUrl : '/images/dex/default.png';
		
			var html 		= 		'<a href="../pokemon/' + object.id + '"><div class="pokemon">';
			html				+=		'<div class="pokemonImage"><img src="' + imageUrl + '" /></div>'
			html 				+= 		'<div class="pokemonId">#' + object.id + '</div>';
			html 				+= 		'<div class="pokemonName">' + object.pokemonName.replace(/\-/g, ' ') + '</div>';
			html 				+=		'</div></a>';

			document.querySelector(this.pokemonElement).innerHTML += html;
		},
		reset : function() {
			console.log('-----reset------')
			console.log(this);
		  $(".typeSelect").val('');
		  $("#type2").prop('disabled', true);
		  $("#filter").prop('disabled', true);
		  $('div.pokemonList').html(' ');
		  this.getID(this.pokemonArray, null);
		},

		toggleRule : function(){
		  if ( $('#andor').text().toLowerCase() === 'or') {
		    $('#andor span').text('And');
		  }else{
		    $('#andor span').text('Or');
		  }
		},
		toggleInputs : function() {
		  if ( $("#type1").val() != '') {
		    $("#type2").prop('disabled', false);
		    $("#filter").prop('disabled', false);
		  }else{
		    $("#type2").val('');
		    $("#type2").prop('disabled', true);
		    $("#filter").prop('disabled', true);
		  }
		},
		resetRule : function(){
		  if ($("#type2").val() == '') {
		    $('#andor span').text('Or');
		  };
		},

		filterType : function(type1, type2){
			Utilities.showOverlay();
			var _self = this;

		  var msg = (!type2) ? 'Searching for ' + type1 + ' Pokémon...' : 'Searching for ' + type1 + ' and ' + type2 + ' Pokémon...';
		  var and = ($('#andor').text().toLowerCase() === 'and') ? true : false;
		  $('#loadingMessage').html(msg);
		  $('div.pokemonList').html(' ');
		  var xhr = new XMLHttpRequest();
		  xhr.open("GET","http://pokeapi.co/api/v2/type/" + type1 + "/", true);
		  xhr.send();

		  xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4 && xhr.status == 200) {
		      var typePokemon = JSON.parse(xhr.responseText);
		      if(!type2){
		        _self.manageFilterRequest(typePokemon.pokemon, true, false, true);
		        return;
		      }else{
		        _self.manageFilterRequest(typePokemon.pokemon, false, and, true);
		      }
		    }
		  }

		  if(!type2){
		    return; //lets get out of function is no type 2
		  }
		  //lets get our second type
		  var xhr2 = new XMLHttpRequest();
		  xhr2.open("GET","http://pokeapi.co/api/v2/type/" + type2 + "/", true);
		  xhr2.send();
		  xhr2.onreadystatechange = function(){
		    if(xhr2.readyState == 4 && xhr2.status == 200){
		      var type2Pokemon = JSON.parse(xhr2.responseText);
		      _self.manageFilterRequest(type2Pokemon.pokemon, true, and, false)
		    }
		  }
		},

		manageFilterRequest : function(response, show, and, empty){
			// console.log(this);
			// console.log(response);
			var _self = this;
			if(empty){
				_self.pokemonIds = [];
				_self.pokemonIds = _self.pokemonIds.concat(response);
			}

			if(!and && !empty){
				//or statement so lets add response
				_self.pokemonIds = _self.pokemonIds.concat(response);
			}

			if(and && show){
				// and statement
				// lets compare the response with our current pokemonId's if it exists already leave it else we remove

				var array = [];
				console.log(_self);
				$.each(_self.pokemonIds, function( index, value ) {

		      for( var i=0, len=response.length; i<len; i++ ){
	          if( Utilities.getIDFromPokemonURL( response[i].pokemon.url ) === Utilities.getIDFromPokemonURL(_self.pokemonIds[index].pokemon.url) ) {
	            array.push(value);
	          }
		      }
		      // return true;
			  });	
			  
				_self.pokemonIds = array;
			}

			if(show){
				// console.log(_self.pokemonIds);
				_self.getID(_self.pokemonIds, 'type');
				$('.overlay').addClass('hidden');
			}

			return;

		}

	}

	function init(){
		/*
			Run on page load
		*/
		var me = self.PoketDex;
		
		me.getID(me.pokemonArray);

	}

	// set Event Listener to run once DOM has loaded
	if(typeof Document){
		document.addEventListener("DOMContentLoaded", init);
	}

	// Make sure to export PoketDex on self when in a browser
	if (typeof self !== "undefined") {
		self.PoketDex = PoketDex;
	}

	// Expose PoketDex as a CJS module (ES5)
	if (typeof module === "object" && module.exports) {
		module.exports = PoketDex;
	}

	return PoketDex;

}());
