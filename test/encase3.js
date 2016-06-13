'use strict';

var S = require('..');

var area = require('./internal/area');
var eq = require('./internal/eq');


describe('encase3', function() {

  it('is a quaternary function', function() {
    eq(typeof S.encase3, 'function');
    eq(S.encase3.length, 4);
    eq(S.encase3.toString(), 'encase3 :: (a -> b -> c -> d) -> a -> b -> c -> Maybe d');
  });

  it('returns a Just on success', function() {
    eq(S.encase3(area, 3, 4, 5), S.Just(6));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase3(area, 2, 2, 5), S.Nothing);
  });

});
