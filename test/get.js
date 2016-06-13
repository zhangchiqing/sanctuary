'use strict';

var vm = require('vm');

var S = require('..');

var eq = require('./internal/eq');


describe('get', function() {

  it('is a ternary function', function() {
    eq(typeof S.get, 'function');
    eq(S.get.length, 3);
    eq(S.get.toString(), 'get :: Accessible a => TypeRep b -> String -> a -> Maybe b');
  });

  it('returns a Maybe', function() {
    var obj = {x: 0, y: 42};
    eq(S.get(Number, 'x', obj), S.Just(0));
    eq(S.get(Number, 'y', obj), S.Just(42));
    eq(S.get(Number, 'z', obj), S.Nothing);
    eq(S.get(String, 'x', obj), S.Nothing);
  });

  it('does not rely on constructor identity', function() {
    eq(S.get(RegExp, 'x', {x: vm.runInNewContext('/.*/')}), S.Just(/.*/));
    eq(S.get(vm.runInNewContext('RegExp'), 'x', {x: /.*/}), S.Just(/.*/));
  });

});
