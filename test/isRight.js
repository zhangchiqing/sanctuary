'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('isRight', function() {

  it('is a unary function', function() {
    eq(typeof S.isRight, 'function');
    eq(S.isRight.length, 1);
    eq(S.isRight.toString(), 'isRight :: Either a b -> Boolean');
  });

  it('returns true when applied to a Right', function() {
    eq(S.isRight(S.Right(42)), true);
  });

  it('returns false when applied to a Left', function() {
    eq(S.isRight(S.Left(42)), false);
  });

});
