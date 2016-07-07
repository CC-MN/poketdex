var promiseMap = require('../index');
var assert = require("assert");

describe('promiseMap', function() {
	describe('success', function() {
		it('should return array of results to then when successful', function(done) {
			var upperCase = function(string, cb) {
				cb(null, string.toUpperCase())
			}
			var expect = ["SIMON","PAVITRA"];
			promiseMap(['simon','pavitra'], upperCase)
				.then(function(result) {
					assert.deepEqual(expect, result);
					done();
				});
		});
	});
	describe('failure', function() {
		it('should reject the promise when the callback receives an error', function(done) {
			var testError = new Error("this is broken");
			var upperCase = function(string, cb) {
				cb(testError, null);
			}
			promiseMap(['simon','pavitra'], upperCase)
				.then(null, function(err) {
					assert.deepEqual(err, testError)
					done();
				});
		});
		it('should reject if the function throws an error', function(done) {
			var testError = new Error("this is broken");
			var upperCase = function(string, cb) {
				throw testError;
			}
			promiseMap(['simon','pavitra'], upperCase)
				.then(null, function(err) {
					assert.deepEqual(err, testError)
					done();
				});
		});
	});
});
