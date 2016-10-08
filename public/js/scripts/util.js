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

function setAutoComplete(results, input, passedArray) {
  $.each(results, function(index, value){
    var name = value.name;
    passedArray.push(name);
  });

  var searchBox = document.getElementById(input);
  new Awesomplete(searchBox, {
    list        :   passedArray,
    minChars    :   3,
    maxChars    :   50
  });

  searchBox.addEventListener('awesomplete-selectcomplete', function(data){ 
    console.log(data);

    var pokemonName = (data.text) ?  data.text.value : null; 
    pokemonName = (!pokemonName) ? $(data.srcElement).val() : null;
    console.log(pokemonName);

    if (pokemonName !== null) {
      pokemonName = pokemonName.toLowerCase();
      //make sure that pokemon name exists
      if(passedArray.indexOf(pokemonName) > -1){
        loadOverlay(pokemonName);
      }
    }
  }, false);

  $('#' + input).keyup(function (e) {
    if (e.keyCode == 13) {
      // Do something
      var event = new Event('awesomplete-selectcomplete');
      searchBox.dispatchEvent(event);
    }
  });

}

function newFunction(pokemonName, passedArray) {
  showSearch();
}

function changePage(pokemonID) {
  window.location = "./" + pokemonID;
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
function loadOverlay(pokemonID){
  // alert('load overlay');
  $('#loadingAnimation').removeClass('hidden');
  console.log('show overlay...');
  $('#searchContainer').addClass('hidden');
  $('#loadingDiv').removeClass('hidden');
  setTimeout(function(){ 
    console.log('change page');
    changePage(pokemonID);
  }, 500);
  
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
