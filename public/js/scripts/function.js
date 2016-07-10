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

function speak(pokedexText) {
  // DEXTER_STATE's 0 = stopped, 1 = playing, 2 = paused
  if(DEXTER_STATE === 2){
    responsiveVoice.resume();
    DEXTER_STATE = 1;
    //add code to change button state
  }else if(responsiveVoice.isPlaying()){
    responsiveVoice.pause();
    DEXTER_STATE = 2;
    //add code to change button state
  }else{
    responsiveVoice.speak(pokedexText, "UK English Male");
    DEXTER_STATE = 1;
  }
}

// Set the width of the side navigation to show 
function openNav() {
  $('#mySidenav').css('width', '50%');
}

// Set the width of the side navigation to 0 
function closeNav() {
  $('#mySidenav').css('width','0px');
}

function changePokemon(pokemonID) {
  window.location = "./" + pokemonID;
}

function showSearch(){
  $('#searchContainer').removeClass("hidden");
}

//get selected option and set text
//$( "#myselect option:selected" ).text();
