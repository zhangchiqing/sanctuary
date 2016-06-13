'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('ifElse', function() {

  var lt0 = function(x) { return x < 0; };

  it('is a quaternary function', function() {
    eq(typeof S.ifElse, 'function');
    eq(S.ifElse.length, 4);
    eq(S.ifElse.toString(), 'ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b');
  });

  it('applies the first function when the predicate returns true', function() {
    eq(S.ifElse(lt0, Math.abs, Math.sqrt, -1), 1);
  });

  it('applies the second function when the predicate returns false', function() {
    eq(S.ifElse(lt0, Math.abs, Math.sqrt, 16), 4);
  });

});
