'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('maybeToNullable', function() {

  it('is a unary function', function() {
    eq(typeof S.maybeToNullable, 'function');
    eq(S.maybeToNullable.length, 1);
    eq(S.maybeToNullable.toString(), 'maybeToNullable :: Maybe a -> Nullable a');
  });

  it('can be applied to Nothing', function() {
    eq(S.maybeToNullable(S.Nothing), null);
  });

  it('can be applied to a Just', function() {
    eq(S.maybeToNullable(S.Just(42)), 42);
  });

});
