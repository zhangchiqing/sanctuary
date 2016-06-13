'use strict';

var jsc = require('jsverify');
var R = require('ramda');

var S = require('../internal/sanctuary');

var Compose = require('../internal/Compose');
var Identity = require('../internal/Identity');
var throws = require('../internal/throws');


//  IdentityArb :: Arbitrary a -> Arbitrary (Identity a)
var IdentityArb = function(arb) {
  return arb.smap(Identity, function(i) { return i.value; });
};

//  MaybeArb :: Arbitrary a -> Arbitrary (Maybe a)
var MaybeArb = function(arb) {
  return jsc.oneof(JustArb(arb), jsc.constant(S.Nothing));
};

//  JustArb :: Arbitrary a -> Arbitrary (Maybe a)
var JustArb = function(arb) {
  return arb.smap(S.Just, function(m) { return m.value; }, R.toString);
};

//  EitherArb :: Arbitrary a -> Arbitrary b -> Arbitrary (Either a b)
var EitherArb = function(lArb, rArb) {
  return jsc.oneof(LeftArb(lArb), RightArb(rArb));
};

//  LeftArb :: Arbitrary a -> Arbitrary (Either a b)
var LeftArb = function(arb) {
  return arb.smap(S.Left, function(e) { return e.value; }, R.toString);
};

//  RightArb :: Arbitrary a -> Arbitrary (Either b a)
var RightArb = function(arb) {
  return arb.smap(S.Right, function(e) { return e.value; }, R.toString);
};

describe('Maybe', function() {

  it('throws if called', function() {
    throws(function() { S.Maybe(); },
           Error,
           'Cannot instantiate Maybe');
  });

  describe('Traversable laws', function() {

    it('satisfies naturality', function() {
      jsc.assert(jsc.forall(MaybeArb(EitherArb(jsc.integer, jsc.string)), function(maybe) {
        var lhs = S.eitherToMaybe(maybe.sequence(S.Either.of));
        var rhs = maybe.map(S.eitherToMaybe).sequence(S.Maybe.of);
        return lhs.equals(rhs);
      }));
    });

    it('satisfies identity', function() {
      jsc.assert(jsc.forall(MaybeArb(jsc.integer), function(maybe) {
        var lhs = maybe.map(Identity).sequence(Identity.of);
        var rhs = Identity.of(maybe);
        return lhs.equals(rhs);
      }));
    });

    it('satisfies composition', function() {
      jsc.assert(jsc.forall(MaybeArb(IdentityArb(MaybeArb(jsc.integer))), function(u) {
        var C = Compose(Identity)(S.Maybe);
        var lhs = u.map(C).sequence(C.of);
        var rhs = C(u.sequence(Identity.of).map(function(x) {
          return x.sequence(S.Maybe.of);
        }));
        return lhs.equals(rhs);
      }));
    });

  });

});
