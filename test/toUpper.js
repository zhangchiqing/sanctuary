'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('toUpper', function() {

  it('is a unary function', function() {
    eq(typeof S.toUpper, 'function');
    eq(S.toUpper.length, 1);
    eq(S.toUpper.toString(), 'toUpper :: String -> String');
  });

  it('returns the upper-case equivalent of its argument', function() {
    eq(S.toUpper(''), '');
    eq(S.toUpper('ABC def 123'), 'ABC DEF 123');
    eq(S.toUpper(new String('')), '');
    eq(S.toUpper(new String('ABC def 123')), 'ABC DEF 123');
  });

});
