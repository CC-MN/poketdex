var express = require('express');
var router = express.Router();
var PokedexLib = require('../pokedex');
var Pokedex = new PokedexLib();
var CONTENT = {};
var RES;

/* GET home page. */
router.get('/', function(req, res, next) {
	CONTENT.title = 'Pokemon API';
	//error out
	res.status(500);
	res.render('error', {err : '', message : 'no item name passed', response : ''});
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
	CONTENT.title = 'Pokemon API';
	RES = res;
	renderContent(req.params.id);
});


function renderContent(id){

	Pokedex.getJSON(Pokedex.getItem(id))
	.then(function(response){
		errorHandling(response);
		//get item info
		CONTENT.itemResponse = response;
		CONTENT.itemResponseString = JSON.stringify(response);
		if(response.type !== 'err'){
			RES.render('item', CONTENT);
		}
		
	});

}

function errorHandling(response){
	if(response.type === 'err'){
		if(RES.headersSent){
			//return next(response);
		}
		RES.status(response.status);
		RES.render('error', {err : response.err, message : response.message, response: response.err });
	}
}

module.exports = router;
