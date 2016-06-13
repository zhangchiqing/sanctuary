'use strict';

var R = require('ramda');

var S = require('..');

var eq = require('./internal/eq');


describe('maybe', function() {

  it('is a ternary function', function() {
    eq(typeof S.maybe, 'function');
    eq(S.maybe.length, 3);
    eq(S.maybe.toString(), 'maybe :: b -> (a -> b) -> Maybe a -> b');
  });

  it('can be applied to Nothing', function() {
    eq(S.maybe(0, R.length, S.Nothing), 0);
  });

  it('can be applied to a Just', function() {
    eq(S.maybe(0, R.length, S.Just([1, 2, 3])), 3);
  });

});
