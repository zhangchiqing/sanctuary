'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('dec', function() {

  it('is a unary function', function() {
    eq(typeof S.dec, 'function');
    eq(S.dec.length, 1);
    eq(S.dec.toString(), 'dec :: FiniteNumber -> FiniteNumber');
  });

  it('decrements a number by one', function() {
    eq(S.dec(2), 1);
    eq(S.dec(-1), -2);
    eq(S.dec(1.5), 0.5);
    eq(S.dec(-1.5), -2.5);
  });

});
