'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('min', function() {

  it('is a binary function', function() {
    eq(typeof S.min, 'function');
    eq(S.min.length, 2);
    eq(S.min.toString(), 'min :: Ord a => a -> a -> a');
  });

  it('can be applied to (valid) numbers', function() {
    eq(S.min(10, 2), 2);
    eq(S.min(2, 10), 2);
    eq(S.min(0.1, 0.01), 0.01);
    eq(S.min(0.01, 0.1), 0.01);
    eq(S.min(Infinity, -Infinity), -Infinity);
    eq(S.min(-Infinity, Infinity), -Infinity);
  });

  it('can be applied to (valid) dates', function() {
    eq(S.min(new Date(10), new Date(2)), new Date(2));
    eq(S.min(new Date(2), new Date(10)), new Date(2));
  });

  it('can be applied to strings', function() {
    eq(S.min('abc', 'xyz'), 'abc');
    eq(S.min('xyz', 'abc'), 'abc');
    eq(S.min('10', '2'), '10');
    eq(S.min('2', '10'), '10');
    eq(S.min('A', 'a'), 'A');
    eq(S.min('a', 'A'), 'A');
  });

});
