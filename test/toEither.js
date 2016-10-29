'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('toEither', function() {

  it('is a binary function', function() {
    eq(typeof S.toEither, 'function');
    eq(S.toEither.length, 2);
    eq(S.toEither.toString(), 'toEither :: a -> b -> Either a b');
  });

  it('returns Left of the first argument when second argument is `null`-y', function() {
    eq(S.toEither('a', null), S.Left('a'));
    eq(S.toEither('a', undefined), S.Left('a'));
  });

  it('returns a Right of the second argument when it is not `null`-y', function() {
    eq(S.toEither('a', 42), S.Right(42));
  });

});
