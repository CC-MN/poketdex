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
