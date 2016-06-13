'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('toLower', function() {

  it('is a unary function', function() {
    eq(typeof S.toLower, 'function');
    eq(S.toLower.length, 1);
    eq(S.toLower.toString(), 'toLower :: String -> String');
  });

  it('returns the lower-case equivalent of its argument', function() {
    eq(S.toLower(''), '');
    eq(S.toLower('ABC def 123'), 'abc def 123');
    eq(S.toLower(new String('')), '');
    eq(S.toLower(new String('ABC def 123')), 'abc def 123');
  });

});
