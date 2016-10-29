'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('lift2', function() {

  it('is a ternary function', function() {
    eq(typeof S.lift2, 'function');
    eq(S.lift2.length, 3);
    eq(S.lift2.toString(), 'lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c');
  });

  it('lifts a function into the context of Applys', function() {
    //  positive :: Number -> Boolean
    var positive = function(n) { return n > 0; };

    eq(S.lift2(S.add, S.Just(3), S.Just(3)), S.Just(6));
    eq(S.lift2(S.add, S.Nothing, S.Just(3)), S.Nothing);

    eq(S.lift2(S.add, S.Right(3), S.Left(4)), S.Left(4));
    eq(S.lift2(S.add, S.Right(3), S.Right(4)), S.Right(7));

    eq(S.lift2(S.add, [1, 2], [10, 20]), [11, 21, 12, 22]);
    eq(S.lift2(S.add, [], [1, 2]), []);

    eq(S.lift2(S.and, S.even, positive)(42), true);
    eq(S.lift2(S.and, S.even, positive)(43), false);
    eq(S.lift2(S.and, S.even, positive)(-42), false);
    eq(S.lift2(S.and, S.even, positive)(-43), false);
  });

});
