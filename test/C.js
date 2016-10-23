'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('C', function() {

  it('is a ternary function', function() {
    eq(typeof S.C, 'function');
    eq(S.C.length, 3);
    eq(S.C.toString(), 'C :: (a -> b -> c) -> b -> a -> c');
  });

  it('C(f, x, y) is equivalent to f(y)(x)', function() {
    eq(S.C(S.concat, 'foo', 'bar'), 'barfoo');
    eq(S.map(S.C(S.concat, '!'), ['BAM', 'POW', 'KA-POW']), ['BAM!', 'POW!', 'KA-POW!']);
  });

});
