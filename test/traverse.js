'use strict';

var S = require('./internal/sanctuary');

var Identity = require('./internal/Identity');
var eq = require('./internal/eq');


describe('traverse', function() {

  it('is a ternary function', function() {
    eq(typeof S.traverse, 'function');
    eq(S.traverse.length, 3);
    eq(S.traverse.toString(), 'traverse :: (Applicative f, Traversable t) => (a -> f a) -> (b -> f c) -> t b -> f (t c)');
  });

  it('TK', function() {
    eq(S.traverse(S.Just, S.parseInt(16), ['A', 'B', 'C']), S.Just([10, 11, 12]));
    eq(S.traverse(S.Just, S.parseInt(16), ['A', 'B', 'C', 'X']), S.Nothing);

    eq(S.traverse(S.of(Array), S.I, []), [[]]);
    eq(S.traverse(S.of(Array), S.I, [['A', 'a']]), [['A'], ['a']]);
    eq(S.traverse(S.of(Array), S.I, [['A', 'a'], ['B']]), [['A', 'B'], ['a', 'B']]);
    eq(S.traverse(S.of(Array), S.I, [['A', 'a'], ['B', 'b']]), [['A', 'B'], ['A', 'b'], ['a', 'B'], ['a', 'b']]);

    eq(S.traverse(S.of(Array), S.I, Identity([])), []);
    eq(S.traverse(S.of(Array), S.I, Identity([1])), [Identity(1)]);
    eq(S.traverse(S.of(Array), S.I, Identity([1, 2])), [Identity(1), Identity(2)]);
    eq(S.traverse(S.of(Array), S.I, Identity([1, 2, 3])), [Identity(1), Identity(2), Identity(3)]);

    eq(S.traverse(Identity, S.I, []), Identity([]));
    eq(S.traverse(Identity, S.I, [Identity(1)]), Identity([1]));
    eq(S.traverse(Identity, S.I, [Identity(1), Identity(2)]), Identity([1, 2]));
    eq(S.traverse(Identity, S.I, [Identity(1), Identity(2), Identity(3)]), Identity([1, 2, 3]));
  });

});
