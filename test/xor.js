'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('xor', function() {

  it('is a binary function', function() {
    eq(typeof S.xor, 'function');
    eq(S.xor.length, 2);
    eq(S.xor.toString(), 'xor :: (Alternative a, Monoid a) => a -> a -> a');
  });

  it('can be applied to Booleans', function() {
    eq(S.xor(false, false), false);
    eq(S.xor(false, true), true);
    eq(S.xor(true, false), true);
    eq(S.xor(true, true), false);
  });

  it('can be applied to arrays', function() {
    eq(S.xor([], []), []);
    eq(S.xor([], [42]), [42]);
    eq(S.xor([42], []), [42]);
    eq(S.xor([42], [43]), []);
  });

  it('can be applied to maybes', function() {
    eq(S.xor(S.Nothing, S.Nothing), S.Nothing);
    eq(S.xor(S.Nothing, S.Just(42)), S.Just(42));
    eq(S.xor(S.Just(42), S.Nothing), S.Just(42));
    eq(S.xor(S.Just(42), S.Just(43)), S.Nothing);
  });

});
