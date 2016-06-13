'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('drop', function() {

  it('is a binary function', function() {
    eq(typeof S.drop, 'function');
    eq(S.drop.length, 2);
    eq(S.drop.toString(), 'drop :: Integer -> List a -> Maybe (List a)');
  });

  it('returns Nothing if n is greater than collection length', function() {
    eq(S.drop(6, ['a', 'b', 'c', 'd', 'e']), S.Nothing);
    eq(S.drop(6, 'abcde'), S.Nothing);
  });

  it('returns Nothing if n is negative', function() {
    eq(S.drop(-3, ['a', 'b', 'c', 'd', 'e']), S.Nothing);
    eq(S.drop(-0, ['a', 'b', 'c', 'd', 'e']), S.Nothing);
    eq(S.drop(-3, 'abcde'), S.Nothing);
    eq(S.drop(-0, 'abcde'), S.Nothing);
    eq(S.drop(new Number(-0), ['a', 'b', 'c', 'd', 'e']), S.Nothing);
  });

  it('returns an empty collection if n is equal to collection length', function() {
    eq(S.drop(5, ['a', 'b', 'c', 'd', 'e']), S.Just([]));
    eq(S.drop(5, 'abcde'), S.Just(''));
  });

  it('returns Just the last three elements from the collection', function() {
    eq(S.drop(2, ['a', 'b', 'c', 'd', 'e']), S.Just(['c', 'd', 'e']));
    eq(S.drop(4, 'abcdefg'), S.Just('efg'));
  });

  it('returns Just the whole collection if n is zero', function() {
    eq(S.drop(0, ['a', 'b', 'c', 'd', 'e']), S.Just(['a', 'b', 'c', 'd', 'e']));
    eq(S.drop(0, 'abcdefg'), S.Just('abcdefg'));
  });

});
