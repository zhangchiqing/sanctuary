'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('mapMaybe', function() {

  it('is a binary function', function() {
    eq(typeof S.mapMaybe, 'function');
    eq(S.mapMaybe.length, 2);
    eq(S.mapMaybe.toString(), 'mapMaybe :: (a -> Maybe b) -> Array a -> Array b');
  });

  it('maps over a list to produce a list of successful results', function() {
    eq(S.mapMaybe(S.head, []), []);
    eq(S.mapMaybe(S.head, [[], [], []]), []);
    eq(S.mapMaybe(S.head, [[1, 2], [3, 4], [5, 6]]), [1, 3, 5]);
    eq(S.mapMaybe(S.head, [[1], [], [3], [], [5], []]), [1, 3, 5]);
  });

});
