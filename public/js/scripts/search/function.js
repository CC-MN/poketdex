var filterType = function(type1,type2){
  Utilities.showOverlay();
  if (type2 == '') {
    //run single xhr;
    console.log('type 1 is ' + type1);
    console.log('type 2 is empty');
    $('#loadingMessage').html('Searching for ' + type1 + ' Pokémon...');
    $('div.pokemonList').html(' ');
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://pokeapi.co/api/v2/type/" + type1 + "/",true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var typePokemon = JSON.parse(xhr.responseText);
        buildPokemonDiv(typePokemon.pokemon,'type');
        $('.overlay').addClass('hidden');
      }
    }
  } else{
    console.log('type 1 is ' + type1);
    console.log('type 2 is ' + type2);
    var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();
    xhr.open("GET","http://pokeapi.co/api/v2/type/" + type1 + "/",true);
    xhr.send();
    console.log(type1);
    //need to add an if statement to build and or message for loading
    $('#loadingMessage').html('Searching for ' + type1 + ' and ' + type2 + ' Pokémon...');
    xhr2.open("GET","http://pokeapi.co/api/v2/type/" + type2 + "/",true);
    xhr2.send();
    console.log(type2);
    $('div.pokemonList').html(' ');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var type1Pokemon = JSON.parse(xhr.responseText);
        // processResponse(Type1,typePokemon.pokemon);
      //nested callback
      xhr2.onreadystatechange = function() {
        // console.log('hi gilbert');
        if (xhr2.readyState == 4 && xhr2.status == 200) {
          var type2Pokemon = JSON.parse(xhr2.responseText);
          console.log(type2Pokemon.pokemon);
          // console.log(typePokemon);
          // processResponse(Type2,typePokemon.pokemon);
          $('.overlay').addClass('hidden');
          if ($('#andor').text() == 'And') {
            console.log('AND RULE');
            //run query and cross-reference
            $('#loadingMessage').html('Checking for Pokémon that are both ' + type1 + ' and ' + type2);
            compareResults(type1Pokemon.pokemon,type2Pokemon.pokemon);
          } else{
            console.log('OR RULE');
            // compareResults(type1Pokemon.pokemon,type2Pokemon.pokemon);
            buildPokemonDiv(type1Pokemon.pokemon,'type');
            buildPokemonDiv(type2Pokemon.pokemon,'type');
          }
        }
      }
    }
  }
}


//end
}

var processResponse = function(typeObject,response){
  console.log('starting loop');
  console.log(response);
  console.log('response length: ' + response.length);
  for (var i = 0; i < response.length; i++) {
    console.log(i);
    console.log(response[i]);
    typeObject.push(response[i]);
  };
}

var buildPokemonDiv = function(object,responseType){
  for (var i = 0; i < object.length; i++) {
    if (responseType == 'type') {
      var id = Utilities.getIDFromPokemonURL(object[i].pokemon.url);
      var name = object[i].pokemon.name
    }else{
      var id = Utilities.getIDFromPokemonURL(object[i].url);
      var name = object[i].name
    }
    var imageUrl = '/images/dex/pokemon-large/' + id + '.png';
    var html    =     '<a href="/pokemon/' + id + '"><div class="pokemon">';
    html        +=    '<div class="pokemonImage"><img src="' + imageUrl + '" /></div>'
    html        +=    '<div class="pokemonId">#' + id + '</div>';
    html        +=    '<div class="pokemonName">' + name.replace(/\-/g, ' ') + '</div>';
    html        +=    '</div></a>';
    $('div.pokemonList').append(html);
  };
};

var compareResults = function(type1,type2){
  var bothTypes = []
  type1Length = type1.length;
  type2Length = type2.length;
  if (type1Length > type2Length) {
    console.log('comparing results');
    for (var i = 0; i < type1.length; i++) {
      var id = Utilities.getIDFromPokemonURL(type1[i].pokemon.url);
      for (var j = 0; j < type2.length; j++) {
        var jid = Utilities.getIDFromPokemonURL(type2[j].pokemon.url);            
        if (jid == id) {
          // console.log('ID1: ' + id + ' & ID2: ' + jid + ' MATCH!');
          bothTypes.push(type1[i]);
        }
      }
    };
  }else{
    console.log('comparing results');
    for (var i = 0; i < type2.length; i++) {
      var id = Utilities.getIDFromPokemonURL(type2[i].pokemon.url);
      for (var j = 0; j < type1.length; j++) {
        var jid = Utilities.getIDFromPokemonURL(type1[j].pokemon.url);
        if (jid == id) {
          // console.log('ID1: ' + id + ' & ID2: ' + jid + ' MATCH!');
          bothTypes.push(type2[i]);
        }
      }
    };
  }
  console.log(bothTypes);
  buildPokemonDiv(bothTypes,'type');
};

var toggleRule = function(){
  if ( $('#andor').text() == 'Or') {
    $('#andor').text('And');
  }else{
    $('#andor').text('Or');
  }
}

var toggleInputs = function() {
  if ( $("#type1").val() != '') {
    $("#type2").prop('disabled', false);
    $("#filter").prop('disabled', false);
  }else{
    $("#type2").val('');
    $("#type2").prop('disabled', true);
    $("#filter").prop('disabled', true);
  }
}

var resetRule = function(){
  if ($("#type2").val() == '') {
    $('#andor').text('Or');
  };
}


var reset = function() {
  $(".typeSelect").val('');
  $("#type2").prop('disabled', true);
  $("#filter").prop('disabled', true);
  console.log(responsePokemon.results);
  console.log(responsePokemon.results[0].url);
  $('div.pokemonList').html(' ');
  buildPokemonDiv(responsePokemon.results,'all');
}