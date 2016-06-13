'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('justs', function() {

  it('is a unary function', function() {
    eq(typeof S.justs, 'function');
    eq(S.justs.length, 1);
    eq(S.justs.toString(), 'justs :: Array (Maybe a) -> Array a');
  });

  it('returns a list containing the value of each Just', function() {
    eq(S.justs([]), []);
    eq(S.justs([S.Nothing, S.Nothing]), []);
    eq(S.justs([S.Nothing, S.Just('b')]), ['b']);
    eq(S.justs([S.Just('a'), S.Nothing]), ['a']);
    eq(S.justs([S.Just('a'), S.Just('b')]), ['a', 'b']);
  });

});
