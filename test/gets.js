'use strict';

var vm = require('vm');

var S = require('..');

var eq = require('./internal/eq');


describe('gets', function() {

  it('is a ternary function', function() {
    eq(typeof S.gets, 'function');
    eq(S.gets.length, 3);
    eq(S.gets.toString(), 'gets :: Accessible a => TypeRep b -> Array String -> a -> Maybe b');
  });

  it('returns a Maybe', function() {
    var obj = {x: {z: 0}, y: 42};
    eq(S.gets(Number, ['x'], obj), S.Nothing);
    eq(S.gets(Number, ['y'], obj), S.Just(42));
    eq(S.gets(Number, ['z'], obj), S.Nothing);
    eq(S.gets(Number, ['x', 'z'], obj), S.Just(0));
    eq(S.gets(Number, ['a', 'b', 'c'], obj), S.Nothing);
    eq(S.gets(Number, [], obj), S.Nothing);
    eq(S.gets(Object, [], obj), S.Just({x: {z: 0}, y: 42}));
  });

  it('does not rely on constructor identity', function() {
    eq(S.gets(RegExp, ['x'], {x: vm.runInNewContext('/.*/')}), S.Just(/.*/));
    eq(S.gets(vm.runInNewContext('RegExp'), ['x'], {x: /.*/}), S.Just(/.*/));
  });

});
