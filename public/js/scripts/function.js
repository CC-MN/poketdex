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
    $('#pokemonSearchBox').focus();
  }else {
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
    $('#' + sectionName + 'Configure').removeClass('hidden');
    $('#' + sectionName + 'Filter').removeClass('hidden');
    $('#' + sectionName).focus();
  }else {
    $('#' + sectionName).parent().find('button').html('+');
    $('#' + sectionName).addClass("hidden");
    $('#' + sectionName + 'Configure').addClass('hidden');
    $('#' + sectionName + 'Filter').addClass('hidden');
  }
}

function requestID(param){
  param = param.trim();
  var id = null;

  switch(param) {
    case 'evolutionChainContent':
      id = responsePokemonSpecies.evolution_chain.url
      break;
    case 'movesContent':
      id = 'moves wahey';
      break;
  }
  return id;

}

function requestInfo(url){
  console.log(url);
  var parameters = { 
    url : url
  };
  $.get( '/request',parameters, function(data) {
    console.log('results');
    console.log('--------------');
    console.log(data);
    console.log('--------------');
  });
}

// function flameBody(breedingStepsToHatch) {
//   console.log("steps to hatch: " + breedingStepsToHatch)
//   var breedingStepsToHatchFlame = breedingStepsToHatch / 2;
//   console.log(breedingStepsToHatchFlame);
//   $("#totalSteps").html(breedingStepsToHatchFlame);
// }

function flameBody(breedingStepsToHatch){
   if(window.FLAMEBODY = "off") {
     console.log("flameBody is: " + window.FLAMEBODY);
     window.FLAMEBODY = "on";
     console.log("flameBody is: " + window.FLAMEBODY);
     console.log("steps to hatch: " + breedingStepsToHatch);
     window.breedingStepsToHatch = breedingStepsToHatch / 2;
     console.log(window.breedingStepsToHatch);
     $("#totalSteps").html(Math.round(window.breedingStepsToHatch));
     $("#flamebody").attr("src","/images/page-pokemon/breeding-flamebody-on.png");
   }else {
    window.FLAMEBODY = "off";
    console.log("turned flameBody off");
    $("#flamebody").attr("src","/images/page-pokemon/breeding-flamebody-on.png");
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

/***************************************
              Helper Functions
***************************************/
function test() {
  alert('test completed');
}