'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('not', function() {

  it('is a unary function', function() {
    eq(typeof S.not, 'function');
    eq(S.not.length, 1);
    eq(S.not.toString(), 'not :: Boolean -> Boolean');
  });

  it('can be applied to Booleans', function() {
    eq(S.not(false), true);
    eq(S.not(true), false);
    eq(S.not(new Boolean(false)), true);
    eq(S.not(new Boolean(true)), false);
  });

});
