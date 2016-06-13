'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('tail', function() {

  it('is a unary function', function() {
    eq(typeof S.tail, 'function');
    eq(S.tail.length, 1);
    eq(S.tail.toString(), 'tail :: List a -> Maybe (List a)');
  });

  it('returns Nothing if applied to empty list', function() {
    eq(S.tail([]), S.Nothing);
  });

  it('returns Just the tail of a nonempty list', function() {
    eq(S.tail(['foo', 'bar', 'baz']), S.Just(['bar', 'baz']));
  });

});
