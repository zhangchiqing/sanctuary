'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('fromEither', function() {

  it('is a binary function', function() {
    eq(typeof S.fromEither, 'function');
    eq(S.fromEither.length, 2);
    eq(S.fromEither.toString(), 'fromEither :: b -> Either a b -> b');
  });

  it('can be applied to a Right', function() {
    eq(S.fromEither(0, S.Right(42)), 42);
  });

  it('can be applied to a Left', function() {
    eq(S.fromEither(0, S.Left(42)), 0);
  });

});
