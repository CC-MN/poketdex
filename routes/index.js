var express = require('express');
var router = express.Router();
var RP = require('request-promise');
const map = require('promise-map');


/* GET home page. */
router.get('/', function(req, res, next) {
	var content = {
		title : 'Pokemon API',
		info : 'Some Info'
	}
	res.render('index', content);
});

module.exports = router;
