'use strict';

var S = require('..');

var eq = require('./internal/eq');
var rem = require('./internal/rem');


describe('encase2', function() {

  it('is a ternary function', function() {
    eq(typeof S.encase2, 'function');
    eq(S.encase2.length, 3);
    eq(S.encase2.toString(), 'encase2 :: (a -> b -> c) -> a -> b -> Maybe c');
  });

  it('returns a Just on success', function() {
    eq(S.encase2(rem, 42, 5), S.Just(2));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase2(rem, 42, 0), S.Nothing);
  });

});
