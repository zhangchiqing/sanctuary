'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('head', function() {

  it('is a unary function', function() {
    eq(typeof S.head, 'function');
    eq(S.head.length, 1);
    eq(S.head.toString(), 'head :: List a -> Maybe a');
  });

  it('returns Nothing if applied to empty list', function() {
    eq(S.head([]), S.Nothing);
  });

  it('returns Just the head of a nonempty list', function() {
    eq(S.head(['foo', 'bar', 'baz']), S.Just('foo'));
  });

});
