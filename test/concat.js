'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('concat', function() {

  it('is a binary function', function() {
    eq(typeof S.concat, 'function');
    eq(S.concat.length, 2);
    eq(S.concat.toString(), 'concat :: Semigroup a => a -> a -> a');
  });

  it('can be applied to homogeneous arrays', function() {
    eq(S.concat([], []), []);
    eq(S.concat([1, 2, 3], []), [1, 2, 3]);
    eq(S.concat([], [4, 5, 6]), [4, 5, 6]);
    eq(S.concat([1, 2, 3], [4, 5, 6]), [1, 2, 3, 4, 5, 6]);
  });

  it('can be applied to strings', function() {
    eq(S.concat('', ''), '');
    eq(S.concat('foo', ''), 'foo');
    eq(S.concat('', 'bar'), 'bar');
    eq(S.concat('foo', 'bar'), 'foobar');
  });

  it('can be applied to maybes', function() {
    eq(S.concat(S.Nothing, S.Nothing), S.Nothing);
    eq(S.concat(S.Just('foo'), S.Nothing), S.Just('foo'));
    eq(S.concat(S.Nothing, S.Just('bar')), S.Just('bar'));
    eq(S.concat(S.Just('foo'), S.Just('bar')), S.Just('foobar'));
  });

  it('can be applied to eithers', function() {
    eq(S.concat(S.Left('abc'), S.Left('def')), S.Left('abcdef'));
    eq(S.concat(S.Right([1, 2, 3]), S.Left('def')), S.Right([1, 2, 3]));
    eq(S.concat(S.Left('abc'), S.Right([4, 5, 6])), S.Right([4, 5, 6]));
    eq(S.concat(S.Right([1, 2, 3]), S.Right([4, 5, 6])), S.Right([1, 2, 3, 4, 5, 6]));
  });

});
