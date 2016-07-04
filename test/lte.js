'use strict';

var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
var S = require('..');


describe('lte', function() {

  it('is a binary function', function() {
    eq(typeof S.lte, 'function');
    eq(S.lte.length, 2);
  });

  it('type checks its arguments', function() {
    throws(function() { S.lte(null); },
           errorEq(TypeError,
                   'Type-class constraint violation\n' +
                   '\n' +
                   'lte :: Ord a => a -> a -> Boolean\n' +
                   '       ^^^^^    ^\n' +
                   '                1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   '‘lte’ requires ‘a’ to satisfy the Ord type-class constraint; the value at position 1 does not.\n'));

    throws(function() { S.lte('abc', 123); },
           errorEq(TypeError,
                   'Type-variable constraint violation\n' +
                   '\n' +
                   'lte :: Ord a => a -> a -> Boolean\n' +
                   '                ^    ^\n' +
                   '                1    2\n' +
                   '\n' +
                   '1)  "abc" :: String\n' +
                   '\n' +
                   '2)  123 :: Number, FiniteNumber, NonZeroFiniteNumber, Integer, ValidNumber\n' +
                   '\n' +
                   'Since there is no type of which all the above values are members, the type-variable constraint has been violated.\n'));
  });

  it('has <= semantics', function() {
    eq(S.lte(0, 0), true);
    eq(S.lte(0, -0), true);
    eq(S.lte(-0, 0), true);
    eq(S.lte(-0, -0), true);
    eq(S.lte(0, 1), true);
    eq(S.lte(1, 0), false);
    eq(S.lte(0, -1), false);
    eq(S.lte(-1, 0), true);
    eq(S.lte('a', 'a'), true);
    eq(S.lte('a', 'z'), true);
    eq(S.lte('z', 'a'), false);
    eq(S.lte(new Date(0), new Date(0)), true);
    eq(S.lte(new Date(0), new Date(1)), true);
    eq(S.lte(new Date(1), new Date(0)), false);
  });

  it('is curried', function() {
    eq(S.lte(0).length, 1);
    eq(S.lte(0)(1), true);
  });

});
