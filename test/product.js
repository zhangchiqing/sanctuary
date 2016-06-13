'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('product', function() {

  it('is a unary function', function() {
    eq(typeof S.product, 'function');
    eq(S.product.length, 1);
    eq(S.product.toString(), 'product :: Foldable f => f FiniteNumber -> FiniteNumber');
  });

  it('returns the product of an array of numbers', function() {
    eq(S.product([]), 1);
    eq(S.product([0, 1, 2, 3]), 0);
    eq(S.product([-0, 1, 2, 3]), -0);
    eq(S.product([1, 2, 3, 4, 5]), 120);
    eq(S.product([1, 2, 3, 4, -5]), -120);
  });

  it('can be applied to maybes', function() {
    eq(S.product(S.Nothing), 1);
    eq(S.product(S.Just(42)), 42);
  });

  it('can be applied to eithers', function() {
    eq(S.product(S.Left('xxx')), 1);
    eq(S.product(S.Right(42)), 42);
  });

});
