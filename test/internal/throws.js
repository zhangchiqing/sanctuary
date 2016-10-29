'use strict';

var assert = require('assert');


//  throws :: (Function, TypeRep a, String) -> Undefined
module.exports = function throws(f, type, message) {
  assert.throws(f, function(err) {
    return err.constructor === type && err.message === message;
  });
};
