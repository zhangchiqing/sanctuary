'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('S', function() {

  it('is a ternary function', function() {
    eq(typeof S.S, 'function');
    eq(S.S.length, 3);
    eq(S.S.toString(), 'S :: (a -> b -> c) -> (a -> b) -> a -> c');
  });

  it('S(f, g, x) is equivalent to f(x)(g(x))', function() {
    eq(S.S(S.add, Math.sqrt, 100), 110);
  });

});
