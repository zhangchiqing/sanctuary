'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('init', function() {

  it('is a unary function', function() {
    eq(typeof S.init, 'function');
    eq(S.init.length, 1);
    eq(S.init.toString(), 'init :: List a -> Maybe (List a)');
  });

  it('returns Nothing if applied to empty list', function() {
    eq(S.init([]), S.Nothing);
  });

  it('returns Just the initial elements of a nonempty list', function() {
    eq(S.init(['foo', 'bar', 'baz']), S.Just(['foo', 'bar']));
  });

});
