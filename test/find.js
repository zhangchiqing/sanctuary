'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('find', function() {

  it('is a binary function', function() {
    eq(typeof S.find, 'function');
    eq(S.find.length, 2);
    eq(S.find.toString(), 'find :: (a -> Boolean) -> Array a -> Maybe a');
  });

  it('returns Just the first element satisfying the predicate', function() {
    eq(S.find(S.K(true), [null]), S.Just(null));
    eq(S.find(function(n) { return n >= 0; }, [-1, 0, 1]), S.Just(0));
  });

  it('returns Nothing if no element satisfies the predicate', function() {
    eq(S.find(S.K(true), []), S.Nothing);
    eq(S.find(S.K(false), [1, 2, 3]), S.Nothing);
  });

});
