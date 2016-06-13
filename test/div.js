'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('div', function() {

  it('is a binary function', function() {
    eq(typeof S.div, 'function');
    eq(S.div.length, 2);
    eq(S.div.toString(), 'div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber');
  });

  it('divides two numbers', function() {
    eq(S.div(8, 2), 4);
    eq(S.div(8, -2), -4);
    eq(S.div(-8, -2), 4);
    eq(S.div(1.5, 2), 0.75);
    eq(S.div(1.5, -2), -0.75);
    eq(S.div(-1.5, -2), 0.75);
  });

});
