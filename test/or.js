'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('or', function() {

  it('is a binary function', function() {
    eq(typeof S.or, 'function');
    eq(S.or.length, 2);
    eq(S.or.toString(), 'or :: Alternative a => a -> a -> a');
  });

  it('can be applied to Booleans', function() {
    eq(S.or(false, false), false);
    eq(S.or(false, true), true);
    eq(S.or(true, false), true);
    eq(S.or(true, true), true);
  });

  it('can be applied to arrays', function() {
    eq(S.or([], []), []);
    eq(S.or([], [42]), [42]);
    eq(S.or([42], []), [42]);
    eq(S.or([42], [43]), [42]);
  });

  it('can be applied to maybes', function() {
    eq(S.or(S.Nothing, S.Nothing), S.Nothing);
    eq(S.or(S.Nothing, S.Just(42)), S.Just(42));
    eq(S.or(S.Just(42), S.Nothing), S.Just(42));
    eq(S.or(S.Just(42), S.Just(43)), S.Just(42));
  });

  it('can be applied to eithers', function() {
    eq(S.or(S.Left('foo'), S.Left('bar')), S.Left('bar'));
    eq(S.or(S.Left('foo'), S.Right(42)), S.Right(42));
    eq(S.or(S.Right(42), S.Left('foo')), S.Right(42));
    eq(S.or(S.Right(42), S.Right(43)), S.Right(42));
  });

});
