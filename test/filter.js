'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('filter', function() {

  it('is a binary function', function() {
    eq(typeof S.filter, 'function');
    eq(S.filter.length, 2);
    eq(S.filter.toString(), 'filter :: (Applicative f, Foldable f, Monoid f) => (a -> Boolean) -> f a -> f a');
  });

  it('filters a value based on the given predicate', function() {
    eq(S.filter(S.odd, []), []);
    eq(S.filter(S.odd, [0, 2, 4, 6, 8]), []);
    eq(S.filter(S.odd, [1, 3, 5, 7, 9]), [1, 3, 5, 7, 9]);
    eq(S.filter(S.odd, [1, 2, 3, 4, 5]), [1, 3, 5]);
    eq(S.filter(S.odd, S.Nothing), S.Nothing);
    eq(S.filter(S.odd, S.Just(4)), S.Nothing);
    eq(S.filter(S.odd, S.Just(9)), S.Just(9));
  });

});
