'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('either', function() {

  it('is a ternary function', function() {
    eq(typeof S.either, 'function');
    eq(S.either.length, 3);
    eq(S.either.toString(), 'either :: (a -> c) -> (b -> c) -> Either a b -> c');
  });

  it('can be applied to a Left', function() {
    eq(S.either(S.prop('length'), Math.sqrt, S.Left('abc')), 3);
  });

  it('can be applied to a Right', function() {
    eq(S.either(S.prop('length'), Math.sqrt, S.Right(9)), 3);
  });

});
