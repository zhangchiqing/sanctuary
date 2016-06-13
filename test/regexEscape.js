'use strict';

var jsc = require('jsverify');

var S = require('..');

var eq = require('./internal/eq');


describe('regexEscape', function() {

  it('is a unary function', function() {
    eq(typeof S.regexEscape, 'function');
    eq(S.regexEscape.length, 1);
    eq(S.regexEscape.toString(), 'regexEscape :: String -> String');
  });

  it('escapes regular expression metacharacters', function() {
    eq(S.regexEscape('-=*{XYZ}*=-'), '\\-=\\*\\{XYZ\\}\\*=\\-');
  });

  it('property: test(regex("", regexEscape(s)), s)', function() {
    jsc.assert(jsc.forall(jsc.string, function(s) {
      return S.test(S.regex('', S.regexEscape(s)), s);
    }), {tests: 1000});
  });

  it('property: test(regex("", "^" + regexEscape(s) + "$"), s)', function() {
    jsc.assert(jsc.forall(jsc.string, function(s) {
      return S.test(S.regex('', '^' + S.regexEscape(s) + '$'), s);
    }), {tests: 1000});
  });

});
