'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('flip', function() {

  it('is a ternary function', function() {
    eq(typeof S.flip, 'function');
    eq(S.flip.length, 3);
    eq(S.flip.toString(), 'flip :: ((a, b) -> c) -> b -> a -> c');
  });

  it("flips a function's argument order", function() {
    eq(S.map(S.flip(Math.pow)(2), [1, 2, 3, 4, 5]), [1, 4, 9, 16, 25]);
    eq(S.flip(S.indexOf, ['a', 'b', 'c', 'd'], 'c'), S.Just(2));
  });

});
