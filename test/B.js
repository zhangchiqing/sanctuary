'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('B', function() {

  it('is a ternary function', function() {
    eq(typeof S.B, 'function');
    eq(S.B.length, 3);
    eq(S.B.toString(), 'B :: (b -> c) -> (a -> b) -> a -> c');
  });

  it('composes two functions assumed to be unary', function() {
    eq(S.B(S.map(Math.sqrt), JSON.parse, '[1, 4, 9]'), [1, 2, 3]);
  });

});
