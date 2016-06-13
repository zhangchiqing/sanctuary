'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('sum', function() {

  it('is a unary function', function() {
    eq(typeof S.sum, 'function');
    eq(S.sum.length, 1);
    eq(S.sum.toString(), 'sum :: Foldable f => f FiniteNumber -> FiniteNumber');
  });

  it('sums an array of numbers together', function() {
    eq(S.sum([]), 0);
    eq(S.sum([0, 1, 2, 3]), 6);
    eq(S.sum([-0, 1, 2, 3]), 6);
    eq(S.sum([1, 2, 3, 4, 5]), 15);
    eq(S.sum([1, 2, 3, 4, -5]), 5);
  });

  it('can be applied to maybes', function() {
    eq(S.sum(S.Nothing), 0);
    eq(S.sum(S.Just(42)), 42);
  });

  it('can be applied to eithers', function() {
    eq(S.sum(S.Left('xxx')), 0);
    eq(S.sum(S.Right(42)), 42);
  });

});
