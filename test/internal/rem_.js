'use strict';

//  rem_ :: (Number, Number) -> Number !
module.exports = function rem_(x, y) {
  if (y === 0) {
    throw new Error('Cannot divide by zero');
  } else {
    return x % y;
  }
};
