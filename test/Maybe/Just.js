'use strict';

var R = require('ramda');

var S = require('../..');

var eq = require('../internal/eq');
var square = require('../internal/square');


describe('Just', function() {

  it('is a data constructor', function() {
    eq(typeof S.Just, 'function');
    eq(S.Just.length, 1);
    eq(S.Just(42)['@@type'], 'sanctuary/Maybe');
    eq(S.Just(42).isNothing, false);
    eq(S.Just(42).isJust, true);
  });

  it('provides an "ap" method', function() {
    eq(S.Just(S.inc).ap.length, 1);
    eq(S.Just(S.inc).ap.toString(), 'Maybe#ap :: Maybe (a -> b) ~> Maybe a -> Maybe b');
    eq(S.Just(S.inc).ap(S.Nothing), S.Nothing);
    eq(S.Just(S.inc).ap(S.Just(42)), S.Just(43));
  });

  it('provides a "chain" method', function() {
    eq(S.Just([1, 2, 3]).chain.length, 1);
    eq(S.Just([1, 2, 3]).chain.toString(), 'Maybe#chain :: Maybe a ~> (a -> Maybe b) -> Maybe b');
    eq(S.Just([1, 2, 3]).chain(S.head), S.Just(1));
  });

  it('provides a "concat" method', function() {
    eq(S.Just('foo').concat.length, 1);
    eq(S.Just('foo').concat.toString(), 'Maybe#concat :: Semigroup a => Maybe a ~> Maybe a -> Maybe a');
    eq(S.Just('foo').concat(S.Nothing), S.Just('foo'));
    eq(S.Just('foo').concat(S.Just('bar')), S.Just('foobar'));
  });

  it('provides an "equals" method', function() {
    eq(S.Just(42).equals.length, 1);
    eq(S.Just(42).equals.toString(), 'Maybe#equals :: Maybe a ~> b -> Boolean');
    eq(S.Just(42).equals(S.Just(42)), true);
    eq(S.Just(42).equals(S.Just(43)), false);
    eq(S.Just(42).equals(S.Nothing), false);
    eq(S.Just(42).equals(null), false);

    // Value-based equality:
    eq(S.Just(0).equals(S.Just(-0)), false);
    eq(S.Just(-0).equals(S.Just(0)), false);
    eq(S.Just(NaN).equals(S.Just(NaN)), true);
    eq(S.Just([1, 2, 3]).equals(S.Just([1, 2, 3])), true);
    eq(S.Just(new Number(42)).equals(S.Just(new Number(42))), true);
    eq(S.Just(new Number(42)).equals(42), false);
  });

  it('provides an "extend" method', function() {
    eq(S.Just(42).extend.length, 1);
    eq(S.Just(42).extend.toString(), 'Maybe#extend :: Maybe a ~> (Maybe a -> a) -> Maybe a');
    eq(S.Just(42).extend(function(x) { return x.value / 2; }), S.Just(21));

    // associativity
    var w = S.Just(42);
    var f = function(x) { return x.value + 1; };
    var g = function(x) { return x.value * x.value; };
    eq(w.extend(g).extend(f), w.extend(function(_w) { return f(_w.extend(g)); }));
  });

  it('provides a "filter" method', function() {
    eq(S.Just(42).filter.length, 1);
    eq(S.Just(42).filter.toString(), 'Maybe#filter :: Maybe a ~> (a -> Boolean) -> Maybe a');
    eq(S.Just(42).filter(R.T), S.Just(42));
    eq(S.Just(42).filter(R.F), S.Nothing);
    eq(S.Just(42).filter(function(n) { return n > 0; }), S.Just(42));
    eq(S.Just(42).filter(function(n) { return n < 0; }), S.Nothing);

    var m = S.Just(-5);
    var f = function(n) { return n * n; };
    var p = function(n) { return n < 0; };
    var q = function(n) { return n > 0; };

    eq(m.map(f).filter(p).equals(m.filter(function(x) { return p(f(x)); }).map(f)), true);
    eq(m.map(f).filter(q).equals(m.filter(function(x) { return q(f(x)); }).map(f)), true);
  });

  it('provides a "map" method', function() {
    eq(S.Just(42).map.length, 1);
    eq(S.Just(42).map.toString(), 'Maybe#map :: Maybe a ~> (a -> b) -> Maybe b');
    eq(S.Just(42).map(function(x) { return x / 2; }), S.Just(21));
  });

  it('provides a "reduce" method', function() {
    eq(S.Just(5).reduce.length, 2);
    eq(S.Just(5).reduce.toString(), 'Maybe#reduce :: Maybe a ~> ((b, a) -> b) -> b -> b');
    eq(S.Just(5).reduce(function(x, y) { return x - y; }, 42), 37);
  });

  it('provides a "sequence" method', function() {
    eq(S.Just(S.Right(42)).sequence.length, 1);
    eq(S.Just(S.Right(42)).sequence.toString(), 'Maybe#sequence :: Applicative f => Maybe (f a) ~> (a -> f a) -> f (Maybe a)');
    eq(S.Just(S.Right(42)).sequence(S.Either.of), S.Right(S.Just(42)));
  });

  it('provides a "toBoolean" method', function() {
    eq(S.Just(42).toBoolean.length, 0);
    eq(S.Just(42).toBoolean.toString(), 'Maybe#toBoolean :: Maybe a ~> () -> Boolean');
    eq(S.Just(42).toBoolean(), true);
  });

  it('provides a "toString" method', function() {
    eq(S.Just([1, 2, 3]).toString.length, 0);
    eq(S.Just([1, 2, 3]).toString.toString(), 'Maybe#toString :: Maybe a ~> () -> String');
    eq(S.Just([1, 2, 3]).toString(), 'Just([1, 2, 3])');
  });

  it('provides an "inspect" method', function() {
    eq(S.Just([1, 2, 3]).inspect.length, 0);
    eq(S.Just([1, 2, 3]).inspect(), 'Just([1, 2, 3])');
  });

  it('implements Semigroup', function() {
    var a = S.Just('foo');
    var b = S.Just('bar');
    var c = S.Just('baz');

    // associativity
    eq(a.concat(b).concat(c).equals(a.concat(b.concat(c))), true);
  });

  it('implements Monoid', function() {
    var a = S.Just([1, 2, 3]);

    // left identity
    eq(a.empty().concat(a).equals(a), true);

    // right identity
    eq(a.concat(a.empty()).equals(a), true);
  });

  it('implements Functor', function() {
    var a = S.Just(7);
    var f = S.inc;
    var g = square;

    // identity
    eq(a.map(S.I).equals(a), true);

    // composition
    eq(a.map(function(x) { return f(g(x)); }).equals(a.map(g).map(f)), true);
  });

  it('implements Apply', function() {
    var a = S.Just(S.inc);
    var b = S.Just(square);
    var c = S.Just(7);

    // composition
    eq(a.map(function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }).ap(b).ap(c).equals(a.ap(b.ap(c))), true);
  });

  it('implements Applicative', function() {
    var a = S.Just(null);
    var b = S.Just(S.inc);
    var f = S.inc;
    var x = 7;

    // identity
    eq(a.of(S.I).ap(b).equals(b), true);

    // homomorphism
    eq(a.of(f).ap(a.of(x)).equals(a.of(f(x))), true);

    // interchange
    eq(a.of(function(f) { return f(x); }).ap(b).equals(b.ap(a.of(x))), true);
  });

  it('implements Chain', function() {
    var a = S.Just([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    var f = S.head;
    var g = S.last;

    // associativity
    eq(a.chain(f).chain(g).equals(a.chain(function(x) { return f(x).chain(g); })), true);
  });

  it('implements Monad', function() {
    var a = S.Just(null);
    var f = S.head;
    var x = [1, 2, 3];

    // left identity
    eq(a.of(x).chain(f).equals(f(x)), true);

    // right identity
    eq(a.chain(a.of).equals(a), true);
  });

});
