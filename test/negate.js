'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('negate', function() {

  it('is a unary function', function() {
    eq(typeof S.negate, 'function');
    eq(S.negate.length, 1);
    eq(S.negate.toString(), 'negate :: ValidNumber -> ValidNumber');
  });

  it('negates its argument', function() {
    eq(S.negate(0.5), -0.5);
    eq(S.negate(-0.5), 0.5);
    eq(S.negate(0), -0);
    eq(S.negate(-0), 0);
    eq(S.negate(new Number(0.5)), -0.5);
    eq(S.negate(new Number(-0.5)), 0.5);
    eq(S.negate(new Number(0)), -0);
    eq(S.negate(new Number(-0)), 0);
  });

});
