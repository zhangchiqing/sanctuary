'use strict';

var vm = require('vm');

var S = require('..');

var eq = require('./internal/eq');


describe('pluck', function() {

  it('is a ternary function', function() {
    eq(typeof S.pluck, 'function');
    eq(S.pluck.length, 3);
    eq(S.pluck.toString(), 'pluck :: Accessible a => TypeRep b -> String -> Array a -> Array (Maybe b)');
  });

  it('returns a list of satisfactory plucked values', function() {
    var xs = [{x: '1'}, {x: 2}, {x: null}, {x: undefined}, {}];
    eq(S.pluck(Number, 'x', []), []);
    eq(S.pluck(Number, 'x', xs), [S.Nothing, S.Just(2), S.Nothing, S.Nothing, S.Nothing]);
  });

  it('does not rely on constructor identity', function() {
    eq(S.pluck(Array, 'x', [{x: vm.runInNewContext('[0]')}]), [S.Just([0])]);
    eq(S.pluck(vm.runInNewContext('Array'), 'x', [{x: [0]}]), [S.Just([0])]);
  });

});
