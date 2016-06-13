'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('last', function() {

  it('is a unary function', function() {
    eq(typeof S.last, 'function');
    eq(S.last.length, 1);
    eq(S.last.toString(), 'last :: List a -> Maybe a');
  });

  it('returns Nothing if applied to empty list', function() {
    eq(S.last([]), S.Nothing);
  });

  it('returns Just the last element of a nonempty list', function() {
    eq(S.last(['foo', 'bar', 'baz']), S.Just('baz'));
  });

});
