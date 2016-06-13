'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('even', function() {

  it('is a unary function', function() {
    eq(typeof S.even, 'function');
    eq(S.even.length, 1);
    eq(S.even.toString(), 'even :: Integer -> Boolean');
  });

  it('returns true for even integer', function() {
    eq(S.even(0), true);
    eq(S.even(-0), true);
    eq(S.even(2), true);
    eq(S.even(-2), true);
    eq(S.even(new Number(0)), true);
    eq(S.even(new Number(-0)), true);
    eq(S.even(new Number(2)), true);
    eq(S.even(new Number(-2)), true);
  });

  it('returns false for odd integer', function() {
    eq(S.even(1), false);
    eq(S.even(-1), false);
    eq(S.even(new Number(1)), false);
    eq(S.even(new Number(-1)), false);
  });

});
