'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('at', function() {

  it('is a binary function', function() {
    eq(typeof S.at, 'function');
    eq(S.at.length, 2);
    eq(S.at.toString(), 'at :: Integer -> List a -> Maybe a');
  });

  it('returns Just the nth element of a list', function() {
    eq(S.at(1, ['foo', 'bar', 'baz']), S.Just('bar'));
  });

  it('accepts negative offset', function() {
    eq(S.at(-1, ['foo', 'bar', 'baz']), S.Just('baz'));
  });

  it('returns Nothing if index out of bounds', function() {
    eq(S.at(3, ['foo', 'bar', 'baz']), S.Nothing);
    eq(S.at(-4, ['foo', 'bar', 'baz']), S.Nothing);
    eq(S.at(-0, ['foo', 'bar', 'baz']), S.Nothing);
  });

});
