'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('isLeft', function() {

  it('is a unary function', function() {
    eq(typeof S.isLeft, 'function');
    eq(S.isLeft.length, 1);
    eq(S.isLeft.toString(), 'isLeft :: Either a b -> Boolean');
  });

  it('returns true when applied to a Left', function() {
    eq(S.isLeft(S.Left(42)), true);
  });

  it('returns false when applied to a Right', function() {
    eq(S.isLeft(S.Right(42)), false);
  });

});
