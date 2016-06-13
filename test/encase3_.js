'use strict';

var S = require('..');

var area_ = require('./internal/area_');
var eq = require('./internal/eq');


describe('encase3_', function() {

  it('is a quaternary function', function() {
    eq(typeof S.encase3_, 'function');
    eq(S.encase3_.length, 4);
    eq(S.encase3_.toString(), 'encase3_ :: ((a, b, c) -> d) -> a -> b -> c -> Maybe d');
  });

  it('returns a Just on success', function() {
    eq(S.encase3_(area_, 3, 4, 5), S.Just(6));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase3_(area_, 2, 2, 5), S.Nothing);
  });

});
