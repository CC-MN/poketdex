var filterType = function(type1,type2){
  Utilities.showOverlay();

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
        PoketDex.manageFilterRequest(typePokemon.pokemon, true, false, true);
        return;
      }else{
        PoketDex.manageFilterRequest(typePokemon.pokemon, false, and, true);
      }
      // PoketDex.getID(typePokemon.pokemon,'type');
      // $('.overlay').addClass('hidden');
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
      PoketDex.manageFilterRequest(type2Pokemon.pokemon, true, and, false)
    }
  }

}



