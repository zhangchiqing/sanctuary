'use strict';

var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
var S = require('..');


describe('gets', function() {

  it('is a ternary function', function() {
    eq(typeof S.gets, 'function');
    eq(S.gets.length, 3);
  });

  it('type checks its arguments', function() {
    throws(function() { S.gets([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'gets :: Accessible a => (Any -> Boolean) -> Array String -> a -> Maybe c\n' +
                   '                        ^^^^^^^^^^^^^^^^\n' +
                   '                               1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Any -> Boolean’.\n'));

    throws(function() { S.gets(String, ['x'], {x: 'a'}); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'gets :: Accessible a => (Any -> Boolean) -> Array String -> a -> Maybe c\n' +
                   '                                ^^^^^^^\n' +
                   '                                   1\n' +
                   '\n' +
                   '1)  "a" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Boolean’.\n'));

    throws(function() { S.gets(S.K(true), null); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'gets :: Accessible a => (Any -> Boolean) -> Array String -> a -> Maybe c\n' +
                   '                                            ^^^^^^^^^^^^\n' +
                   '                                                 1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Array String’.\n'));

    throws(function() { S.gets(S.K(true), [], null); },
           errorEq(TypeError,
                   'Type-class constraint violation\n' +
                   '\n' +
                   'gets :: Accessible a => (Any -> Boolean) -> Array String -> a -> Maybe c\n' +
                   '        ^^^^^^^^^^^^                                        ^\n' +
                   '                                                            1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   '‘gets’ requires ‘a’ to satisfy the Accessible type-class constraint; the value at position 1 does not.\n'));
  });

  it('returns Nothing if the predicate returns false', function() {
    eq(S.gets(S.K(false), [], {}), S.Nothing());
    eq(S.gets(S.K(false), ['x'], {x: 1}), S.Nothing());
  });

  it('returns Just if the predicate returns true', function() {
    eq(S.gets(S.K(true), [], {}), S.Just({}));
    eq(S.gets(S.K(true), ['x'], {x: 1}), S.Just(1));
  });

  it('returns a Maybe', function() {
    var obj = {x: {z: 0}, y: 42};
    eq(S.gets(S.is(Number), ['x'], obj), S.Nothing());
    eq(S.gets(S.is(Number), ['y'], obj), S.Just(42));
    eq(S.gets(S.is(Number), ['z'], obj), S.Nothing());
    eq(S.gets(S.is(Number), ['x', 'z'], obj), S.Just(0));
    eq(S.gets(S.is(Number), ['a', 'b', 'c'], obj), S.Nothing());
    eq(S.gets(S.is(Number), [], obj), S.Nothing());
    eq(S.gets(S.is(Object), [], obj), S.Just({x: {z: 0}, y: 42}));
  });

  it('is curried', function() {
    eq(S.gets(S.K(true)).length, 2);
    eq(S.gets(S.K(true))(['x']).length, 1);
    eq(S.gets(S.K(true))(['x'])({x: 42}), S.Just(42));
  });

});
