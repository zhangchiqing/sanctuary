'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('map', function() {

  it('is a binary function', function() {
    eq(typeof S.map, 'function');
    eq(S.map.length, 2);
    eq(S.map.toString(), 'map :: Functor f => (a -> b) -> f a -> f b');
  });

  it('maps a function into the context of Functors', function() {
    eq(S.map(S.not, S.odd)(2), true);
    eq(S.map(S.not, S.odd)(3), false);

    eq(S.map(S.mult(4), S.Just(2)), S.Just(8));
    eq(S.map(S.mult(4), S.Nothing), S.Nothing);

    eq(S.map(S.mult(4), S.Left(3)), S.Left(3));
    eq(S.map(S.mult(4), S.Right(2)), S.Right(8));

    eq(S.map(S.mult(2), [1, 2, 3]), [2, 4, 6]);
    eq(S.map(S.mult(2), []), []);

    eq(S.map(S.mult(2), {a: 1, b: 2, c: 3}), {a: 2, b: 4, c: 6});
    eq(S.map(S.mult(2), {}), {});
  });

});
