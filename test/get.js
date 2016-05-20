'use strict';
var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
var S = require('..');
var T = function() { return true; };
var F = function() { return false; };


describe('get', function() {

  it('is a ternary function', function() {
    eq(typeof S.get, 'function');
    eq(S.get.length, 3);
  });

  it('type checks its arguments', function() {
    throws(function() { S.get([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'get :: Accessible a => (Any -> Boolean) -> String -> a -> Maybe c\n' +
                   '                       ^^^^^^^^^^^^^^^^\n' +
                   '                              1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Any -> Boolean’.\n'));

    throws(function() { S.get(String, 'x', {x: 'a'}); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'get :: Accessible a => (Any -> Boolean) -> String -> a -> Maybe c\n' +
                   '                               ^^^^^^^\n' +
                   '                                  1\n' +
                   '\n' +
                   '1)  "a" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Boolean’.\n'));

    throws(function() { S.get(T, [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'get :: Accessible a => (Any -> Boolean) -> String -> a -> Maybe c\n' +
                   '                                           ^^^^^^\n' +
                   '                                             1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));

    throws(function() { S.get(T, 'x', null); },
           errorEq(TypeError,
                   'Type-class constraint violation\n' +
                   '\n' +
                   'get :: Accessible a => (Any -> Boolean) -> String -> a -> Maybe c\n' +
                   '       ^^^^^^^^^^^^                                  ^\n' +
                   '                                                     1\n' +
                   '\n' +
                   '1)  null :: Null\n' +
                   '\n' +
                   '‘get’ requires ‘a’ to satisfy the Accessible type-class constraint; the value at position 1 does not.\n'));
  });

  it('returns Nothing if the predicate returns false', function() {
    eq(S.get(F, 'x', {x: 1}), S.Nothing());
  });

  it('returns Just if the predicate returns true', function() {
    eq(S.get(T, 'x', {x: 1}), S.Just(1));
  });

  it('returns a Maybe', function() {
    var obj = {x: 0, y: 42};
    eq(S.get(S.is(Number), 'x', obj), S.Just(0));
    eq(S.get(S.is(Number), 'y', obj), S.Just(42));
    eq(S.get(S.is(Number), 'z', obj), S.Nothing());
    eq(S.get(S.is(String), 'x', obj), S.Nothing());
  });

  it('is curried', function() {
    eq(S.get(T).length, 2);
    eq(S.get(T)('x').length, 1);
    eq(S.get(T)('x')({x: 42}), S.Just(42));
  });

});
