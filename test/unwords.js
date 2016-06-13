'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('unwords', function() {

  it('is a unary function', function() {
    eq(typeof S.unwords, 'function');
    eq(S.unwords.length, 1);
    eq(S.unwords.toString(), 'unwords :: Array String -> String');
  });

  it('joins -- with separating spaces -- a list of words', function() {
    eq(S.unwords([]), '');
    eq(S.unwords(['']), '');
    eq(S.unwords(['', '']), ' ');
    eq(S.unwords([' ']), ' ');
    eq(S.unwords([' ', ' ']), '   ');
    eq(S.unwords(['foo', 'bar', 'baz']), 'foo bar baz');
    eq(S.unwords([' foo ', ' bar ', ' baz ']), ' foo   bar   baz ');
  });

});
