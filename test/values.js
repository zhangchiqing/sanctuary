'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('values', function() {

  it('is a unary function', function() {
    eq(typeof S.values, 'function');
    eq(S.values.length, 1);
    eq(S.values.toString(), 'values :: StrMap a -> Array a');
  });

  it("returns an array of the given object's own values", function() {
    eq(S.values({}), []);
    eq(S.values({a: 1, b: 2, c: 3}).sort(), [1, 2, 3]);
  });

  it('does not include prototype values', function() {
    var proto = {a: 1, b: 2};
    var obj = Object.create(proto);
    obj.c = 3;
    obj.d = 4;

    eq(S.values(obj).sort(), [3, 4]);
  });

});
