'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('mean', function() {

  it('is a unary function', function() {
    eq(typeof S.mean, 'function');
    eq(S.mean.length, 1);
    eq(S.mean.toString(), 'mean :: Foldable f => f FiniteNumber -> Maybe FiniteNumber');
  });

  it('returns the mean of a non-empty array of numbers', function() {
    eq(S.mean([1, 2, 3]), S.Just(2));
    eq(S.mean([0.1, 0.3]), S.Just(0.2));
    eq(S.mean([-0]), S.Just(0));
    eq(S.mean([-0, 0]), S.Just(0));
  });

  it('returns Nothing when applied to an empty array', function() {
    eq(S.mean([]), S.Nothing);
  });

  it('can be applied to maybes', function() {
    eq(S.mean(S.Nothing), S.Nothing);
    eq(S.mean(S.Just(42)), S.Just(42));
  });

  it('can be applied to eithers', function() {
    eq(S.mean(S.Left('xxx')), S.Nothing);
    eq(S.mean(S.Right(42)), S.Just(42));
  });

});
