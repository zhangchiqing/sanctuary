'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('test', function() {

  it('is a binary function', function() {
    eq(typeof S.test, 'function');
    eq(S.test.length, 2);
    eq(S.test.toString(), 'test :: RegExp -> String -> Boolean');
  });

  it('returns true if pattern matches string', function() {
    eq(S.test(/^a/, 'abacus'), true);
  });

  it('returns false if pattern does not match string', function() {
    eq(S.test(/^a/, 'banana'), false);
  });

  it('is referentially transparent', function() {
    var pattern = /x/g;
    eq(pattern.lastIndex, 0);
    eq(S.test(pattern, 'xyz'), true);
    eq(pattern.lastIndex, 0);
    eq(S.test(pattern, 'xyz'), true);
  });

});
