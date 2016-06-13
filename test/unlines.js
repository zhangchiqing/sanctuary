'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('unlines', function() {

  it('is a unary function', function() {
    eq(typeof S.unlines, 'function');
    eq(S.unlines.length, 1);
    eq(S.unlines.toString(), 'unlines :: Array String -> String');
  });

  it('joins a list of lines after appending "\n" to each', function() {
    eq(S.unlines([]), '');
    eq(S.unlines(['']), '\n');
    eq(S.unlines(['', '']), '\n\n');
    eq(S.unlines(['\n']), '\n\n');
    eq(S.unlines(['\n', '\n']), '\n\n\n\n');
    eq(S.unlines(['foo', 'bar', 'baz']), 'foo\nbar\nbaz\n');
  });

});
