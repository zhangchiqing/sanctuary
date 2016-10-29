'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('takeLast', function() {

  it('is a binary function', function() {
    eq(typeof S.takeLast, 'function');
    eq(S.takeLast.length, 2);
    eq(S.takeLast.toString(), 'takeLast :: Integer -> List a -> Maybe (List a)');
  });

  it('returns Nothing if n is negative', function() {
    eq(S.takeLast(-0, ['a', 'b', 'c', 'd', 'e']), S.Nothing);
    eq(S.takeLast(-1, ['a', 'b', 'c', 'd', 'e']), S.Nothing);
    eq(S.takeLast(-0, 'abcde'), S.Nothing);
    eq(S.takeLast(-1, 'abcde'), S.Nothing);
    eq(S.takeLast(new Number(-0), ['a', 'b', 'c', 'd', 'e']), S.Nothing);
  });

  it('returns a Just with the last n elements for valid n; Nothing otherwise', function() {
    eq(S.takeLast(4, ['a', 'b', 'c']), S.Nothing);
    eq(S.takeLast(3, ['a', 'b', 'c']), S.Just(['a', 'b', 'c']));
    eq(S.takeLast(2, ['a', 'b', 'c']), S.Just(['b', 'c']));
    eq(S.takeLast(1, ['a', 'b', 'c']), S.Just(['c']));
    eq(S.takeLast(0, ['a', 'b', 'c']), S.Just([]));
    eq(S.takeLast(4, 'abc'), S.Nothing);
    eq(S.takeLast(3, 'abc'), S.Just('abc'));
    eq(S.takeLast(2, 'abc'), S.Just('bc'));
    eq(S.takeLast(1, 'abc'), S.Just('c'));
    eq(S.takeLast(0, 'abc'), S.Just(''));
  });

});
