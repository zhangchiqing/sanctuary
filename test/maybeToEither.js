'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('maybeToEither', function() {

  it('is a binary function', function() {
    eq(typeof S.maybeToEither, 'function');
    eq(S.maybeToEither.length, 2);
    eq(S.maybeToEither.toString(), 'maybeToEither :: a -> Maybe b -> Either a b');
  });

  it('returns a Left of its first argument when the second is Nothing', function() {
    eq(S.maybeToEither('error msg', S.Nothing), S.Left('error msg'));
  });

  it('returns a Right of the value contained in the Just when the second argument is a Just', function() {
    eq(S.maybeToEither('error msg', S.Just(42)), S.Right(42));
  });

});
