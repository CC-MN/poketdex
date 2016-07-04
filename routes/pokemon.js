var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();

/* GET home page. */
router.get('/', function(req, res, next) {
	var content = {
		title : 'Pokemon API',
	};
	res.render('pokemon', content);
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	var content = {
		title : 'Pokemon API'
	};

	var Pokemon = Pokedex.getPokemon(req.params.id);
	if(typeof Pokemon.then === 'function'){
		
		Pokemon.then(function(response){
			content.data = response;
			content.stringData = JSON.stringify(response);
			res.render('pokemon', content);
		}).catch(function(e){
			console.log('Error: ' + e);
		});

	}else{
		content.data = Pokemon;
		content.stringData = JSON.stringify(Pokemon);
		res.render('pokemon', content);
	}

});


module.exports = router;
