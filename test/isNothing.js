'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('isNothing', function() {

  it('is a unary function', function() {
    eq(typeof S.isNothing, 'function');
    eq(S.isNothing.length, 1);
    eq(S.isNothing.toString(), 'isNothing :: Maybe a -> Boolean');
  });

  it('returns true when applied to Nothing', function() {
    eq(S.isNothing(S.Nothing), true);
  });

  it('returns false when applied to a Just', function() {
    eq(S.isNothing(S.Just(42)), false);
  });

});
