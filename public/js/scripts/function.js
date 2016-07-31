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

// Set the width of the side navigation to show 
function openNav() {
  $('#mySidenav').css('width', '25%');
}

// Set the width of the side navigation to 0 
function closeNav() {
  $('#mySidenav').css('width','0px');
}

function pokemonAutoComplete() {
  $.each(responsePokemonNames.results, function(index, value){
    var name = value.name;
    POKEMON_NAMES.push(name);
  });
  $('#pokemonSearchBox').autocomplete({ 
    source : POKEMON_NAMES,
    change : function(event, ui){
      if(ui.item){
        changePokemon(ui.item.value);
      }
    } 
  })
}

function selectPokemon(pokemonID) {
  window.location = "./" + pokemonID;
}

function changePokemon(pokemonID) {
  console.log(pokemonID);
  if (pokemonID !== null) {
    pokemonID = pokemonID.toLowerCase();
    //make sure that pokemon name exists
    if(POKEMON_NAMES.indexOf(pokemonID) > -1){

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
    case 'locationContent':
    id = 'http://pokeapi.co' + responsePokemon.location_area_encounters;
    break;
  }
  return id;

}

function requestInfo(type, url){
  console.log(url);
  $('#' + type).html('<img src="/images/loader.gif" />');
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
    case 'locationContent':
    encounterLocation(type, data);
    break;
  }
}

function evolutionChain(id, data){
  console.log('evolutionChain');
  console.log(data);

  var evolutionChain = data.chain.evolves_to;
  if(!data.chain.evolves_to){
    $('#evolutionChainContent').html('No evolution available');
    return;
  }

}

function encounterLocation(id, data){
  console.log('encounterLocation');
  console.log(data);

  if(!data.length){
    $('#locationContent').html('No available encounters');
    return;
  }

  //get all the encounters details and store in a single array
  var encounters = [];
  $.each(data, function(index, value){
    var item = value;
    var locationName = item.location_area.name;
    locationName = locationName.replace(/\-/g, ' ');
    locationName = locationName.replace('/(area)/ig', '').trim();
    $.each(item.version_details, function(i, v){
      $.each(v.encounter_details, function(encounterIndex, encounterValue){
        var levels = (encounterValue.min_level === encounterValue.max_level) ? encounterValue.min_level : encounterValue.min_level + '-' + encounterValue.max_level;
        var encounterDetail = {
          locationName : locationName,
          encounterChance : encounterValue.chance,
          levels : levels,
          method : encounterValue.method.name,
          version : v.version.name
        }
        encounters.push(encounterDetail);
      });
    });
  });

  encounters = encounters.sort(function(a,b){
    var textA = a.version.toUpperCase();
    var textB = b.version.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  var html = '<div class="row">';
  html += '<div class="locationName header column">Location</div>';
  html += '<div class="locationChance header column">Chance</div>';
  html += '<div class="locationLevel header column">Level</div>';
  html += '<div class="locationMethod header column">Method</div>';
  html += '<div class="locationVersion header column">Version</div>';
  html += '<div class="clearfloat"></div>';
  html += '</div>';

  //display info
  $.each(encounters, function(i,v){
    // html += '<div class="row">';
    // html += '<div class="locationName column">'+ v.locationName + '</div>';
    // html += '<div class="locationChance column">' + v.encounterChance + '%</div>';
    // html += '<div class="locationLevel column">' + v.levels + '</div>';
    // html += '<div class="locationMethod column">' + v.method + '</div>';
    // html += '<div class="locationVersion column">' + v.version + '</div>';
    // html += '<div class="clearfloat"></div>';
    // html += '</div>';
    if (VERSION_GEN1.indexOf(v.version) > -1 || VERSION_GEN2.indexOf(v.version) > -1 || VERSION_GEN3.indexOf(v.version) > -1 || VERSION_GEN4.indexOf(v.version) > -1 || VERSION_GEN5.indexOf(v.version) > -1){
      // console.log("dont need this: " + v.version + " " + v.locationName);
    }else{
      html += '<div class="row filter_gameVersion_' + v .version + '">';
      html += '<div class="locationName column">'+ v.locationName + '</div>';
      html += '<div class="locationChance column">' + v.encounterChance + '%</div>';
      html += '<div class="locationLevel column">' + v.levels + '</div>';
      html += '<div class="locationMethod column">' + v.method + '</div>';
      html += '<div class="locationVersion column">' + v.version + '</div>';
      html += '<div class="clearfloat"></div>';
      html += '</div>';
    }
  });


$('#locationContent').html(html);
$('#locationContent').prepend("<div class='gameRow'><div class='half selected' id='versionx'>X</div><div class='half selected' id='versiony'>Y</div></div><div class='gameRow'><div class='half selected' id='versionruby'>Ruby</div><div class='half selected' id='versionsapphire'>Sapphire</div></div>");
//binding functions to game versions
  $('#versionx').click(function(){
    filterGameVersion("x");
  });
  $('#versiony').click(function(){
    filterGameVersion("y");
  });
  $('#versionruby').click(function(){
    filterGameVersion("ruby");
  });
  $('#versionsapphire').click(function(){
    filterGameVersion("sapphire");
  });
return;
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
//Section: Moves
function buildMoveList(moves){

  $.each(POKEMON_MOVES, function(i,v){
    var moveName = v.moveName;
    // var movePower = MOVE_OBJECT[moveName]['power'];
    if(MOVE_OBJECT[moveName]){
      //console.log(MOVE_OBJECT[moveName]);
      $('#movesContent #name').append('<div class="move-name filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + ' ' + MOVE_OBJECT[moveName]['type'] + '">' + moveName + '</div>');
      $('#movesContent #power').append('<div class="power-number filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + MOVE_OBJECT[moveName]['power'] + '</div>');
      $('#movesContent #pp').append('<div class="pp-number filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + MOVE_OBJECT[moveName]['pp'] + '</div>');
      $('#movesContent #type').append('<div class="' + MOVE_OBJECT[moveName]['type'] + ' filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + MOVE_OBJECT[moveName]['type'] + '</div>');
      // $('#movesContent #method').append('<div class="learntMethod filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + v.learntMethod + '</div>');
      $('#movesContent #accuracy').append('<div class="accuracy-number filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + MOVE_OBJECT[moveName]['accuracy'] + '</div>');
      $('#movesContent #category').append('<div class="category-type filterable ' + MOVE_OBJECT[moveName]['category'] + ' filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + MOVE_OBJECT[moveName]['category'] + '</div>');
      $('#movesContent #contest').append('<div class="contest-type filterable ' + MOVE_OBJECT[moveName]['contest'] + ' filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + MOVE_OBJECT[moveName]['contest'] + '</div>');

      // if (movePower === null) {
      //   $('#movesContent #power').append('<div class="power-number filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '"> - </div>');
      // } else {
      //   $('#movesContent #power').append('<div class="power-number filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + moveName + MOVE_OBJECT[moveName]['power'] + '</div>');
      // }

      if (v.learntMethod == "tutor") {
        $('#movesContent #learntLevel').append('<div class="learntLevel filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">Tutor</div>');
      } else if (v.learntMethod == "machine") {
        $('#movesContent #learntLevel').append('<div class="learntLevel filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">TM</div>');
      } else if (v.learntMethod == "egg") {
        $('#movesContent #learntLevel').append('<div class="learntLevel filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">Egg</div>');
      } else {
        $('#movesContent #learntLevel').append('<div class="learntLevel filterable filter_method_' + v.learntMethod +' filter_type_' + MOVE_OBJECT[moveName]['type'] + ' filter_category_' + MOVE_OBJECT[moveName]['category'] + ' filter_contest_' + MOVE_OBJECT[moveName]['contest'] + '">' + v.learntLevel + '</div>');
      };
    }

  });
}

function toggleMovesMode(){
  if(document.getElementById('movesToggleMode').checked){
    //do something
    console.log("contest mode");
    $('#contest').removeClass("hidden");
    $('#power').addClass("hidden");
    $('#pp').addClass("hidden");
    $('#accuracy').addClass("hidden");
    $('#category').addClass("hidden");
    $('#movesContestList').removeClass("hidden");
    $('#movesCategoryList').addClass("hidden");
    // need to hide type column and hide type when switched
    $("#movesToggleTypeContainer").addClass("hidden");
    $("#movesToggleTypeContainer").removeClass("half");
    $("#type").addClass("toggle_hide");
  }else{
    console.log("battle mode");
    $('#contest').addClass("hidden");
    $('#power').removeClass("hidden");
    $('#pp').removeClass("hidden");
    $('#accuracy').removeClass("hidden");
    $('#category').removeClass("hidden");
    $('#movesCategoryList').removeClass("hidden");
    $('#movesContestList').addClass("hidden");
    $("#movesToggleTypeContainer").removeClass("hidden");
    $("#movesToggleTypeContainer").addClass("half");
    $("#type").removeClass("toggle_hide");
  }
}

function toggleMovesTypes(){
  if(document.getElementById('movesToggleType').checked){
    //do something
    console.log("show category");
    $('#category').removeClass("toggle_hide");
    $('#type').addClass("toggle_hide");
  }else{
    console.log("show types");
    $('#type').removeClass("toggle_hide");
    $('#category').addClass("toggle_hide");
  }
}

function resetMovesFilter() {
  //s
  $("#movesTypeList").val("");
  $("#movesCategoryList").val("");
  $("#movesContestList").val("");
  $("#movesMethodList").val("");
  
}

function filterMoves (moves_filter) {
  console.log(moves_filter);
  $('.filterable').addClass("hidden");
  $('.' + moves_filter).removeClass("hidden");
}

function getAbilityDetail(i){
  var nthchild = i+1
  $( ".ability:nth-child(" + nthchild + ")" ).append( ": " + abilities[responsePokemon.abilities[i].ability.name] );

}

//Section: Breeding
//Area: Eggs

function calculateEggSteps(cycles,steps){
  var breedingStepsToHatch = cycles * steps;
  var maxSteps = BREEDING_CYCLES * BREEDING_STEPS_PER_CYCLE;
  var stepsWidth = breedingStepsToHatch / maxSteps * 100;
  console.log("width: "+ stepsWidth);
  $("#totalSteps").width(stepsWidth + "%");
  if (document.getElementById('flamebody').checked && $( "#opower" ).val() > 0) {
    // $("#totalSteps").html("Total steps with Flamebody and O-Power: " + Math.round(breedingStepsToHatch));
    $("#totalSteps").html(Math.round(breedingStepsToHatch));
    $("#totalSteps").removeClass();
    $("#totalSteps").addClass("stepsFlameBodyOPower");
  } else if (document.getElementById('flamebody').checked) {
    // $("#totalSteps").html("Total steps with Flamebody: " + Math.round(breedingStepsToHatch));
    $("#totalSteps").html(Math.round(breedingStepsToHatch));
    $("#totalSteps").removeClass();
    $("#totalSteps").addClass("stepsFlameBody");
  } else if ($( "#opower" ).val() > 0) {
    // $("#totalSteps").html("Total steps with O-Power: " + Math.round(breedingStepsToHatch));
    $("#totalSteps").html(Math.round(breedingStepsToHatch));
    $("#totalSteps").removeClass();
    $("#totalSteps").addClass("stepsOPower");
  } else {
    // $("#totalSteps").html("Total steps to hatch: " + Math.round(breedingStepsToHatch));
    $("#totalSteps").html(Math.round(breedingStepsToHatch));
    $("#totalSteps").removeClass();
  }
  
}
// if(document.getElementById('movesToggleMode').checked){

  function flameBody(cycles){
   if(document.getElementById('flamebody').checked) {
   // console.log("flameBody is: " + FLAMEBODY);
   // FLAMEBODY = "on";
   BREEDING_MOD_CYCLES = cycles / 2;
   // $("#flamebody").attr("src","/images/page-pokemon/breeding-flamebody-on.png");
   calculateEggSteps(BREEDING_MOD_CYCLES,BREEDING_MOD_STEPS);
 }else {
  // window.FLAMEBODY = "off";
  // console.log("turned flameBody off");
  // $("#flamebody").attr("src","/images/page-pokemon/breeding-flamebody.png");
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
}

function filterGameVersion(gameVersion){
  if ($( ".filter_gameVersion_" + gameVersion ).hasClass("hidden")) {
    console.log("showing game version row" + gameVersion);
    $("#version" + gameVersion).addClass("selected");
    $(".filter_gameVersion_" + gameVersion).removeClass("hidden");
  }else{
    console.log("hiding game version row" + gameVersion);
    $("#version" + gameVersion).removeClass("selected");
    console.log("#version" + gameVersion);
    $(".filter_gameVersion_" + gameVersion).addClass("hidden");
  };
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