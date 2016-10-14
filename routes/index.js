var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	var content = {
		title 		: 	'Pokemon API',
		index 		: 	true,
		partials	: 	{
			header : 'partials/header'
		}
	}
	res.render('index', content);
});

module.exports = router;
