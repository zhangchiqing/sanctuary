'use strict';

var S = require('..');

var eq = require('./internal/eq');
var factorial = require('./internal/factorial');


describe('encase', function() {

  it('is a binary function', function() {
    eq(typeof S.encase, 'function');
    eq(S.encase.length, 2);
    eq(S.encase.toString(), 'encase :: (a -> b) -> a -> Maybe b');
  });

  it('returns a Just on success', function() {
    eq(S.encase(factorial, 5), S.Just(120));
  });

  it('returns Nothing on failure', function() {
    eq(S.encase(factorial, -1), S.Nothing);
  });

});
