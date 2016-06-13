'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('indexOf', function() {

  it('is a binary function', function() {
    eq(typeof S.indexOf, 'function');
    eq(S.indexOf.length, 2);
    eq(S.indexOf.toString(), 'indexOf :: a -> List a -> Maybe Integer');
  });

  it('returns Nothing for an empty list', function() {
    eq(S.indexOf(10, []), S.Nothing);
  });

  it('returns Nothing if the element is not found', function() {
    eq(S.indexOf('x', ['b', 'a', 'n', 'a', 'n', 'a']), S.Nothing);
  });

  it('returns Just the index of the element found', function() {
    eq(S.indexOf('a', ['b', 'a', 'n', 'a', 'n', 'a']), S.Just(1));
  });

  it('can operate on strings', function() {
    eq(S.indexOf('an', 'banana'), S.Just(1));
    eq(S.indexOf('ax', 'banana'), S.Nothing);
  });

});
