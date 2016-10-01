//set bindings
function setItemPageBindings(){

  // binding dexter click event
  $('#dexter').click(function(){
    if(POKEDEXTEXT){
      speak(POKEDEXTEXT);
    } else{
      console.log('no POKEDEXTEXT');
    }
  });

  //binding section tabs
  $('section div.tab').click(function(){
    var contentClass = $(this).attr('data-content') || null;
    if(contentClass){
      showSection(contentClass);
    }
  });

  //AJAX Binding
  $('.request').click(function(){
    var className = $(this).attr('data-request');
    var url = requestID(className);
    if(url){
      requestInfo(className, url);
    }
  });
}

function showSection(sectionName){
  sectionName = sectionName.trim();

  if ($( "#" + sectionName ).hasClass("hidden")) {
    $('.' + sectionName + ' button').html('&#8211;');
    $('#' + sectionName).removeClass("hidden").addClass("expanded");
    $('#' + sectionName).focus();
  }else {
    $('.' + sectionName + ' button').html('+');
    $('#' + sectionName).addClass("hidden").removeClass("expanded");
  }
}

//set up search tool
function itemAutoComplete() {

  $.each(responseItemNames.results, function(index, value){
    var name = value.name;
    ITEM_NAMES.push(name);
  });
  var options = {
    data        :   ITEM_NAMES,
    theme       :   'square',
    adjustWidth : false,

    list        :   {
      match          : {
        enabled: true
      },
      onChooseEvent   :   function(){
        var itemName = $("#itemSearchBox").getSelectedItemData();
        changeItem(itemName);
      }
    }
  }

  $('#itemSearchBox').easyAutocomplete(options);

}

function changeItem(itemID) {
  console.log(itemID);
  if (itemID !== null) {
    itemID = itemID.toLowerCase();
    //make sure that pokemon name exists
    if(ITEM_NAMES.indexOf(itemID) > -1){

      window.location = "./" + itemID;
    }
  };
};

function showSearch(){
  if ($( "#searchContainer" ).hasClass("hidden")) {
    $('#searchContainer').removeClass("hidden");
    $('#itemSearchBox').focus();
  }else {
    $('#searchContainer').addClass("hidden");
  }
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
      $('#heldPokemonContent').append('<a href="/pokemon/' + getIDFromPokemonURL(itemResponse.held_by_pokemon[i].pokemon.url) + '"><img class="model" src="/images/dex/pokemon/' + getIDFromPokemonURL(itemResponse.held_by_pokemon[i].pokemon.url) + '.png" /></a>')
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
    $('#babyTriggerContent').append('<a href="/pokemon/' + getIDFromPokemonURL(itemResponse.baby_trigger_for.url) + '"><img class="model" src="/images/dex/pokemon/' + getIDFromPokemonURL(itemResponse.baby_trigger_for.url) + '.png" /></a>')
    $('#babyTriggerTitle').removeClass('hidden');
  };
}