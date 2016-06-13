'use strict';

var S = require('..');

var eq = require('./internal/eq');
var rem = require('./internal/rem');


describe('encaseEither2', function() {

  it('is a quaternary function', function() {
    eq(typeof S.encaseEither2, 'function');
    eq(S.encaseEither2.length, 4);
    eq(S.encaseEither2.toString(), 'encaseEither2 :: (Error -> l) -> (a -> b -> r) -> a -> b -> Either l r');
  });

  it('returns a Right on success', function() {
    eq(S.encaseEither2(S.I, rem, 42, 5), S.Right(2));
  });

  it('returns a Left on failure', function() {
    eq(S.encaseEither2(S.I, rem, 42, 0), S.Left(new Error('Cannot divide by zero')));
  });

  it('applies the first argument to the Error', function() {
    eq(S.encaseEither2(S.prop('message'), rem, 42, 0), S.Left('Cannot divide by zero'));
  });

});
