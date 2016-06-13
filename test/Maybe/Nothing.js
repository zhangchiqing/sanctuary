'use strict';

var R = require('ramda');

var S = require('../..');

var eq = require('../internal/eq');
var square = require('../internal/square');


describe('Nothing', function() {

  it('is a member of the "Maybe a" type', function() {
    eq(S.Nothing['@@type'], 'sanctuary/Maybe');
    eq(S.Nothing.isNothing, true);
    eq(S.Nothing.isJust, false);
  });

  it('provides an "ap" method', function() {
    eq(S.Nothing.ap.length, 1);
    eq(S.Nothing.ap.toString(), 'Maybe#ap :: Maybe (a -> b) ~> Maybe a -> Maybe b');
    eq(S.Nothing.ap(S.Nothing), S.Nothing);
    eq(S.Nothing.ap(S.Just(42)), S.Nothing);
  });

  it('provides a "chain" method', function() {
    eq(S.Nothing.chain.length, 1);
    eq(S.Nothing.chain.toString(), 'Maybe#chain :: Maybe a ~> (a -> Maybe b) -> Maybe b');
    eq(S.Nothing.chain(S.head), S.Nothing);
  });

  it('provides a "concat" method', function() {
    eq(S.Nothing.concat.length, 1);
    eq(S.Nothing.concat.toString(), 'Maybe#concat :: Semigroup a => Maybe a ~> Maybe a -> Maybe a');
    eq(S.Nothing.concat(S.Nothing), S.Nothing);
    eq(S.Nothing.concat(S.Just('foo')), S.Just('foo'));
  });

  it('provides an "equals" method', function() {
    eq(S.Nothing.equals.length, 1);
    eq(S.Nothing.equals.toString(), 'Maybe#equals :: Maybe a ~> b -> Boolean');
    eq(S.Nothing.equals(S.Nothing), true);
    eq(S.Nothing.equals(S.Just(42)), false);
    eq(S.Nothing.equals(null), false);
  });

  it('provides an "extend" method', function() {
    eq(S.Nothing.extend.length, 1);
    eq(S.Nothing.extend.toString(), 'Maybe#extend :: Maybe a ~> (Maybe a -> a) -> Maybe a');
    eq(S.Nothing.extend(function(x) { return x.value / 2; }), S.Nothing);

    // associativity
    var w = S.Nothing;
    var f = function(x) { return x.value + 1; };
    var g = function(x) { return x.value * x.value; };
    eq(w.extend(g).extend(f), w.extend(function(_w) { return f(_w.extend(g)); }));
  });

  it('provides a "filter" method', function() {
    eq(S.Nothing.filter.length, 1);
    eq(S.Nothing.filter.toString(), 'Maybe#filter :: Maybe a ~> (a -> Boolean) -> Maybe a');
    eq(S.Nothing.filter(R.T), S.Nothing);
    eq(S.Nothing.filter(R.F), S.Nothing);

    var m = S.Nothing;
    var f = function(n) { return n * n; };
    var p = function(n) { return n < 0; };
    var q = function(n) { return n > 0; };

    eq(m.map(f).filter(p).equals(m.filter(function(x) { return p(f(x)); }).map(f)), true);
    eq(m.map(f).filter(q).equals(m.filter(function(x) { return q(f(x)); }).map(f)), true);
  });

  it('provides a "map" method', function() {
    eq(S.Nothing.map.length, 1);
    eq(S.Nothing.map.toString(), 'Maybe#map :: Maybe a ~> (a -> b) -> Maybe b');
    eq(S.Nothing.map(function() { return 42; }), S.Nothing);
  });

  it('provides a "reduce" method', function() {
    eq(S.Nothing.reduce.length, 2);
    eq(S.Nothing.reduce.toString(), 'Maybe#reduce :: Maybe a ~> ((b, a) -> b) -> b -> b');
    eq(S.Nothing.reduce(function(x, y) { return x - y; }, 42), 42);
  });

  it('provides a "sequence" method', function() {
    eq(S.Nothing.sequence.length, 1);
    eq(S.Nothing.sequence.toString(), 'Maybe#sequence :: Applicative f => Maybe (f a) ~> (a -> f a) -> f (Maybe a)');
    eq(S.Nothing.sequence(S.Either.of), S.Right(S.Nothing));
  });

  it('provides a "toBoolean" method', function() {
    eq(S.Nothing.toBoolean.length, 0);
    eq(S.Nothing.toBoolean.toString(), 'Maybe#toBoolean :: Maybe a ~> () -> Boolean');
    eq(S.Nothing.toBoolean(), false);
  });

  it('provides a "toString" method', function() {
    eq(S.Nothing.toString.length, 0);
    eq(S.Nothing.toString.toString(), 'Maybe#toString :: Maybe a ~> () -> String');
    eq(S.Nothing.toString(), 'Nothing');
  });

  it('provides an "inspect" method', function() {
    eq(S.Nothing.inspect.length, 0);
    eq(S.Nothing.inspect(), 'Nothing');
  });

  it('implements Semigroup', function() {
    var a = S.Nothing;
    var b = S.Nothing;
    var c = S.Nothing;

    // associativity
    eq(a.concat(b).concat(c).equals(a.concat(b.concat(c))), true);
  });

  it('implements Monoid', function() {
    var a = S.Nothing;

    // left identity
    eq(a.empty().concat(a).equals(a), true);

    // right identity
    eq(a.concat(a.empty()).equals(a), true);
  });

  it('implements Functor', function() {
    var a = S.Nothing;
    var f = S.inc;
    var g = square;

    // identity
    eq(a.map(S.I).equals(a), true);

    // composition
    eq(a.map(function(x) { return f(g(x)); }).equals(a.map(g).map(f)), true);
  });

  it('implements Apply', function() {
    var a = S.Nothing;
    var b = S.Nothing;
    var c = S.Nothing;

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
    var a = S.Nothing;
    var b = S.Nothing;
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
    var a = S.Nothing;
    var f = S.head;
    var g = S.last;

    // associativity
    eq(a.chain(f).chain(g).equals(a.chain(function(x) { return f(x).chain(g); })), true);
  });

  it('implements Monad', function() {
    var a = S.Nothing;
    var f = S.head;
    var x = [1, 2, 3];

    // left identity
    eq(a.of(x).chain(f).equals(f(x)), true);

    // right identity
    eq(a.chain(a.of).equals(a), true);
  });

});
