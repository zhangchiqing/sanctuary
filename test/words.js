'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('words', function() {

  it('is a unary function', function() {
    eq(typeof S.words, 'function');
    eq(S.words.length, 1);
    eq(S.words.toString(), 'words :: String -> Array String');
  });

  it('splits a string into a list of words', function() {
    eq(S.words(''), []);
    eq(S.words(' '), []);
    eq(S.words(' \t\r\n'), []);
    eq(S.words('foo bar baz'), ['foo', 'bar', 'baz']);
    eq(S.words(' foo bar baz '), ['foo', 'bar', 'baz']);
    eq(S.words('\tfoo\r\n\tbar\r\n\tbaz\r\n'), ['foo', 'bar', 'baz']);
  });

});
