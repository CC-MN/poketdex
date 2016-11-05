(function() {

  'use strict';

  var Utilities = function(){}

  Utilities.prototype = {
    openNav : function(){
      $('#mySidenav').css('width', '25%');
    },

    // Set the width of the side navigation to 0 
    closeNav : function(){
      $('#mySidenav').css('width','0px');
    },
    getIDFromPokemonURL : function(url){
      /* 
        Grabs the value between the last two /'s 
        (i.e http://pokeapi.co/api/v2/pokemon/1/ => 1)
        */
      // var id = url.replace(/(.*)(pokemon|pokemon\-species)\/(.*)\//, '$3');
      var id = url.replace(/.*\/.*\/(.*?)\//, '$1');
      return id;
    },

    showSection : function(sectionName){
      sectionName = sectionName.trim();

      if ($( "#" + sectionName ).hasClass("hidden")) {
        $('.' + sectionName + ' button').html('&#8211;');
        $('#' + sectionName).removeClass("hidden").addClass("expanded");
        $('#' + sectionName).focus();
      }else {
        $('.' + sectionName + ' button').html('+');
        $('#' + sectionName).addClass("hidden").removeClass("expanded");
      }
    },

    setAutoComplete : function(results, input) {
      var array = [];
      $.each(results, function(index, value){
        var name = value.name.replace(/\-/ig, ' ');
        array.push(name);
      });

      var searchBox = document.getElementById(input);
      new Awesomplete(searchBox, {
        list        :   array,
        minChars    :   2,
        maxChars    :   50
      });
      var _self = this;

      searchBox.addEventListener('awesomplete-selectcomplete', function(data){ 
        console.log(data);

        var pokemonName = (data.text) ?  data.text.value : null; 
        pokemonName = (!pokemonName) ? $(data.srcElement).val() : pokemonName;
        console.log(pokemonName);

        if (pokemonName !== null) {
          pokemonName = pokemonName.toLowerCase();
          //make sure that pokemon name exists
          if(array.indexOf(pokemonName) > -1){
            _self.changePage(pokemonName.replace(/\s/g, '-'));
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

    },

    showOverlay : function() {
      $('.overlay').removeClass('hidden');
    },

    changePage : function(pokemonID) {
      console.log('show overlay...');
      $('.overlay').removeClass('hidden');
      $('#searchContainer').addClass('hidden');
      window.location = "./" + pokemonID;
    },

    showSearch : function(){
      if ($( "#searchContainer" ).hasClass("hidden")) {
        $('#searchContainer').removeClass("hidden");
        $('.searchBox').focus();
      }else {
        $('#searchContainer').addClass("hidden");
      }
    },

    getQS : function(object){
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

  }

  function init(){ 
    console.log('----- utilities init -----');
    var me = self.Utilities;

    $('#navButton').click(function(){
      me.openNav();
    });

    $('.closebtn').click(function(){
      me.closeNav();
    });
  }

   // Are we in a browser? Check for Document constructor
  if (typeof Document !== "undefined") {
    // DOM already loaded?
    if (document.readyState !== "loading") {
      init();
    }else{
      // Wait for it
      document.addEventListener("DOMContentLoaded", init);
    }
  }

  if (typeof self !== "undefined") {
    self.Utilities = Utilities;
  }

  if (typeof module === "object" && module.exports) {
    module.exports = Utilities;
  }

  return Utilities;

}());
