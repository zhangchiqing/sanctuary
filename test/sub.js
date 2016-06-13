'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('sub', function() {

  it('is a binary function', function() {
    eq(typeof S.sub, 'function');
    eq(S.sub.length, 2);
    eq(S.sub.toString(), 'sub :: FiniteNumber -> FiniteNumber -> FiniteNumber');
  });

  it('subtracts two numbers', function() {
    eq(S.sub(1, 1), 0);
    eq(S.sub(-1, -1), 0);
    eq(S.sub(7.5, 2), 5.5);
    eq(S.sub(-7.5, -2), -5.5);
  });

});
