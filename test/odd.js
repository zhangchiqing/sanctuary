'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('odd', function() {

  it('is a unary function', function() {
    eq(typeof S.odd, 'function');
    eq(S.odd.length, 1);
    eq(S.odd.toString(), 'odd :: Integer -> Boolean');
  });

  it('returns true for odd integer', function() {
    eq(S.odd(1), true);
    eq(S.odd(-1), true);
    eq(S.odd(new Number(1)), true);
    eq(S.odd(new Number(-1)), true);
  });

  it('returns false for even integer', function() {
    eq(S.odd(0), false);
    eq(S.odd(-0), false);
    eq(S.odd(2), false);
    eq(S.odd(-2), false);
    eq(S.odd(new Number(0)), false);
    eq(S.odd(new Number(-0)), false);
    eq(S.odd(new Number(2)), false);
    eq(S.odd(new Number(-2)), false);
  });

});
