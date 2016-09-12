'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('compose', function() {

  it('is a ternary function', function() {
    eq(typeof S.compose, 'function');
    eq(S.compose.length, 3);
    eq(S.compose.toString(), 'compose :: (b -> c) -> (a -> b) -> a -> c');
  });

  it('composes two functions assumed to be unary', function() {
    eq(S.compose(S.map(Math.sqrt), JSON.parse, '[1, 4, 9]'), [1, 2, 3]);
  });

});
