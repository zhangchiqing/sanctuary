'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('K', function() {

  it('is a binary function', function() {
    eq(typeof S.K, 'function');
    eq(S.K.length, 2);
    eq(S.K.toString(), 'K :: a -> b -> a');
  });

  it('returns its first argument', function() {
    eq(S.K(21, []), 21);
    eq(S.K(42, null), 42);
    eq(S.K(84, undefined), 84);
  });

});
