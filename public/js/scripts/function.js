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
  if (pokemonID !== null) {
    pokemonID = pokemonID.toLowerCase();
    window.location = "./" + pokemonID;
  };
};

function showSearch(){
  //TODO need to redo this function/css for the search
  if ($( "#searchContainer" ).hasClass("hidden")) {
    $('#searchContainer').removeClass("hidden");
    $('#pokemonSearchBox').addClass("animate");
    $('#pokemonSearchBox').focus();
  }else {
    $('#pokemonSearchBox').addClass("reverseAnimate");
    $('#searchContainer').addClass("hidden");
  }
}

function useList() {
  $('#pokedexList').focus();
}

function showSection(sectionName){
  sectionName = sectionName.trim();

  if ($( "#" + sectionName ).hasClass("hidden")) {
    $('#' + sectionName).parent().find('button').html('&#8211;');
    $('#' + sectionName).removeClass("hidden");
    $('#' + sectionName).focus();
  }else {
    $('#' + sectionName).parent().find('button').html('+');
    $('#' + sectionName).addClass("hidden");
  }
}

function buildChart(barChartData) {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myBar = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each bar to be 2px wide and green
      responsive: false,
      defaultFontFamily: "Lucida Grande",
      defaultFontSize: 14,
      legend: {
        display: false
      },
      title: {
        display: false
      }
    }
  });

};
