'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('isJust', function() {

  it('is a unary function', function() {
    eq(typeof S.isJust, 'function');
    eq(S.isJust.length, 1);
    eq(S.isJust.toString(), 'isJust :: Maybe a -> Boolean');
  });

  it('returns true when applied to a Just', function() {
    eq(S.isJust(S.Just(42)), true);
  });

  it('returns false when applied to Nothing', function() {
    eq(S.isJust(S.Nothing), false);
  });

});
