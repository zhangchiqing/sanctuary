'use strict';

var S = require('..');

var eq = require('./internal/eq');
var factorial = require('./internal/factorial');


describe('encaseEither', function() {

  it('is a ternary function', function() {
    eq(typeof S.encaseEither, 'function');
    eq(S.encaseEither.length, 3);
    eq(S.encaseEither.toString(), 'encaseEither :: (Error -> l) -> (a -> r) -> a -> Either l r');
  });

  it('returns a Right on success', function() {
    eq(S.encaseEither(S.I, factorial, 5), S.Right(120));
  });

  it('returns a Left on failure', function() {
    eq(S.encaseEither(S.I, factorial, -1), S.Left(new Error('Cannot determine factorial of negative number')));
  });

  it('applies the first argument to the Error', function() {
    eq(S.encaseEither(S.prop('message'), factorial, -1), S.Left('Cannot determine factorial of negative number'));
  });

});
