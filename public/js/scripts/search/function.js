var filterType = function(type1,type2){
  Utilities.showOverlay();
  var xhr = new XMLHttpRequest();
  var xhr2 = new XMLHttpRequest();
  xhr.open("GET","http://pokeapi.co/api/v2/type/" + type1 + "/",true);
  xhr.send();
  console.log(type1);
  $('#loadingMessage').html('Searching for ' + type1 + ' Pokémon...');
  xhr2.open("GET","http://pokeapi.co/api/v2/type/" + type2 + "/",true);
  xhr2.send();
  console.log(type2);
  // $('#loadingMessage').append('<br /> Also searching for ' + type2 + ' Pokémon...');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var type1Pokemon = JSON.parse(xhr.responseText);
      $('div.pokemonList').html(' ');
      processResponse(type1Pokemon.pokemon);
      $('.overlay').addClass('hidden');
    }
  }
  
  // PoketDex.prototype.listPokemon(type1Pokemon);
  xhr2.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var type2Pokemon = JSON.parse(xhr2.responseText);
      console.log(type2Pokemon);
    }
  }
}

var processResponse = function(response){
  console.log('starting loop');
  console.log(response);
  console.log('response length: ' + response.length);
  for (var i = 0; i < response.length; i++) {
        console.log(i);
        console.log(response[i]);
        rebuildPokemonList(response[i]);
      };
}

var rebuildPokemonList = function(object){
  var id = Utilities.getIDFromPokemonURL(object.pokemon.url);
  var imageUrl = '/images/dex/pokemon-large/' + id + '.png';
  var html    =     '<a href="/pokemon/' + id + '"><div class="pokemon">';
  html        +=    '<div class="pokemonImage"><img src="' + imageUrl + '" /></div>'
  html        +=    '<div class="pokemonId">#' + id + '</div>';
  html        +=    '<div class="pokemonName">' + object.pokemon.name.replace(/\-/g, ' ') + '</div>';
  html        +=    '</div></a>';
  $('div.pokemonList').append(html);
}