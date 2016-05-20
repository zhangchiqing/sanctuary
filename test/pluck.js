'use strict';

var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
var S = require('..');
var T = function() { return true; };


describe('pluck', function() {

  it('is a ternary function', function() {
    eq(typeof S.pluck, 'function');
    eq(S.pluck.length, 3);
  });

  it('type checks its arguments', function() {
    throws(function() { S.pluck([1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'pluck :: Accessible a => (Any -> Boolean) -> String -> Array a -> Array (Maybe c)\n' +
                   '                         ^^^^^^^^^^^^^^^^\n' +
                   '                                1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Any -> Boolean’.\n'));

    throws(function() { S.pluck(String, 'x', [{x: 'a'}]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'pluck :: Accessible a => (Any -> Boolean) -> String -> Array a -> Array (Maybe c)\n' +
                   '                                 ^^^^^^^\n' +
                   '                                    1\n' +
                   '\n' +
                   '1)  "a" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Boolean’.\n'));

    throws(function() { S.pluck(T, [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'pluck :: Accessible a => (Any -> Boolean) -> String -> Array a -> Array (Maybe c)\n' +
                   '                                             ^^^^^^\n' +
                   '                                               1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));

    throws(function() { S.pluck(T, 'x', {length: 0}); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'pluck :: Accessible a => (Any -> Boolean) -> String -> Array a -> Array (Maybe c)\n' +
                   '                                                       ^^^^^^^\n' +
                   '                                                          1\n' +
                   '\n' +
                   '1)  {"length": 0} :: Object, StrMap Number, StrMap FiniteNumber, StrMap Integer, StrMap ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Array a’.\n'));
  });

  it('returns a list of satisfactory plucked values', function() {
    var xs = [{x: '1'}, {x: 2}, {x: null}, {x: undefined}, {}];
    eq(S.pluck(S.is(Number), 'x', []), []);
    eq(S.pluck(S.is(Number), 'x', xs),
       [S.Nothing(), S.Just(2), S.Nothing(), S.Nothing(), S.Nothing()]);
  });

  it('is curried', function() {
    eq(S.pluck(T).length, 2);
    eq(S.pluck(T)('x').length, 1);
    eq(S.pluck(T)('x')([{x: 42}]), [S.Just(42)]);
  });

});
