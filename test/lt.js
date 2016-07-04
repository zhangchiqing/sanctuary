'use strict';

var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
var S = require('..');


describe('lt', function() {

  it('is a binary function', function() {
    eq(typeof S.lt, 'function');
    eq(S.lt.length, 2);
  });

  it('type checks its arguments', function() {
    throws(function() { S.lt(null); },
           errorEq(TypeError,
                   'Type-class constraint violation\n' +
                   '\n' +
                   'lt :: Ord a => a -> a -> Boolean\n' +
                   '      ^^^^^    ^\n' +
                   '               1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   '‘lt’ requires ‘a’ to satisfy the Ord type-class constraint; the value at position 1 does not.\n'));

    throws(function() { S.lt('abc', 123); },
           errorEq(TypeError,
                   'Type-variable constraint violation\n' +
                   '\n' +
                   'lt :: Ord a => a -> a -> Boolean\n' +
                   '               ^    ^\n' +
                   '               1    2\n' +
                   '\n' +
                   '1)  "abc" :: String\n' +
                   '\n' +
                   '2)  123 :: Number, FiniteNumber, NonZeroFiniteNumber, Integer, ValidNumber\n' +
                   '\n' +
                   'Since there is no type of which all the above values are members, the type-variable constraint has been violated.\n'));
  });

  it('has < semantics', function() {
    eq(S.lt(0, 0), false);
    eq(S.lt(0, -0), false);
    eq(S.lt(-0, 0), false);
    eq(S.lt(-0, -0), false);
    eq(S.lt(0, 1), true);
    eq(S.lt(1, 0), false);
    eq(S.lt(0, -1), false);
    eq(S.lt(-1, 0), true);
    eq(S.lt('a', 'a'), false);
    eq(S.lt('a', 'z'), true);
    eq(S.lt('z', 'a'), false);
    eq(S.lt(new Date(0), new Date(0)), false);
    eq(S.lt(new Date(0), new Date(1)), true);
    eq(S.lt(new Date(1), new Date(0)), false);
  });

  it('is curried', function() {
    eq(S.lt(0).length, 1);
    eq(S.lt(0)(1), true);
  });

});
