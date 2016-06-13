'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('unfoldr', function() {

  it('is a binary function', function() {
    eq(typeof S.unfoldr, 'function');
    eq(S.unfoldr.length, 2);
    eq(S.unfoldr.toString(), 'unfoldr :: (b -> Maybe (Pair a b)) -> b -> Array a');
  });

  it('correctly unfolds a value into a list', function() {
    var f = function(n) {
      return n >= 5 ? S.Nothing : S.Just([n, n + 1]);
    };
    eq(S.unfoldr(f, 5), []);
    eq(S.unfoldr(f, 4), [4]);
    eq(S.unfoldr(f, 1), [1, 2, 3, 4]);
  });

});
