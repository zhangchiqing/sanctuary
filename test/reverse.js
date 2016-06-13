'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('reverse', function() {

  it('is a unary function', function() {
    eq(typeof S.reverse, 'function');
    eq(S.reverse.length, 1);
    eq(S.reverse.toString(), 'reverse :: List a -> List a');
  });

  it('reverses arrays', function() {
    eq(S.reverse([]), []);
    eq(S.reverse([1, 2, 3]), [3, 2, 1]);
    eq(S.reverse(['1', '2', '3']), ['3', '2', '1']);
  });

  it('reverses strings', function() {
    eq(S.reverse(''), '');
    eq(S.reverse('123'), '321');
  });

});
