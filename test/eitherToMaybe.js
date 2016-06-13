'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('eitherToMaybe', function() {

  it('is a unary function', function() {
    eq(typeof S.eitherToMaybe, 'function');
    eq(S.eitherToMaybe.length, 1);
    eq(S.eitherToMaybe.toString(), 'eitherToMaybe :: Either a b -> Maybe b');
  });

  it('returns Nothing when applied to a Left', function() {
    eq(S.eitherToMaybe(S.Left('Cannot divide by zero')), S.Nothing);
  });

  it('returns a Just when applied to a Right', function() {
    eq(S.eitherToMaybe(S.Right(42)), S.Just(42));
  });

});
