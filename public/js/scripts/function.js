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

//Section: Breeding
//Area: Eggs
function flameBody(breedingStepsToHatch){
 if(FLAMEBODY == "off") {
   // console.log("flameBody is: " + window.FLAMEBODY);
   FLAMEBODY = "on";
   // console.log("flameBody is: " + window.FLAMEBODY);
   // console.log("steps to hatch: " + breedingStepsToHatch);
   BREEDING_FLAMEBODYSTEPS = breedingStepsToHatch / 2;
   // console.log("BREEDING_FLAMEBODYSTEPS: " + window.breedingStepsToHatch);
   var modifiedSteps = breedingStepsToHatch - (BREEDING_OPOWERSTEPS + BREEDING_FLAMEBODYSTEPS);
   // console.log("modified steps: " + modifiedSteps);
   $("#totalSteps").html(Math.round(modifiedSteps));
   $("#flamebody").attr("src","/images/page-pokemon/breeding-flamebody-on.png");
 }else {
  window.FLAMEBODY = "off";
  // console.log("turned flameBody off");
  $("#flamebody").attr("src","/images/page-pokemon/breeding-flamebody.png");
  BREEDING_FLAMEBODYSTEPS = 0;
  var modifiedSteps = breedingStepsToHatch - (BREEDING_OPOWERSTEPS + BREEDING_FLAMEBODYSTEPS);
  // console.log("modified steps: " + modifiedSteps);
  $("#totalSteps").html(Math.round(modifiedSteps));
}
}

function opower(breedingStepsToHatch,opowerLevel){
  // console.log("opower: " + opowerLevel);
  // console.log("steps: " + breedingStepsToHatch)
  if(opowerLevel == 0){
    var opowerMultiplier = 1;
  }else if (opowerLevel == 1) {
    var opowerMultiplier = 1.25;
  }else if (opowerLevel == 2) {
    var opowerMultiplier = 1.5;
  } else {
    var opowerMultiplier = 2;
  }
  // console.log("opower level: " + opowerLevel);
  // console.log("steps to hatch: " + breedingStepsToHatch);
  opowerModifier = breedingStepsToHatch / opowerMultiplier;
  // console.log("modifier: " + opowerMultiplier);
  // console.log("maths: " + opowerModifier);
  BREEDING_OPOWERSTEPS = breedingStepsToHatch - opowerModifier;
  // console.log("opower steps to deduct: " + BREEDING_OPOWERSTEPS);
  // console.log("steps with opower: " + window.breedingStepsToHatch);
  var stepsToDeduct = BREEDING_OPOWERSTEPS + BREEDING_FLAMEBODYSTEPS;
  var modifiedSteps = breedingStepsToHatch - stepsToDeduct;
  // console.log("steps to deduct: " + stepsToDeduct)
  // console.log("original: " + breedingStepsToHatch + " opower steps: " + BREEDING_OPOWERSTEPS + " flame steps: " + BREEDING_FLAMEBODYSTEPS);
  // console.log("modified steps: " + modifiedSteps);
  $("#totalSteps").html(Math.round(modifiedSteps));
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

              function printVar(val) {
                console.log(val);
              }