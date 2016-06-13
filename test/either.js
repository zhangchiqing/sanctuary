'use strict';

var R = require('ramda');

var S = require('..');

var eq = require('./internal/eq');
var square = require('./internal/square');


describe('either', function() {

  it('is a ternary function', function() {
    eq(typeof S.either, 'function');
    eq(S.either.length, 3);
    eq(S.either.toString(), 'either :: (a -> c) -> (b -> c) -> Either a b -> c');
  });

  it('can be applied to a Left', function() {
    eq(S.either(R.length, square, S.Left('abc')), 3);
  });

  it('can be applied to a Right', function() {
    eq(S.either(R.length, square, S.Right(42)), 1764);
  });

});
