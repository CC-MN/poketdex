This module is intended to replicate the functionality provide by an async map function but uses a promise to handle the map completion and returning results.

The promiseMap function takes two inputs.

* An array to "map" over
* A function to apply to each element in the array, 
	* first input = array value
	* second input is a callback function (which should be invoked upon the functions completion)

If the promiseMap is successful, it will resolve and the results are obtainable as an array (within .then)

If the promiseMap fails, it will reject and the error will be passed along (to .then)

Usage Example:-

(NOTE: the uppercase function does not need a callback as it is synchronous, this is just to demonstrate)

```
var mapPromise = require('map-promise');

var names = ['simon','pavitra']
var uppercase = function(name, cb) {
	var result = name.toUpperCase();
	cb(null, result);
}

mapPromise(names, uppercase)
	.then(function(result) {
		//result will equal ["SIMON", "PAVITRA"]
	});
```
