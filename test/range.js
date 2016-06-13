'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('range', function() {

  it('is a binary function', function() {
    eq(typeof S.range, 'function');
    eq(S.range.length, 2);
    eq(S.range.toString(), 'range :: Integer -> Integer -> Array Integer');
  });

  it('returns an array of consecutive integers', function() {
    eq(S.range(0, 0), []);
    eq(S.range(0, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    eq(S.range(0, -10), []);
    eq(S.range(-2, -1), [-2]);
    eq(S.range(-2, 3), [-2, -1, 0, 1, 2]);
  });

});
