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
    $('#dexter').html('&#9616;&#9616;');
  }else if(responsiveVoice.isPlaying()){
    responsiveVoice.pause();
    DEXTER_STATE = 2;
    //add code to change button state
    $('#dexter').html('&#9658;');
  }else{
    responsiveVoice.speak(pokedexText, "UK English Male");
    DEXTER_STATE = 1;
    $('#dexter').html('&#9616;&#9616;');
  }
}

// Set the width of the side navigation to show 
function openNav() {
  $('#mySidenav').css('width', '25%');
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
    $('#' + sectionName).addClass("expanded");
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
    // case 'movesContent':
    // id = 'moves wahey';
    // break;
  }
  return id;

}

function requestInfo(type, url){
  console.log(url);
  var parameters = { 
    url : url
  };
  $.get( '/request',parameters, function(data) {
    console.log('results');
    determineAjaxEvent(type, data);
  });
}

function determineAjaxEvent(type, data){

  switch(type) {
    case 'evolutionChainContent':
    evolutionChain(type, data);
    break;
  }
}

function evolutionChain(id, data){
  console.log('evolutionChain');
  console.log(data);

  var evolutionChain = data.chain.evolves_to;
  if(!data.chain.evolves_to){
    //has no evolution
  }

}

function getMoveList(){

  var tArray = [];
  $.each(responsePokemon.moves, function(index, value){
    var move = value.move.name;
    var learntLevel = value.version_group_details[0].level_learned_at;
    var learntMethod = value.version_group_details[0].move_learn_method.name;
    var item = {
      moveName : move,
      learntLevel : learntLevel,
      learntMethod : learntMethod
    }
    tArray.push(item);
  });

  tArray.sort(function(a,b){ return a.learntLevel - b.learntLevel });
  return tArray;
}

function buildMoveList(moves){
  //#movesContent

  $.each(POKEMON_MOVES, function(i,v){
    var moveName = v.moveName;
    if(MOVE_OBJECT[moveName]){
      //console.log(MOVE_OBJECT[moveName]);
      $('#movesContent #name').append('<div class="move-name">' + moveName + '</div>');
      $('#movesContent #power').append('<div class="power-number">' + MOVE_OBJECT[moveName]['power'] + '</div>');
      $('#movesContent #pp').append('<div class="pp-number">' + MOVE_OBJECT[moveName]['pp'] + '</div>');
      $('#movesContent #type').append('<div class="' + MOVE_OBJECT[moveName]['type'] + '">' + MOVE_OBJECT[moveName]['type'] + '</div>');
      $('#movesContent #learntLevel').append('<div class="learntLevel">' + v.learntLevel + '</div>');
      $('#movesContent #method').append('<div class="learntMethod">' + v.learntMethod + '</div>');
      $('#movesContent #accuracy').append('<div class="accuracy-number">' + MOVE_OBJECT[moveName]['accuracy'] + '</div>');
      $('#movesContent #category').append('<div class="category-type ' + MOVE_OBJECT[moveName]['category'] + '">' + MOVE_OBJECT[moveName]['category'] + '</div>');
      $('#movesContent #contest').append('<div class="contest-type ' + MOVE_OBJECT[moveName]['contest'] + '">' + MOVE_OBJECT[moveName]['contest'] + '</div>');
    }

  });
}

function getAbilityDetail(i){
  var nthchild = i+1
  $( ".ability:nth-child(" + nthchild + ")" ).append( ": " + abilities[responsePokemon.abilities[i].ability.name] );

}

//Section: Breeding
//Area: Eggs

function calculateEggSteps(cycles,steps){
  var breedingStepsToHatch = cycles * steps;
  if (FLAMEBODY == "on" && $( "#opower" ).val() > 0) {
    $("#totalSteps").html("Total steps with Flamebody and O-Power: " + Math.round(breedingStepsToHatch));
  } else if (FLAMEBODY == "on") {
    $("#totalSteps").html("Total steps with Flamebody: " + Math.round(breedingStepsToHatch));
  } else if ($( "#opower" ).val() > 0) {
    $("#totalSteps").html("Total steps with O-Power: " + Math.round(breedingStepsToHatch));
  } else {
    $("#totalSteps").html("Total steps to hatch: " + Math.round(breedingStepsToHatch));
  }
  
}
  

function flameBody(cycles){
 if(FLAMEBODY == "off") {
   // console.log("flameBody is: " + FLAMEBODY);
   FLAMEBODY = "on";
   BREEDING_MOD_CYCLES = cycles / 2;
   $("#flamebody").attr("src","/images/page-pokemon/breeding-flamebody-on.png");
   calculateEggSteps(BREEDING_MOD_CYCLES,BREEDING_MOD_STEPS);
 }else {
  window.FLAMEBODY = "off";
  // console.log("turned flameBody off");
  $("#flamebody").attr("src","/images/page-pokemon/breeding-flamebody.png");
  BREEDING_MOD_CYCLES = BREEDING_CYCLES;
  calculateEggSteps(BREEDING_MOD_CYCLES,BREEDING_MOD_STEPS);
}
}

function opower(steps,opowerLevel){
  // console.log("opower: " + opowerLevel);
  // console.log("steps: " + breedingStepsToHatch)
  if(opowerLevel == 0){
    BREEDING_MOD_STEPS = steps;
  }else if (opowerLevel == 1) {
    BREEDING_MOD_STEPS = steps / 1.25;
  }else if (opowerLevel == 2) {
    BREEDING_MOD_STEPS = steps / 1.5;
  } else {
    BREEDING_MOD_STEPS = steps / 2;
  }
  console.log("opower level: " + opowerLevel);
  console.log("steps per cycle: " + BREEDING_MOD_STEPS);
  calculateEggSteps(BREEDING_MOD_CYCLES,BREEDING_MOD_STEPS);
  // opowerModifier = breedingStepsToHatch / opowerMultiplier;
  // // console.log("modifier: " + opowerMultiplier);
  // // console.log("maths: " + opowerModifier);
  // BREEDING_OPOWERSTEPS = breedingStepsToHatch - opowerModifier;
  // // console.log("opower steps to deduct: " + BREEDING_OPOWERSTEPS);
  // // console.log("steps with opower: " + window.breedingStepsToHatch);
  // var stepsToDeduct = BREEDING_OPOWERSTEPS + BREEDING_FLAMEBODYSTEPS;
  // var modifiedSteps = breedingStepsToHatch - stepsToDeduct;
  // // console.log("steps to deduct: " + stepsToDeduct)
  // // console.log("original: " + breedingStepsToHatch + " opower steps: " + BREEDING_OPOWERSTEPS + " flame steps: " + BREEDING_FLAMEBODYSTEPS);
  // // console.log("modified steps: " + modifiedSteps);
  // $("#totalSteps").html(Math.round(modifiedSteps));
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