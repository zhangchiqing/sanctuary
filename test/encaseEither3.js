'use strict';

var S = require('..');

var area = require('./internal/area');
var eq = require('./internal/eq');


describe('encaseEither3', function() {

  it('is a quinary function', function() {
    eq(typeof S.encaseEither3, 'function');
    eq(S.encaseEither3.length, 5);
    eq(S.encaseEither3.toString(), 'encaseEither3 :: (Error -> l) -> (a -> b -> c -> r) -> a -> b -> c -> Either l r');
  });

  it('returns a Right on success', function() {
    eq(S.encaseEither3(S.I, area, 3, 4, 5), S.Right(6));
  });

  it('returns a Left on failure', function() {
    eq(S.encaseEither3(S.I, area, 2, 2, 5), S.Left(new Error('Impossible triangle')));
  });

  it('applies the first argument to the Error', function() {
    eq(S.encaseEither3(S.prop('message'), area, 2, 2, 5), S.Left('Impossible triangle'));
  });

});
