'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('slice', function() {

  it('is a ternary function', function() {
    eq(typeof S.slice, 'function');
    eq(S.slice.length, 3);
    eq(S.slice.toString(), 'slice :: Integer -> Integer -> List a -> Maybe (List a)');
  });

  it('returns Nothing with a positive end index greater than start index', function() {
    eq(S.slice(6, 1, [1, 2, 3, 4, 5]), S.Nothing);
  });

  it('returns Nothing with a positive end index greater than list length', function() {
    eq(S.slice(1, 6, [1, 2, 3, 4, 5]), S.Nothing);
  });

  it('returns Nothing with a negative end index greater than list length', function() {
    eq(S.slice(1, -6, [1, 2, 3, 4, 5]), S.Nothing);
  });

  it('returns Nothing with a negative start index greater than list length', function() {
    eq(S.slice(-6, 1, [1, 2, 3, 4, 5]), S.Nothing);
  });

  it('returns a Just with an empty array when start index equals end index', function() {
    eq(S.slice(1, 1, [1, 2, 3, 4, 5]), S.Just([]));
    eq(S.slice(1, -4, [1, 2, 3, 4, 5]), S.Just([]));
    eq(S.slice(-4, 1, [1, 2, 3, 4, 5]), S.Just([]));
    eq(S.slice(-4, -4, [1, 2, 3, 4, 5]), S.Just([]));
    eq(S.slice(0, 0, []), S.Just([]));
    eq(S.slice(0, -0, []), S.Just([]));
    eq(S.slice(-0, 0, []), S.Just([]));
    eq(S.slice(-0, -0, []), S.Just([]));
  });

  it('returns a Just with a positive start and end index', function() {
    eq(S.slice(1, 3, [1, 2, 3, 4, 5]), S.Just([2, 3]));
  });

  it('returns a Just with a negative start index', function() {
    eq(S.slice(-3, 5, [1, 2, 3, 4, 5]), S.Just([3, 4, 5]));
  });

  it('returns a Just with a negative end index', function() {
    eq(S.slice(1, -2, [1, 2, 3, 4, 5]), S.Just([2, 3]));
  });

  it('accepts -0 as the position half a step beyond the last index', function() {
    eq(S.slice(-0, 5, [1, 2, 3, 4, 5]), S.Just([]));
    eq(S.slice(2, -0, [1, 2, 3, 4, 5]), S.Just([3, 4, 5]));
    eq(S.slice(new Number(-0), 5, [1, 2, 3, 4, 5]), S.Just([]));
    eq(S.slice(2, new Number(-0), [1, 2, 3, 4, 5]), S.Just([3, 4, 5]));
  });

  it('returns a Just with the whole list', function() {
    eq(S.slice(0, 5, [1, 2, 3, 4, 5]), S.Just([1, 2, 3, 4, 5]));
  });

  it('can operate on strings', function() {
    eq(S.slice(0, -0, 'ramda'), S.Just('ramda'));
    eq(S.slice(1, -3, 'ramda'), S.Just('a'));
    eq(S.slice(2, -3, 'ramda'), S.Just(''));
    eq(S.slice(3, -3, 'ramda'), S.Nothing);
  });

});
