'use strict';

var S = require('..');

var add_ = require('./internal/add_');
var eq = require('./internal/eq');


describe('reduce_', function() {

  it('is a ternary function', function() {
    eq(typeof S.reduce_, 'function');
    eq(S.reduce_.length, 3);
    eq(S.reduce_.toString(), 'reduce_ :: Foldable f => ((a, b) -> a) -> a -> f b -> a');
  });

  it('folds over lists with the supplied uncurried accumulator', function() {
    eq(S.reduce_(add_, 0, [1, 2, 3, 4, 5]), 15);
    eq(S.reduce_(add_, 0, []), 0);
  });

  it('dispatches to a "reduce" method if present', function() {
    eq(S.reduce_(add_, 10, S.Just(5)), 15);
  });

});
