'use strict';

var S = require('..');

var eq = require('./internal/eq');
var rem_ = require('./internal/rem_');


describe('encase2_', function() {

  it('is a ternary function', function() {
    eq(typeof S.encase2_, 'function');
    eq(S.encase2_.length, 3);
    eq(S.encase2_.toString(), 'encase2_ :: ((a, b) -> c) -> a -> b -> Maybe c');
  });

  it('returns a Just on success', function() {
    eq(S.encase2_(rem_, 42, 5), S.Just(2));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase2_(rem_, 42, 0), S.Nothing);
  });

});
