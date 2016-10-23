'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('T', function() {

  it('is a binary function', function() {
    eq(typeof S.T, 'function');
    eq(S.T.length, 2);
    eq(S.T.toString(), 'T :: a -> (a -> b) -> b');
  });

  it('T(x, f) is equivalent to f(x)', function() {
    eq(S.T(42, S.inc), 43);
    eq(S.map(S.T(100), [S.inc, Math.sqrt]), [101, 10]);
  });

});
