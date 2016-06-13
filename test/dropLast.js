'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('dropLast', function() {

  it('is a binary function', function() {
    eq(typeof S.dropLast, 'function');
    eq(S.dropLast.length, 2);
    eq(S.dropLast.toString(), 'dropLast :: Integer -> List a -> Maybe (List a)');
  });

  it('returns Nothing if n is negative', function() {
    eq(S.dropLast(-3, ['a', 'b', 'c', 'd', 'e']), S.Nothing);
    eq(S.dropLast(-0, ['a', 'b', 'c', 'd', 'e']), S.Nothing);
    eq(S.dropLast(-3, 'abcde'), S.Nothing);
    eq(S.dropLast(-0, 'abcde'), S.Nothing);
    eq(S.dropLast(new Number(-0), ['a', 'b', 'c', 'd', 'e']), S.Nothing);
  });

  it('returns a Just dropping the last n items for valid n; Nothing otherwise', function() {
    eq(S.dropLast(4, ['a', 'b', 'c']), S.Nothing);
    eq(S.dropLast(3, ['a', 'b', 'c']), S.Just([]));
    eq(S.dropLast(2, ['a', 'b', 'c']), S.Just(['a']));
    eq(S.dropLast(1, ['a', 'b', 'c']), S.Just(['a', 'b']));
    eq(S.dropLast(0, ['a', 'b', 'c']), S.Just(['a', 'b', 'c']));
    eq(S.dropLast(4, 'abc'), S.Nothing);
    eq(S.dropLast(3, 'abc'), S.Just(''));
    eq(S.dropLast(2, 'abc'), S.Just('a'));
    eq(S.dropLast(1, 'abc'), S.Just('ab'));
    eq(S.dropLast(0, 'abc'), S.Just('abc'));
  });

});
