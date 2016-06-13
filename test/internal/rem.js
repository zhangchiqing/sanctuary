'use strict';

var rem_ = require('./rem_');


//  rem :: Number -> Number -> Number !
module.exports = function rem(x) {
  return function(y) {
    return rem_(x, y);
  };
};
