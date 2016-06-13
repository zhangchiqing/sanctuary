'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('add', function() {

  it('is a binary function', function() {
    eq(typeof S.add, 'function');
    eq(S.add.length, 2);
    eq(S.add.toString(), 'add :: FiniteNumber -> FiniteNumber -> FiniteNumber');
  });

  it('adds two numbers', function() {
    eq(S.add(1, 1), 2);
    eq(S.add(-1, -1), -2);
    eq(S.add(1.5, 1), 2.5);
    eq(S.add(-1.5, -1), -2.5);
  });

});
