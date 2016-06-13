'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('pairs', function() {

  var comparePairsAsc = function(a, b) {
    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
  };

  it('is a unary function', function() {
    eq(typeof S.pairs, 'function');
    eq(S.pairs.length, 1);
    eq(S.pairs.toString(), 'pairs :: StrMap a -> Array (Pair String a)');
  });

  it('returns an array with the key value pairs of each property of the object', function() {
    eq(S.pairs({}), []);
    eq(S.pairs({a: 1, b: 2, c: 3}).sort(comparePairsAsc), [['a', 1], ['b', 2], ['c', 3]]);
  });

  it('does not include prototype properties', function() {
    var proto = {a: 1, b: 2};
    var obj = Object.create(proto);
    obj.c = 3;
    obj.d = 4;

    eq(S.pairs(obj).sort(comparePairsAsc), [['c', 3], ['d', 4]]);
  });

});
