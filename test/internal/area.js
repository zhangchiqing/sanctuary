'use strict';

var area_ = require('./area_');


//  area :: Number -> Number -> Number -> Number !
module.exports = function area(a) {
  return function(b) {
    return function(c) {
      return area_(a, b, c);
    };
  };
};
