'use strict';

var FL = require('fantasy-land');
var jsc = require('jsverify');
var Z = require('sanctuary-type-classes');

var S = require('../internal/sanctuary');

var Compose = require('../internal/Compose');
var Identity = require('../internal/Identity');
var eq = require('../internal/eq');
var forall = require('../internal/forall');
var throws = require('../internal/throws');


//  IdentityArb :: Arbitrary a -> Arbitrary (Identity a)
var IdentityArb = function(arb) {
  return arb.smap(Identity, function(i) { return i.value; });
};

//  MaybeArb :: Arbitrary a -> Arbitrary (Maybe a)
var MaybeArb = function(arb) {
  var f = function(maybe) { return maybe.value; };
  return jsc.oneof(arb.smap(S.Just, f, Z.toString),
                   jsc.constant(S.Nothing));
};


describe('Maybe', function() {

  it('throws if called', function() {
    throws(function() { S.Maybe(); },
           Error,
           'Cannot instantiate Maybe');
  });

  it('has a "nullary" data constructor named Nothing', function() {
    eq(S.Nothing['@@type'], 'sanctuary/Maybe');
    eq(S.Nothing.isNothing, true);
    eq(S.Nothing.isJust, false);
  });

  it('has a unary data constructor named Just', function() {
    eq(typeof S.Just, 'function');
    eq(S.Just.length, 1);
    eq(S.Just(9)['@@type'], 'sanctuary/Maybe');
    eq(S.Just(9).isNothing, false);
    eq(S.Just(9).isJust, true);
  });

  it('provides a "toBoolean" method', function() {
    eq(S.Nothing.toBoolean.length, 0);
    eq(S.Nothing.toBoolean(), false);

    eq(S.Just(9).toBoolean.length, 0);
    eq(S.Just(9).toBoolean(), true);
  });

  it('provides a "toString" method', function() {
    eq(S.Nothing.toString.length, 0);
    eq(S.Nothing.toString(), 'Nothing');

    eq(S.Just([1, 2, 3]).toString.length, 0);
    eq(S.Just([1, 2, 3]).toString(), 'Just([1, 2, 3])');
  });

  it('provides an "inspect" method', function() {
    eq(S.Nothing.inspect.length, 0);
    eq(S.Nothing.inspect(), 'Nothing');

    eq(S.Just([1, 2, 3]).inspect.length, 0);
    eq(S.Just([1, 2, 3]).inspect(), 'Just([1, 2, 3])');
  });

  it('provides a "fantasy-land/equals" method', function() {
    eq(S.Nothing[FL.equals], S.Nothing.equals);
    eq(S.Nothing[FL.equals].length, 1);
    eq(S.Nothing[FL.equals](S.Nothing), true);
    eq(S.Nothing[FL.equals](S.Just(9)), false);

    eq(S.Just(9)[FL.equals], S.Just(9).equals);
    eq(S.Just(9)[FL.equals].length, 1);
    eq(S.Just(9)[FL.equals](S.Just(9)), true);
    eq(S.Just(9)[FL.equals](S.Just(0)), false);
    eq(S.Just(9)[FL.equals](S.Nothing), false);

    // Value-based equality:
    eq(S.Just(0)[FL.equals](S.Just(-0)), false);
    eq(S.Just(-0)[FL.equals](S.Just(0)), false);
    eq(S.Just(NaN)[FL.equals](S.Just(NaN)), true);
    eq(S.Just([1, 2, 3])[FL.equals](S.Just([1, 2, 3])), true);
    eq(S.Just(new Number(42))[FL.equals](S.Just(new Number(42))), true);
  });

  it('provides a "fantasy-land/concat" method', function() {
    eq(S.Nothing[FL.concat], S.Nothing.concat);
    eq(S.Nothing[FL.concat].length, 1);
    eq(S.Nothing[FL.concat](S.Nothing), S.Nothing);
    eq(S.Nothing[FL.concat](S.Just('foo')), S.Just('foo'));

    eq(S.Just('foo')[FL.concat], S.Just('foo').concat);
    eq(S.Just('foo')[FL.concat].length, 1);
    eq(S.Just('foo')[FL.concat](S.Nothing), S.Just('foo'));
    eq(S.Just('foo')[FL.concat](S.Just('bar')), S.Just('foobar'));
  });

  it('provides a "fantasy-land/empty" method', function() {
    eq(S.Nothing[FL.empty], S.Nothing.empty);
    eq(S.Nothing[FL.empty].length, 0);
    eq(S.Nothing[FL.empty](), S.Nothing);

    eq(S.Just(9)[FL.empty], S.Just(9).empty);
    eq(S.Just(9)[FL.empty].length, 0);
    eq(S.Just(9)[FL.empty](), S.Nothing);
  });

  it('provides a "fantasy-land/map" method', function() {
    eq(S.Nothing[FL.map], S.Nothing.map);
    eq(S.Nothing[FL.map].length, 1);
    eq(S.Nothing[FL.map](Math.sqrt), S.Nothing);

    eq(S.Just(9)[FL.map], S.Just(9).map);
    eq(S.Just(9)[FL.map].length, 1);
    eq(S.Just(9)[FL.map](Math.sqrt), S.Just(3));
  });

  it('provides a "fantasy-land/ap" method', function() {
    eq(S.Nothing[FL.ap], S.Nothing.ap);
    eq(S.Nothing[FL.ap].length, 1);
    eq(S.Nothing[FL.ap](S.Nothing), S.Nothing);
    eq(S.Nothing[FL.ap](S.Just(S.inc)), S.Nothing);

    eq(S.Just(42)[FL.ap], S.Just(42).ap);
    eq(S.Just(42)[FL.ap].length, 1);
    eq(S.Just(42)[FL.ap](S.Nothing), S.Nothing);
    eq(S.Just(42)[FL.ap](S.Just(S.inc)), S.Just(43));
  });

  it('provides a "fantasy-land/of" method', function() {
    eq(S.Nothing[FL.of], S.Nothing.of);
    eq(S.Nothing[FL.of].length, 1);
    eq(S.Nothing[FL.of]('abc'), S.Just('abc'));

    eq(S.Just(9)[FL.of], S.Just(9).of);
    eq(S.Just(9)[FL.of].length, 1);
    eq(S.Just(9)[FL.of]('xyz'), S.Just('xyz'));
  });

  it('provides a "fantasy-land/chain" method', function() {
    eq(S.Nothing[FL.chain], S.Nothing.chain);
    eq(S.Nothing[FL.chain].length, 1);
    eq(S.Nothing[FL.chain](S.head), S.Nothing);

    eq(S.Just([1, 2, 3])[FL.chain], S.Just([1, 2, 3]).chain);
    eq(S.Just([1, 2, 3])[FL.chain].length, 1);
    eq(S.Just([1, 2, 3])[FL.chain](S.head), S.Just(1));
  });

  it('provides a "fantasy-land/reduce" method', function() {
    var add = function(x, y) { return x + y; };

    eq(S.Nothing[FL.reduce], S.Nothing.reduce);
    eq(S.Nothing[FL.reduce].length, 2);
    eq(S.Nothing[FL.reduce](add, 0), 0);

    eq(S.Just(9)[FL.reduce], S.Just(9).reduce);
    eq(S.Just(9)[FL.reduce].length, 2);
    eq(S.Just(9)[FL.reduce](add, 0), 9);
  });

  it('provides a "fantasy-land/traverse" method', function() {
    var Array$of = function(x) { return [x]; };
    var duplicate = function(x) { return [x, x]; };

    eq(S.Nothing[FL.traverse], S.Nothing.traverse);
    eq(S.Nothing[FL.traverse].length, 2);
    eq(S.Nothing[FL.traverse](duplicate, Array$of), [S.Nothing]);

    eq(S.Just(9)[FL.traverse], S.Just(9).traverse);
    eq(S.Just(9)[FL.traverse].length, 2);
    eq(S.Just(9)[FL.traverse](duplicate, Array$of), [S.Just(9), S.Just(9)]);
  });

  it('provides a "fantasy-land/extend" method', function() {
    var sqrt = function(maybe) { return Math.sqrt(maybe.value); };

    eq(S.Nothing[FL.extend], S.Nothing.extend);
    eq(S.Nothing[FL.extend].length, 1);
    eq(S.Nothing[FL.extend](sqrt), S.Nothing);

    eq(S.Just(9)[FL.extend], S.Just(9).extend);
    eq(S.Just(9)[FL.extend].length, 1);
    eq(S.Just(9)[FL.extend](sqrt), S.Just(3));
  });

  describe('Setoid', function() {

    it('satisfies reflexivity', function() {
      forall(MaybeArb(jsc.integer),
             function(a) {
               return Z.equals(a, a);
             });
    });

    it('satisfies symmetry', function() {
      forall(MaybeArb(jsc.integer),
             MaybeArb(jsc.integer),
             function(a, b) {
               return Z.equals(a, b) === Z.equals(b, a);
             });
    });

    it('satisfies transitivity', function() {
      forall(MaybeArb(jsc.integer(1)),
             MaybeArb(jsc.integer(1)),
             MaybeArb(jsc.integer(1)),
             function(a, b, c) {
               return !(Z.equals(a, b) && Z.equals(b, c)) || Z.equals(a, c);
             });
    });

  });

  describe('Semigroup', function() {

    it('satisfies associativity', function() {
      forall(MaybeArb(jsc.string),
             MaybeArb(jsc.string),
             MaybeArb(jsc.string),
             function(a, b, c) {
               var lhs = a[FL.concat](b)[FL.concat](c);
               var rhs = a[FL.concat](b[FL.concat](c));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Monoid', function() {

    it('satisfies left identity', function() {
      forall(MaybeArb(jsc.string),
             function(m) {
               var lhs = m[FL.empty]()[FL.concat](m);
               var rhs = m;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies right identity', function() {
      forall(MaybeArb(jsc.string),
             function(m) {
               var lhs = m[FL.concat](m[FL.empty]());
               var rhs = m;
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Functor', function() {

    it('satisfies identity', function() {
      forall(MaybeArb(jsc.integer),
             function(u) {
               var lhs = u[FL.map](S.I);
               var rhs = u;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies composition', function() {
      var f = function(x) { return x + 1; };
      var g = function(x) { return x * 2; };
      forall(MaybeArb(jsc.integer),
             function(u) {
               var lhs = u[FL.map](S.compose(f, g));
               var rhs = u[FL.map](g)[FL.map](f);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Apply', function() {

    it('satisfies composition', function() {
      forall(MaybeArb(jsc.integer),
             MaybeArb(jsc.constant(function(x) { return x + 1; })),
             MaybeArb(jsc.constant(function(x) { return x * 2; })),
             function(a, mf, mg) {
               var lhs = a[FL.ap](mg[FL.ap](mf[FL.map](S.compose)));
               var rhs = a[FL.ap](mg)[FL.ap](mf);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Applicative', function() {

    it('satisfies identity', function() {
      forall(MaybeArb(jsc.constant(null)),
             MaybeArb(jsc.integer),
             function(a, v) {
               var lhs = v[FL.ap](a[FL.of](S.I));
               var rhs = v;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies homomorphism', function() {
      var f = function(x) { return x + 1; };
      forall(MaybeArb(jsc.constant(null)),
             jsc.integer,
             function(a, x) {
               var lhs = a[FL.of](x)[FL.ap](a[FL.of](f));
               var rhs = a[FL.of](f(x));
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies interchange', function() {
      forall(MaybeArb(jsc.constant(null)),
             MaybeArb(jsc.constant(function(x) { return x + 1; })),
             jsc.integer,
             function(a, u, x) {
               var lhs = a[FL.of](x)[FL.ap](u);
               var rhs = u[FL.ap](a[FL.of](function(f) { return f(x); }));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Chain', function() {

    it('satisfies associativity', function() {
      var f = function(x) { return x < 0 ? S.Nothing : S.Just(Math.sqrt(x)); };
      var g = function(x) { return S.Just(Math.abs(x)); };
      forall(MaybeArb(jsc.integer),
             function(m) {
               var lhs = m[FL.chain](f)[FL.chain](g);
               var rhs = m[FL.chain](function(x) { return f(x)[FL.chain](g); });
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Monad', function() {

    it('satisfies left identity', function() {
      var f = function(x) { return x < 0 ? S.Nothing : S.Just(Math.sqrt(x)); };
      forall(MaybeArb(jsc.constant(null)),
             jsc.integer,
             function(m, x) {
               var lhs = m[FL.of](x)[FL.chain](f);
               var rhs = f(x);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies right identity', function() {
      forall(MaybeArb(jsc.integer),
             function(m) {
               var lhs = m[FL.chain](m[FL.of]);
               var rhs = m;
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Foldable', function() {

    it('satisfies ???', function() {
      var f = function(x, y) { return x + y; };
      forall(MaybeArb(jsc.integer),
             function(u) {
               var lhs = u[FL.reduce](f, 0);
               var rhs = u[FL.reduce](function(acc, x) { return acc.concat([x]); }, []).reduce(f, 0);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Traversable', function() {

    it('satisfies naturality', function() {
      var F = Identity;
      var G = S.Maybe;
      var t = function(identity) { return S.Just(identity.value); };
      forall(MaybeArb(IdentityArb(jsc.integer, jsc.string)),
             function(u) {
               var lhs = t(u[FL.traverse](S.I, F[FL.of]));
               var rhs = u[FL.traverse](t, G[FL.of]);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies identity', function() {
      var Array$of = function(x) { return [x]; };
      forall(MaybeArb(jsc.integer),
             function(u) {
               var lhs = u[FL.traverse](Array$of, Array$of);
               var rhs = Array$of(u);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies composition', function() {
      var F = Identity;
      var G = S.Maybe;
      var C = Compose(F)(G);
      forall(MaybeArb(IdentityArb(MaybeArb(jsc.integer))),
             function(u) {
               var lhs = u[FL.traverse](C, C[FL.of]);
               var rhs = C(u[FL.traverse](S.I, F[FL.of])[FL.map](function(x) { return x[FL.traverse](S.I, G[FL.of]); }));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Extend', function() {

    it('satisfies associativity', function() {
      var f = function(maybe) { return (maybe.isJust ? maybe.value : 0) + 1; };
      var g = function(maybe) { return (maybe.isJust ? maybe.value : 0) * 2; };
      forall(MaybeArb(jsc.integer),
             function(w) {
               var lhs = w[FL.extend](g)[FL.extend](f);
               var rhs = w[FL.extend](function(_w) { return f(_w[FL.extend](g)); });
               return Z.equals(lhs, rhs);
             });
    });

  });

});
