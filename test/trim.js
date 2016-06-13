'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('trim', function() {

  it('is a unary function', function() {
    eq(typeof S.trim, 'function');
    eq(S.trim.length, 1);
    eq(S.trim.toString(), 'trim :: String -> String');
  });

  it('strips leading and trailing whitespace characters', function() {
    eq(S.trim(''), '');
    eq(S.trim(' '), '');
    eq(S.trim('x'), 'x');
    eq(S.trim(' x'), 'x');
    eq(S.trim('x '), 'x');
    eq(S.trim(' x '), 'x');
    eq(S.trim('\n\r\t x \n\r\t x \n\r\t'), 'x \n\r\t x');
  });

});
