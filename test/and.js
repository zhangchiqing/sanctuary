'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('and', function() {

  it('is a binary function', function() {
    eq(typeof S.and, 'function');
    eq(S.and.length, 2);
    eq(S.and.toString(), 'and :: Alternative a => a -> a -> a');
  });

  it('can be applied to Booleans', function() {
    eq(S.and(false, false), false);
    eq(S.and(false, true), false);
    eq(S.and(true, false), false);
    eq(S.and(true, true), true);
  });

  it('can be applied to arrays', function() {
    eq(S.and([], []), []);
    eq(S.and([], [42]), []);
    eq(S.and([42], []), []);
    eq(S.and([42], [43]), [43]);
  });

  it('can be applied to maybes', function() {
    eq(S.and(S.Nothing, S.Nothing), S.Nothing);
    eq(S.and(S.Nothing, S.Just(42)), S.Nothing);
    eq(S.and(S.Just(42), S.Nothing), S.Nothing);
    eq(S.and(S.Just(42), S.Just(43)), S.Just(43));
  });

  it('can be applied to eithers', function() {
    eq(S.and(S.Left('foo'), S.Left('bar')), S.Left('foo'));
    eq(S.and(S.Left('foo'), S.Right(42)), S.Left('foo'));
    eq(S.and(S.Right(42), S.Left('foo')), S.Left('foo'));
    eq(S.and(S.Right(42), S.Right(43)), S.Right(43));
  });

});
