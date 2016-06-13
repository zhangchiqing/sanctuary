'use strict';

//  area_ :: (Number, Number, Number) -> Number !
module.exports = function area_(a, b, c) {
  if (Math.max(a, b, c) < (a + b + c) / 2) {
    var s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  } else {
    throw new Error('Impossible triangle');
  }
};
