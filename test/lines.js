'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('lines', function() {

  it('is a unary function', function() {
    eq(typeof S.lines, 'function');
    eq(S.lines.length, 1);
    eq(S.lines.toString(), 'lines :: String -> Array String');
  });

  it('splits a string into a list of lines', function() {
    eq(S.lines(''), []);
    eq(S.lines('\n'), ['']);
    eq(S.lines('\n\n'), ['', '']);
    eq(S.lines('foo\nbar\nbaz'), ['foo', 'bar', 'baz']);
    eq(S.lines('foo\nbar\nbaz\n'), ['foo', 'bar', 'baz']);
    eq(S.lines('\tfoo\r\n\tbar\r\n\tbaz\r\n'), ['\tfoo', '\tbar', '\tbaz']);
  });

});
