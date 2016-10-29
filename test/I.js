'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('I', function() {

  it('is a unary function', function() {
    eq(typeof S.I, 'function');
    eq(S.I.length, 1);
    eq(S.I.toString(), 'I :: a -> a');
  });

  it('returns its argument', function() {
    eq(S.I([1, 2, 3]), [1, 2, 3]);
    eq(S.I(['foo', 42]), ['foo', 42]);
  });

});
