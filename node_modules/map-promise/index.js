var Q = require('q');

var map = function(array, fn) {
	var deferred = Q.defer();

	var counter = 0;
	var length = array.length;
	var results = [];

	var done = function(err, res) {
		if (err) return deferred.reject(err);

		results.push(res);
		counter += 1;
		if (counter === length) deferred.resolve(results);
	}

	for (var i = 0; i < length; i++) {
		try {
			fn(array[i], done);
		} catch (err) {
			deferred.reject(err)
		}
	}

	return deferred.promise;
}

module.exports = map;
