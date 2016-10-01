function getDexterText(){
  //get dexter text
  if (PAGE_TYPE == 'item') {
    var entriesObject = itemResponse.flavor_text_entries;
  } else {
    var entriesObject = responsePokemonSpecies.flavor_text_entries;
  }
  $.each(entriesObject, function(index, value){
    var v = value;
    if(v.language.name === 'en'){
      if (PAGE_TYPE == 'item') {
        POKEDEXTEXT = v.text;
      }else{
        POKEDEXTEXT = v.flavor_text;
      }
      return false; //break out of .each loop
    }
  });
}

function speak(pokedexText) {
  // DEXTER_STATE's 0 = stopped, 1 = playing, 2 = paused
  if(DEXTER_STATE === 2){
    responsiveVoice.resume();
    DEXTER_STATE = 1;
    //add code to change button state
    $('#dexter').html('&#9616;&#9616;').addClass('pause');
  }else if(responsiveVoice.isPlaying()){
    responsiveVoice.pause();
    DEXTER_STATE = 2;
    //add code to change button state
    $('#dexter').html('&#9658;').removeClass('pause');
  }else{
    responsiveVoice.speak(pokedexText, "UK English Male", {
      onend : function(){
        DEXTER_STATE = 0;
        $('#dexter').html('&#9658;').removeClass('pause');
      }
    });
    DEXTER_STATE = 1;
    $('#dexter').html('&#9616;&#9616;').addClass('pause');
  }
}