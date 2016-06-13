'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('prepend', function() {

  it('is a binary function', function() {
    eq(typeof S.prepend, 'function');
    eq(S.prepend.length, 2);
    eq(S.prepend.toString(), 'prepend :: a -> Array a -> Array a');
  });

  it('prepends an element to an array', function() {
    eq(S.prepend(1, []), [1]);
    eq(S.prepend(1, [2, 3]), [1, 2, 3]);
    eq(S.prepend([1, 2], [[3, 4], [5, 6]]), [[1, 2], [3, 4], [5, 6]]);
  });

});
