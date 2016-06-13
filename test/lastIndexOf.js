'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('lastIndexOf', function() {

  it('is a binary function', function() {
    eq(typeof S.lastIndexOf, 'function');
    eq(S.lastIndexOf.length, 2);
    eq(S.lastIndexOf.toString(), 'lastIndexOf :: a -> List a -> Maybe Integer');
  });

  it('returns Nothing for an empty list', function() {
    eq(S.lastIndexOf('a', []), S.Nothing);
  });

  it('returns Nothing if the element is not found', function() {
    eq(S.lastIndexOf('x', ['b', 'a', 'n', 'a', 'n', 'a']), S.Nothing);
  });

  it('returns Just the last index of the element found', function() {
    eq(S.lastIndexOf('a', ['b', 'a', 'n', 'a', 'n', 'a']), S.Just(5));
  });

  it('can operate on strings', function() {
    eq(S.lastIndexOf('an', 'banana'), S.Just(3));
    eq(S.lastIndexOf('ax', 'banana'), S.Nothing);
  });

});
