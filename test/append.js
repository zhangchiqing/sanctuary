'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('append', function() {

  it('is a binary function', function() {
    eq(typeof S.append, 'function');
    eq(S.append.length, 2);
    eq(S.append.toString(), 'append :: a -> Array a -> Array a');
  });

  it('appends an element to an array', function() {
    eq(S.append(3, []), [3]);
    eq(S.append(3, [1, 2]), [1, 2, 3]);
    eq(S.append([5, 6], [[1, 2], [3, 4]]), [[1, 2], [3, 4], [5, 6]]);
  });

});
