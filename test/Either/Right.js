'use strict';

var S = require('../..');

var eq = require('../internal/eq');
var parseHex = require('../internal/parseHex');
var square = require('../internal/square');
var squareRoot = require('../internal/squareRoot');


describe('Right', function() {

  it('is a data constructor', function() {
    eq(typeof S.Right, 'function');
    eq(S.Right.length, 1);
    eq(S.Right(42)['@@type'], 'sanctuary/Either');
    eq(S.Right(42).isLeft, false);
    eq(S.Right(42).isRight, true);
  });

  it('provides an "ap" method', function() {
    eq(S.Right(S.inc).ap.length, 1);
    eq(S.Right(S.inc).ap.toString(), 'Either#ap :: Either a (b -> c) ~> Either a b -> Either a c');
    eq(S.Right(S.inc).ap(S.Left('abc')), S.Left('abc'));
    eq(S.Right(S.inc).ap(S.Right(42)), S.Right(43));
  });

  it('provides a "chain" method', function() {
    eq(S.Right(25).chain.length, 1);
    eq(S.Right(25).chain.toString(), 'Either#chain :: Either a b ~> (b -> Either a c) -> Either a c');
    eq(S.Right(25).chain(squareRoot), S.Right(5));
  });

  it('provides a "concat" method', function() {
    eq(S.Right('abc').concat.length, 1);
    eq(S.Right('abc').concat.toString(), 'Either#concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b');
    eq(S.Right('abc').concat(S.Left('xyz')), S.Right('abc'));
    eq(S.Right('abc').concat(S.Right('def')), S.Right('abcdef'));
  });

  it('provides an "equals" method', function() {
    eq(S.Right(42).equals.length, 1);
    eq(S.Right(42).equals.toString(), 'Either#equals :: Either a b ~> c -> Boolean');
    eq(S.Right(42).equals(S.Right(42)), true);
    eq(S.Right(42).equals(S.Right('42')), false);
    eq(S.Right(42).equals(S.Left(42)), false);
    eq(S.Right(42).equals(null), false);

    // Value-based equality:
    eq(S.Right(0).equals(S.Right(-0)), false);
    eq(S.Right(-0).equals(S.Right(0)), false);
    eq(S.Right(NaN).equals(S.Right(NaN)), true);
    eq(S.Right([1, 2, 3]).equals(S.Right([1, 2, 3])), true);
    eq(S.Right(new Number(42)).equals(S.Right(new Number(42))), true);
    eq(S.Right(new Number(42)).equals(42), false);
  });

  it('provides an "extend" method', function() {
    eq(S.Right(42).extend.length, 1);
    eq(S.Right(42).extend.toString(), 'Either#extend :: Either a b ~> (Either a b -> b) -> Either a b');
    eq(S.Right(42).extend(function(x) { return x.value / 2; }), S.Right(21));

    // associativity
    var w = S.Right(42);
    var f = function(x) { return x.value + 1; };
    var g = function(x) { return x.value * x.value; };
    eq(w.extend(g).extend(f), w.extend(function(_w) { return f(_w.extend(g)); }));
  });

  it('provides a "map" method', function() {
    eq(S.Right(42).map.length, 1);
    eq(S.Right(42).map.toString(), 'Either#map :: Either a b ~> (b -> c) -> Either a c');
    eq(S.Right(42).map(square), S.Right(1764));
  });

  it('provides a "reduce" method', function() {
    eq(S.Right(5).reduce.length, 2);
    eq(S.Right(5).reduce.toString(), 'Either#reduce :: Either a b ~> ((c, b) -> c) -> c -> c');
    eq(S.Right(5).reduce(function(x, y) { return x - y; }, 42), 37);
  });

  it('provides a "sequence" method', function() {
    eq(S.Right(S.Just(42)).sequence.length, 1);
    eq(S.Right(S.Just(42)).sequence.toString(), 'Either#sequence :: Applicative f => Either a (f b) ~> (b -> f b) -> f (Either a b)');
    eq(S.Right(S.Just(42)).sequence(S.Maybe.of), S.Just(S.Right(42)));
  });

  it('provides a "toBoolean" method', function() {
    eq(S.Right(42).toBoolean.length, 0);
    eq(S.Right(42).toBoolean.toString(), 'Either#toBoolean :: Either a b ~> () -> Boolean');
    eq(S.Right(42).toBoolean(), true);
  });

  it('provides a "toString" method', function() {
    eq(S.Right([1, 2, 3]).toString.length, 0);
    eq(S.Right([1, 2, 3]).toString.toString(), 'Either#toString :: Either a b ~> () -> String');
    eq(S.Right([1, 2, 3]).toString(), 'Right([1, 2, 3])');
  });

  it('provides an "inspect" method', function() {
    eq(S.Right([1, 2, 3]).inspect.length, 0);
    eq(S.Right([1, 2, 3]).inspect(), 'Right([1, 2, 3])');
  });

  it('implements Semigroup', function() {
    var a = S.Right('foo');
    var b = S.Right('bar');
    var c = S.Right('baz');

    // associativity
    eq(a.concat(b).concat(c).equals(a.concat(b.concat(c))), true);
  });

  it('implements Functor', function() {
    var a = S.Right(7);
    var f = S.inc;
    var g = square;

    // identity
    eq(a.map(S.I).equals(a), true);

    // composition
    eq(a.map(function(x) { return f(g(x)); }).equals(a.map(g).map(f)), true);
  });

  it('implements Apply', function() {
    var a = S.Right(S.inc);
    var b = S.Right(square);
    var c = S.Right(7);

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
    var a = S.Right(null);
    var b = S.Right(S.inc);
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
    var a = S.Right('0x0100');
    var f = parseHex;
    var g = squareRoot;

    // associativity
    eq(a.chain(f).chain(g).equals(a.chain(function(x) { return f(x).chain(g); })), true);
  });

  it('implements Monad', function() {
    var a = S.Right(null);
    var f = squareRoot;
    var x = 25;

    // left identity
    eq(a.of(x).chain(f).equals(f(x)), true);

    // right identity
    eq(a.chain(a.of).equals(a), true);
  });

});
