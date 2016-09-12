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

//  EitherArb :: (Arbitrary a, Arbitrary b) -> Arbitrary (Either a b)
var EitherArb = function(lArb, rArb) {
  var f = function(either) { return either.value; };
  return jsc.oneof(lArb.smap(S.Left, f, Z.toString),
                   rArb.smap(S.Right, f, Z.toString));
};


describe('Either', function() {

  it('throws if called', function() {
    throws(function() { S.Either(); },
           Error,
           'Cannot instantiate Either');
  });

  it('has a unary data constructor named Left', function() {
    eq(typeof S.Left, 'function');
    eq(S.Left.length, 1);
    eq(S.Left(42)['@@type'], 'sanctuary/Either');
    eq(S.Left(42).isLeft, true);
    eq(S.Left(42).isRight, false);
  });

  it('has a unary data constructor named Right', function() {
    eq(typeof S.Right, 'function');
    eq(S.Right.length, 1);
    eq(S.Right(42)['@@type'], 'sanctuary/Either');
    eq(S.Right(42).isLeft, false);
    eq(S.Right(42).isRight, true);
  });

  it('provides a "toBoolean" method', function() {
    eq(S.Left('abc').toBoolean.length, 0);
    eq(S.Left('abc').toBoolean(), false);

    eq(S.Right(42).toBoolean.length, 0);
    eq(S.Right(42).toBoolean(), true);
  });

  it('provides a "toString" method', function() {
    eq(S.Left('abc').toString.length, 0);
    eq(S.Left('abc').toString(), 'Left("abc")');

    eq(S.Right([1, 2, 3]).toString.length, 0);
    eq(S.Right([1, 2, 3]).toString(), 'Right([1, 2, 3])');
  });

  it('provides an "inspect" method', function() {
    eq(S.Left('abc').inspect.length, 0);
    eq(S.Left('abc').inspect(), 'Left("abc")');

    eq(S.Right([1, 2, 3]).inspect.length, 0);
    eq(S.Right([1, 2, 3]).inspect(), 'Right([1, 2, 3])');
  });

  it('provides a "fantasy-land/equals" method', function() {
    eq(S.Left(42)[FL.equals], S.Left(42).equals);
    eq(S.Left(42)[FL.equals].length, 1);
    eq(S.Left(42)[FL.equals](S.Left(42)), true);
    eq(S.Left(42)[FL.equals](S.Left('42')), false);
    eq(S.Left(42)[FL.equals](S.Right(42)), false);

    eq(S.Right(42)[FL.equals], S.Right(42).equals);
    eq(S.Right(42)[FL.equals].length, 1);
    eq(S.Right(42)[FL.equals](S.Right(42)), true);
    eq(S.Right(42)[FL.equals](S.Right('42')), false);
    eq(S.Right(42)[FL.equals](S.Left(42)), false);

    // Value-based equality:
    eq(S.Left(0)[FL.equals](S.Left(-0)), false);
    eq(S.Left(-0)[FL.equals](S.Left(0)), false);
    eq(S.Left(NaN)[FL.equals](S.Left(NaN)), true);
    eq(S.Left([1, 2, 3])[FL.equals](S.Left([1, 2, 3])), true);
    eq(S.Left(new Number(42))[FL.equals](S.Left(new Number(42))), true);

    eq(S.Right(0)[FL.equals](S.Right(-0)), false);
    eq(S.Right(-0)[FL.equals](S.Right(0)), false);
    eq(S.Right(NaN)[FL.equals](S.Right(NaN)), true);
    eq(S.Right([1, 2, 3])[FL.equals](S.Right([1, 2, 3])), true);
    eq(S.Right(new Number(42))[FL.equals](S.Right(new Number(42))), true);
  });

  it('provides a "fantasy-land/concat" method', function() {
    eq(S.Left('abc')[FL.concat], S.Left('abc').concat);
    eq(S.Left('abc')[FL.concat].length, 1);
    eq(S.Left('abc')[FL.concat](S.Left('def')), S.Left('abcdef'));
    eq(S.Left('abc')[FL.concat](S.Right('xyz')), S.Right('xyz'));

    eq(S.Right('abc')[FL.concat], S.Right('abc').concat);
    eq(S.Right('abc')[FL.concat].length, 1);
    eq(S.Right('abc')[FL.concat](S.Left('xyz')), S.Right('abc'));
    eq(S.Right('abc')[FL.concat](S.Right('def')), S.Right('abcdef'));
  });

  it('provides a "fantasy-land/map" method', function() {
    eq(S.Left('abc')[FL.map], S.Left('abc').map);
    eq(S.Left('abc')[FL.map].length, 1);
    eq(S.Left('abc')[FL.map](Math.sqrt), S.Left('abc'));

    eq(S.Right(9)[FL.map], S.Right(9).map);
    eq(S.Right(9)[FL.map].length, 1);
    eq(S.Right(9)[FL.map](Math.sqrt), S.Right(3));
  });

  it('provides a "fantasy-land/map" method', function() {
    eq(S.Left('abc')[FL.ap], S.Left('abc').ap);
    eq(S.Left('abc')[FL.ap].length, 1);
    eq(S.Left('abc')[FL.ap](S.Left('xyz')), S.Left('xyz'));
    eq(S.Left('abc')[FL.ap](S.Right(S.inc)), S.Left('abc'));

    eq(S.Right(42)[FL.ap], S.Right(42).ap);
    eq(S.Right(42)[FL.ap].length, 1);
    eq(S.Right(42)[FL.ap](S.Left('abc')), S.Left('abc'));
    eq(S.Right(42)[FL.ap](S.Right(S.inc)), S.Right(43));
  });

  it('provides a "fantasy-land/of" method', function() {
    eq(S.Left('abc')[FL.of], S.Left('abc').of);
    eq(S.Left('abc')[FL.of].length, 1);
    eq(S.Left('abc')[FL.of](42), S.Right(42));

    eq(S.Right(42)[FL.of], S.Right(42).of);
    eq(S.Right(42)[FL.of].length, 1);
    eq(S.Right(42)[FL.of](99), S.Right(99));
  });

  it('provides a "fantasy-land/chain" method', function() {
    eq(S.Left('abc')[FL.chain], S.Left('abc').chain);
    eq(S.Left('abc')[FL.chain].length, 1);
    eq(S.Left('abc')[FL.chain](function(x) { return x < 0 ? S.Left('!') : S.Right(Math.sqrt(x)); }), S.Left('abc'));

    eq(S.Right(25)[FL.chain], S.Right(25).chain);
    eq(S.Right(25)[FL.chain].length, 1);
    eq(S.Right(25)[FL.chain](function(x) { return x < 0 ? S.Left('!') : S.Right(Math.sqrt(x)); }), S.Right(5));
  });

  it('provides a "fantasy-land/chain" method', function() {
    eq(S.Left('abc')[FL.reduce], S.Left('abc').reduce);
    eq(S.Left('abc')[FL.reduce].length, 2);
    eq(S.Left('abc')[FL.reduce](function(xs, x) { return xs.concat([x]); }, [42]), [42]);

    eq(S.Right(5)[FL.reduce], S.Right(5).reduce);
    eq(S.Right(5)[FL.reduce].length, 2);
    eq(S.Right(5)[FL.reduce](function(xs, x) { return xs.concat([x]); }, [42]), [42, 5]);
  });

  it('provides a "fantasy-land/chain" method', function() {
    eq(S.Left('abc')[FL.traverse], S.Left('abc').traverse);
    eq(S.Left('abc')[FL.traverse].length, 2);
    eq(S.Left('abc')[FL.traverse](S.parseInt(16), S.Just), S.Just(S.Left('abc')));

    eq(S.Right('F')[FL.traverse], S.Right('F').traverse);
    eq(S.Right('F')[FL.traverse].length, 2);
    eq(S.Right('F')[FL.traverse](S.parseInt(16), S.Just), S.Just(S.Right(15)));
    eq(S.Right('G')[FL.traverse](S.parseInt(16), S.Just), S.Nothing);
  });

  it('provides a "fantasy-land/extend" method', function() {
    eq(S.Left('abc')[FL.extend], S.Left('abc').extend);
    eq(S.Left('abc')[FL.extend].length, 1);
    eq(S.Left('abc')[FL.extend](function(x) { return x.value / 2; }), S.Left('abc'));

    eq(S.Right(42)[FL.extend], S.Right(42).extend);
    eq(S.Right(42)[FL.extend].length, 1);
    eq(S.Right(42)[FL.extend](function(x) { return x.value / 2; }), S.Right(21));
  });

  describe('Setoid', function() {

    it('satisfies reflexivity', function() {
      forall(EitherArb(jsc.string, jsc.integer),
             function(a) {
               return Z.equals(a, a);
             });
    });

    it('satisfies symmetry', function() {
      forall(EitherArb(jsc.string, jsc.integer),
             EitherArb(jsc.string, jsc.integer),
             function(a, b) {
               return Z.equals(a, b) === Z.equals(b, a);
             });
    });

    it('satisfies transitivity', function() {
      forall(EitherArb(jsc.string, jsc.integer(1)),
             EitherArb(jsc.string, jsc.integer(1)),
             EitherArb(jsc.string, jsc.integer(1)),
             function(a, b, c) {
               return !(Z.equals(a, b) && Z.equals(b, c)) || Z.equals(a, c);
             });
    });

  });

  describe('Semigroup', function() {

    it('satisfies associativity', function() {
      forall(EitherArb(jsc.string, jsc.string),
             EitherArb(jsc.string, jsc.string),
             EitherArb(jsc.string, jsc.string),
             function(a, b, c) {
               var lhs = a[FL.concat](b)[FL.concat](c);
               var rhs = a[FL.concat](b[FL.concat](c));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Functor', function() {

    it('satisfies identity', function() {
      forall(EitherArb(jsc.string, jsc.integer),
             function(u) {
               var lhs = u[FL.map](S.I);
               var rhs = u;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies composition', function() {
      var f = function(x) { return x + 1; };
      var g = function(x) { return x * 2; };
      forall(EitherArb(jsc.string, jsc.integer),
             function(u) {
               var lhs = u[FL.map](S.compose(f)(g));
               var rhs = u[FL.map](g)[FL.map](f);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Apply', function() {

    it('satisfies composition', function() {
      forall(EitherArb(jsc.string, jsc.integer),
             EitherArb(jsc.string, jsc.constant(function(x) { return x + 1; })),
             EitherArb(jsc.string, jsc.constant(function(x) { return x * 2; })),
             function(a, ef, eg) {
               var lhs = a[FL.ap](eg[FL.ap](ef[FL.map](S.compose)));
               var rhs = a[FL.ap](eg)[FL.ap](ef);
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Applicative', function() {

    it('satisfies identity', function() {
      forall(EitherArb(jsc.constant(null), jsc.constant(null)),
             EitherArb(jsc.string, jsc.integer),
             function(a, v) {
               var lhs = v[FL.ap](a[FL.of](S.I));
               var rhs = v;
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies homomorphism', function() {
      var f = function(x) { return x + 1; };
      forall(EitherArb(jsc.constant(null), jsc.constant(null)),
             jsc.integer,
             function(a, x) {
               var lhs = a[FL.of](x)[FL.ap](a[FL.of](f));
               var rhs = a[FL.of](f(x));
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies interchange', function() {
      forall(EitherArb(jsc.constant(null), jsc.constant(null)),
             EitherArb(jsc.string, jsc.constant(function(x) { return x + 1; })),
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
      var f = function(x) { return x < 0 ? S.Left('Cannot represent square root of negative number') : S.Right(Math.sqrt(x)); };
      var g = function(x) { return S.Right(Math.abs(x)); };
      forall(EitherArb(jsc.string, jsc.integer),
             function(m) {
               var lhs = m[FL.chain](f)[FL.chain](g);
               var rhs = m[FL.chain](function(x) { return f(x)[FL.chain](g); });
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Monad', function() {

    it('satisfies left identity', function() {
      var f = function(x) { return x < 0 ? S.Left('Cannot represent square root of negative number') : S.Right(Math.sqrt(x)); };
      forall(EitherArb(jsc.constant(null), jsc.constant(null)),
             jsc.integer,
             function(m, x) {
               var lhs = m[FL.of](x)[FL.chain](f);
               var rhs = f(x);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies right identity', function() {
      forall(EitherArb(jsc.string, jsc.integer),
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
      forall(EitherArb(jsc.string, jsc.integer),
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
      var G = S.Either;
      var t = function(identity) { return S.Right(identity.value); };
      forall(EitherArb(jsc.integer, IdentityArb(jsc.string)),
             function(u) {
               var lhs = t(u[FL.traverse](S.I, F[FL.of]));
               var rhs = u[FL.traverse](t, G[FL.of]);
               return Z.equals(lhs, rhs);
             });
    });

    it('satisfies identity', function() {
      var Array$of = function(x) { return [x]; };
      forall(EitherArb(jsc.string, jsc.integer),
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
      forall(EitherArb(jsc.string, IdentityArb(EitherArb(jsc.string, jsc.integer))),
             function(u) {
               var lhs = u[FL.traverse](C, C[FL.of]);
               var rhs = C(u[FL.traverse](S.I, F[FL.of])[FL.map](function(x) { return x[FL.traverse](S.I, G[FL.of]); }));
               return Z.equals(lhs, rhs);
             });
    });

  });

  describe('Extend', function() {

    it('satisfies associativity', function() {
      var f = function(either) { return (either.isRight ? either.value : 0) + 1; };
      var g = function(either) { return (either.isRight ? either.value : 0) * 2; };
      forall(EitherArb(jsc.string, jsc.integer),
             function(w) {
               var lhs = w[FL.extend](g)[FL.extend](f);
               var rhs = w[FL.extend](function(_w) { return f(_w[FL.extend](g)); });
               return Z.equals(lhs, rhs);
             });
    });

  });

});
