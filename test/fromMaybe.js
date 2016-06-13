'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('fromMaybe', function() {

  it('is a binary function', function() {
    eq(typeof S.fromMaybe, 'function');
    eq(S.fromMaybe.length, 2);
    eq(S.fromMaybe.toString(), 'fromMaybe :: a -> Maybe a -> a');
  });

  it('can be applied to Nothing', function() {
    eq(S.fromMaybe(0, S.Nothing), 0);
  });

  it('can be applied to a Just', function() {
    eq(S.fromMaybe(0, S.Just(42)), 42);
  });

});
