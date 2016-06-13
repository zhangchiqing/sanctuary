'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('anyPass', function() {

  it('is a binary function', function() {
    eq(typeof S.anyPass, 'function');
    eq(S.anyPass.length, 2);
    eq(S.anyPass.toString(), 'anyPass :: Array (a -> Boolean) -> a -> Boolean');
  });

  it('returns false when given an empty array of predicates', function() {
    eq(S.anyPass([], 'quiessence'), false);
  });

  it('returns true when all predicates pass', function() {
    eq(S.anyPass([S.test(/q/), S.test(/u/), S.test(/i/), S.test(/c/)], 'quiessence'), true);
  });

  it('returns true when some predicates pass', function() {
    eq(S.anyPass([S.test(/q/), S.test(/u/), S.test(/i/), S.test(/c/)], 'quintessential'), true);
    eq(S.anyPass([S.test(/q/), S.test(/u/), S.test(/i/), S.test(/c/)], 'incandescent'), true);
    eq(S.anyPass([S.test(/q/), S.test(/u/), S.test(/i/), S.test(/c/)], 'fissiparous'), true);
  });

  it('returns false when all predicates fail', function() {
    eq(S.anyPass([S.test(/q/), S.test(/u/), S.test(/i/), S.test(/c/)], 'empathy'), false);
  });

  it('it short-circuits when one predicate passes', function() {
    var evaluated = false;
    var evaluate = function() { evaluated = true; };

    eq(S.anyPass([S.test(/q/), evaluate, S.test(/i/), S.test(/c/)], 'quiessence'), true);
    eq(evaluated, false);
  });

});
