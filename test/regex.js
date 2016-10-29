'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('regex', function() {

  it('is a binary function', function() {
    eq(typeof S.regex, 'function');
    eq(S.regex.length, 2);
    eq(S.regex.toString(), 'regex :: ("" | "g" | "i" | "m" | "gi" | "gm" | "im" | "gim") -> String -> RegExp');
  });

  it('returns a RegExp', function() {
    eq(S.regex('', '\\d'), /\d/);
    eq(S.regex('g', '\\d'), /\d/g);
    eq(S.regex('i', '\\d'), /\d/i);
    eq(S.regex('m', '\\d'), /\d/m);
    eq(S.regex('gi', '\\d'), /\d/gi);
    eq(S.regex('gm', '\\d'), /\d/gm);
    eq(S.regex('im', '\\d'), /\d/im);
    eq(S.regex('gim', '\\d'), /\d/gim);
  });

});
