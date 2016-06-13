'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('match', function() {

  it('is a binary function', function() {
    eq(typeof S.match, 'function');
    eq(S.match.length, 2);
    eq(S.match.toString(), 'match :: RegExp -> String -> Maybe (Array (Maybe String))');
  });

  it('returns a Just containing an array of Justs', function() {
    eq(S.match(/abcd/, 'abcdefg'), S.Just([S.Just('abcd')]));
  });

  it('supports global patterns', function() {
    eq(S.match(/[a-z]a/g, 'bananas'), S.Just([S.Just('ba'), S.Just('na'), S.Just('na')]));
  });

  it('supports (optional) capturing groups', function() {
    eq(S.match(/(good)?bye/, 'goodbye'), S.Just([S.Just('goodbye'), S.Just('good')]));
    eq(S.match(/(good)?bye/, 'bye'), S.Just([S.Just('bye'), S.Nothing]));
  });

  it('returns Nothing if no match', function() {
    eq(S.match(/zzz/, 'abcdefg'), S.Nothing);
  });

});
