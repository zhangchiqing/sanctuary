'use strict';

var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
var S = require('..');


describe('parseJson', function() {

  it('is a binary function', function() {
    eq(typeof S.parseJson, 'function');
    eq(S.parseJson.length, 2);
  });

  it('type checks its arguments', function() {
    throws(function() { S.parseJson('String'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'parseJson :: (Any -> Boolean) -> String -> Maybe b\n' +
                   '             ^^^^^^^^^^^^^^^^\n' +
                   '                    1\n' +
                   '\n' +
                   '1)  "String" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Any -> Boolean’.\n'));

    throws(function() { S.parseJson(String, '"a"'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'parseJson :: (Any -> Boolean) -> String -> Maybe b\n' +
                   '                     ^^^^^^^\n' +
                   '                        1\n' +
                   '\n' +
                   '1)  "a" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘Boolean’.\n'));

    throws(function() { S.parseJson(S.K(true), [1, 2, 3]); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'parseJson :: (Any -> Boolean) -> String -> Maybe b\n' +
                   '                                 ^^^^^^\n' +
                   '                                   1\n' +
                   '\n' +
                   '1)  [1, 2, 3] :: Array Number, Array FiniteNumber, Array NonZeroFiniteNumber, Array Integer, Array ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('returns a Just when applied to a valid JSON string', function() {
    eq(S.parseJson(S.K(true), '["foo","bar"]'), S.Just(['foo', 'bar']));
  });

  it('returns a Nothing when applied to an invalid JSON string', function() {
    eq(S.parseJson(S.K(true), '[Invalid JSON]'), S.Nothing());
  });

  it('returns a Nothing when the predicate returns false', function() {
    eq(S.parseJson(S.K(false), '{"foo":"bar"}'), S.Nothing());
  });

});
