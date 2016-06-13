'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('parseJson', function() {

  it('is a binary function', function() {
    eq(typeof S.parseJson, 'function');
    eq(S.parseJson.length, 2);
    eq(S.parseJson.toString(), 'parseJson :: TypeRep a -> String -> Maybe a');
  });

  it('returns a Just when applied to a valid JSON string', function() {
    eq(S.parseJson(Array, '["foo","bar"]'), S.Just(['foo', 'bar']));
  });

  it('returns Nothing when applied to an invalid JSON string', function() {
    eq(S.parseJson(Object, '[Invalid JSON]'), S.Nothing);
  });

  it('returns Nothing when the parsed result is not a member of the given type', function() {
    eq(S.parseJson(Array, '{"foo":"bar"}'), S.Nothing);
  });

});
