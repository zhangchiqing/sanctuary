'use strict';

var add_ = require('./add_');


//  add :: Number -> Number -> Number
module.exports = function add(a) {
  return function(b) {
    return add_(a, b);
  };
};
