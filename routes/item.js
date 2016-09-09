var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();
var CONTENT = {};

/* GET home page. */
router.get('/', function(req, res, next) {
	//error out
	res.status(500);
	res.render('error', {err : '', message : 'no item name passed', response : ''});
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	renderContent(req.params.id, req, res, next);
});


function renderContent(id, req, res, next){
	var content = { title : 'Pokemon API' }

	Pokedex.getJSON(Pokedex.getItem(id))
	.then(function(response){
		errorHandling(response, req, res, next);
		//get item info
		content.itemResponse = response;
		content.itemResponseString = JSON.stringify(response);
		if(response.type !== 'err'){
			res.render('item', content);
		}
		
	});

}

function errorHandling(response, req, res, next){
	if(response.type === 'err'){
		if(res.headersSent){
			//return next(response);
		}else{
			res.status(response.status);
			res.render('error', {err : response.err, message : response.message, response: response.err });
			// next();
		}
	}
}

module.exports = router;
