/*
	Utility Functions
*/

// Set the width of the side navigation to show 
function openNav() {
  $('#mySidenav').css('width', '25%');
}

// Set the width of the side navigation to 0 
function closeNav() {
  $('#mySidenav').css('width','0px');
}

function getIDFromPokemonURL(url){
  /* 
    Grabs the value between the last two /'s 
    (i.e http://pokeapi.co/api/v2/pokemon/1/ => 1)
  */
  // var id = url.replace(/(.*)(pokemon|pokemon\-species)\/(.*)\//, '$3');
  var id = url.replace(/.*\/.*\/(.*?)\//, '$1');
  return id;
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

function setAutoComplete(results, searchBox, passedArray) {
  $.each(results, function(index, value){
    var name = value.name;
    passedArray.push(name);
  });
  var options = {
    data        :   passedArray,
    theme       :   'square',
    adjustWidth : false,

    list        :   {
      match          : {
        enabled: true
      },
      onChooseEvent   :   function(){
        
        var pokemonName = $("#" + searchBox).getSelectedItemData();
        changePage(pokemonName, passedArray);
      }
    }
  }

  $('#' + searchBox).easyAutocomplete(options);

}

function changePage(pokemonID, passedArray) {
  console.log(pokemonID);
  if (pokemonID !== null) {
    pokemonID = pokemonID.toLowerCase();
    //make sure that pokemon name exists
    if(passedArray.indexOf(pokemonID) > -1){
      loadOverlay();
      window.location = "./" + pokemonID;
    }
  };
};

function showSearch(){
  if ($( "#searchContainer" ).hasClass("hidden")) {
    $('#searchContainer').removeClass("hidden");
    $('#pokemonSearchBox').focus();
  }else {
    $('#searchContainer').addClass("hidden");
  }
}

// Call Page Change Animation
function loadOverlay(){
  console.log('loading new page...');
  $('#searchContainer').addClass('hidden');
  $('#loadingDiv').removeClass('hidden');
  $('#loadingAnimation').removeClass('hidden');
}


function getQS(object){
  /*
  Query string values get returned back to the object
  Use object.key|object[key] //returns value
  */
  var pl     = /\+/g;  // Regex for replacing addition symbol with a space
  var search = /([^&=]+)=?([^&]*)/g;
  var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
  var query  = window.location.search.substring(1);
  var match;

  while (match = search.exec(query)){
    object[decode(match[1])] = decode(match[2]);
  }
}
