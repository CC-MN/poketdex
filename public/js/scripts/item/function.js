//set bindings
function setItemPageBindings(){

  // binding dexter click event
  $('#dexter').click(function(){
    if(POKEDEXTEXT){
      speak(POKEDEXTEXT);
    }
  });

  //binding section tabs
  $('section div.tab').click(function(){
    var contentClass = $(this).attr('data-content') || null;
    if(contentClass){
      Utilities.showSection(contentClass);
    }
  });

}

// Item Page Details
// Get description text

function getItemDescription(){
  for (var i = 0; i < itemResponse.flavor_text_entries.length; i++) {
    if (itemResponse.flavor_text_entries[i].language.name == "en") {
      $('#itemDescription').html(itemResponse.flavor_text_entries[i].text);
    };
  };
}

// Display Pokemon that hold this item if any
function checkIfHeld(){
  if (itemResponse.held_by_pokemon.length > 0) {
    $('#heldPokemonContent').html('');
    for (var i = 0; i < itemResponse.held_by_pokemon.length; i++) {
      console.log(itemResponse.held_by_pokemon[i].pokemon.url);
      $('#heldPokemonContent').append('<a href="/pokemon/' + Utilities.getIDFromPokemonURL(itemResponse.held_by_pokemon[i].pokemon.url) + '"><img class="model" src="/images/dex/pokemon/' + getIDFromPokemonURL(itemResponse.held_by_pokemon[i].pokemon.url) + '.png" /></a>')
      // getIDFromPokemonURL(itemResponse.held_by_pokemon[i].pokemon.url);
    };
    $('#heldPokemonTitle').removeClass('hidden');
  };
}

// Checks if this item triggers a baby form
// un-used currently as an evolution chain is returned instead of a pokemon and would require an AJAX request
function checkBabyItem(){
  if (itemResponse.baby_trigger_for != null) {
    $('#babyTriggerContent').html('');
    // for (var i = 0; i < Things.length; i++) {
    //   Things[i]
    // };
    $('#babyTriggerContent').append('<a href="/pokemon/' + Utilities.getIDFromPokemonURL(itemResponse.baby_trigger_for.url) + '"><img class="model" src="/images/dex/pokemon/' + getIDFromPokemonURL(itemResponse.baby_trigger_for.url) + '.png" /></a>')
    $('#babyTriggerTitle').removeClass('hidden');
  };
}