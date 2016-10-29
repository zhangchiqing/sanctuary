'use strict';

var S = require('../..');

var eq = require('../internal/eq');
var parseHex = require('../internal/parseHex');
var square = require('../internal/square');
var squareRoot = require('../internal/squareRoot');


describe('Left', function() {

  it('is a data constructor', function() {
    eq(typeof S.Left, 'function');
    eq(S.Left.length, 1);
    eq(S.Left(42)['@@type'], 'sanctuary/Either');
    eq(S.Left(42).isLeft, true);
    eq(S.Left(42).isRight, false);
  });

  it('provides an "ap" method', function() {
    eq(S.Left('abc').ap.length, 1);
    eq(S.Left('abc').ap.toString(), 'Either#ap :: Either a (b -> c) ~> Either a b -> Either a c');
    eq(S.Left('abc').ap(S.Left('xyz')), S.Left('abc'));
    eq(S.Left('abc').ap(S.Right(42)), S.Left('abc'));
  });

  it('provides a "chain" method', function() {
    eq(S.Left('abc').chain.length, 1);
    eq(S.Left('abc').chain.toString(), 'Either#chain :: Either a b ~> (b -> Either a c) -> Either a c');
    eq(S.Left('abc').chain(squareRoot), S.Left('abc'));
  });

  it('provides a "concat" method', function() {
    eq(S.Left('abc').concat.length, 1);
    eq(S.Left('abc').concat.toString(), 'Either#concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b');
    eq(S.Left('abc').concat(S.Left('def')), S.Left('abcdef'));
    eq(S.Left('abc').concat(S.Right('xyz')), S.Right('xyz'));
  });

  it('provides an "equals" method', function() {
    eq(S.Left(42).equals.length, 1);
    eq(S.Left(42).equals.toString(), 'Either#equals :: Either a b ~> c -> Boolean');
    eq(S.Left(42).equals(S.Left(42)), true);
    eq(S.Left(42).equals(S.Left('42')), false);
    eq(S.Left(42).equals(S.Right(42)), false);
    eq(S.Left(42).equals(null), false);

    // Value-based equality:
    eq(S.Left(0).equals(S.Left(-0)), false);
    eq(S.Left(-0).equals(S.Left(0)), false);
    eq(S.Left(NaN).equals(S.Left(NaN)), true);
    eq(S.Left([1, 2, 3]).equals(S.Left([1, 2, 3])), true);
    eq(S.Left(new Number(42)).equals(S.Left(new Number(42))), true);
    eq(S.Left(new Number(42)).equals(42), false);
  });

  it('provides an "extend" method', function() {
    eq(S.Left('abc').extend.length, 1);
    eq(S.Left('abc').extend.toString(), 'Either#extend :: Either a b ~> (Either a b -> b) -> Either a b');
    eq(S.Left('abc').extend(function(x) { return x / 2; }), S.Left('abc'));

    // associativity
    var w = S.Left('abc');
    var f = function(x) { return x.value + 1; };
    var g = function(x) { return x.value * x.value; };
    eq(w.extend(g).extend(f), w.extend(function(_w) { return f(_w.extend(g)); }));
  });

  it('provides a "map" method', function() {
    eq(S.Left('abc').map.length, 1);
    eq(S.Left('abc').map.toString(), 'Either#map :: Either a b ~> (b -> c) -> Either a c');
    eq(S.Left('abc').map(square), S.Left('abc'));
  });

  it('provides a "reduce" method', function() {
    eq(S.Left('abc').reduce.length, 2);
    eq(S.Left('abc').reduce.toString(), 'Either#reduce :: Either a b ~> ((c, b) -> c) -> c -> c');
    eq(S.Left('abc').reduce(function(x, y) { return x - y; }, 42), 42);
  });

  it('provides a "sequence" method', function() {
    eq(S.Left('abc').sequence.length, 1);
    eq(S.Left('abc').sequence.toString(), 'Either#sequence :: Applicative f => Either a (f b) ~> (b -> f b) -> f (Either a b)');
    eq(S.Left('abc').sequence(S.Maybe.of), S.Just(S.Left('abc')));
  });

  it('provides a "toBoolean" method', function() {
    eq(S.Left('abc').toBoolean.length, 0);
    eq(S.Left('abc').toBoolean.toString(), 'Either#toBoolean :: Either a b ~> () -> Boolean');
    eq(S.Left('abc').toBoolean(), false);
  });

  it('provides a "toString" method', function() {
    eq(S.Left('abc').toString.length, 0);
    eq(S.Left('abc').toString.toString(), 'Either#toString :: Either a b ~> () -> String');
    eq(S.Left('abc').toString(), 'Left("abc")');
  });

  it('provides an "inspect" method', function() {
    eq(S.Left('abc').inspect.length, 0);
    eq(S.Left('abc').inspect(), 'Left("abc")');
  });

  it('implements Semigroup', function() {
    var a = S.Left('foo');
    var b = S.Left('bar');
    var c = S.Left('baz');

    // associativity
    eq(a.concat(b).concat(c).equals(a.concat(b.concat(c))), true);
  });

  it('implements Functor', function() {
    var a = S.Left('Cannot divide by zero');
    var f = S.inc;
    var g = square;

    // identity
    eq(a.map(S.I).equals(a), true);

    // composition
    eq(a.map(function(x) { return f(g(x)); }).equals(a.map(g).map(f)), true);
  });

  it('implements Apply', function() {
    var a = S.Left('Cannot divide by zero');
    var b = S.Left('Cannot divide by zero');
    var c = S.Left('Cannot divide by zero');

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
    var a = S.Left('Cannot divide by zero');
    var b = S.Left('Cannot divide by zero');
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
    var a = S.Left('Cannot divide by zero');
    var f = parseHex;
    var g = squareRoot;

    // associativity
    eq(a.chain(f).chain(g).equals(a.chain(function(x) { return f(x).chain(g); })), true);
  });

  it('implements Monad', function() {
    var a = S.Left('Cannot divide by zero');
    var f = squareRoot;
    var x = 25;

    // left identity
    eq(a.of(x).chain(f).equals(f(x)), true);

    // right identity
    eq(a.chain(a.of).equals(a), true);
  });

});
