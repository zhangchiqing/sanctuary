'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('A', function() {

  it('is a binary function', function() {
    eq(typeof S.A, 'function');
    eq(S.A.length, 2);
    eq(S.A.toString(), 'A :: (a -> b) -> a -> b');
  });

  it('A(f, x) is equivalent to f(x)', function() {
    eq(S.A(S.inc, 1), 2);
    eq(S.map(S.A(S.__, 100), [S.inc, Math.sqrt]), [101, 10]);
  });

});
