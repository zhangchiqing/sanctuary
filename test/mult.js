'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('mult', function() {

  it('is a binary function', function() {
    eq(typeof S.mult, 'function');
    eq(S.mult.length, 2);
    eq(S.mult.toString(), 'mult :: FiniteNumber -> FiniteNumber -> FiniteNumber');
  });

  it('multiplies two numbers', function() {
    eq(S.mult(4, 2), 8);
    eq(S.mult(4, -2), -8);
    eq(S.mult(-4, -2), 8);
    eq(S.mult(1.5, 3), 4.5);
    eq(S.mult(-1.5, 3), -4.5);
    eq(S.mult(-1.5, -3), 4.5);
  });

});
