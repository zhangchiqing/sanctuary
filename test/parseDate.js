'use strict';

var S = require('..');

var eq = require('./internal/eq');


describe('parseDate', function() {

  it('is a unary function', function() {
    eq(typeof S.parseDate, 'function');
    eq(S.parseDate.length, 1);
    eq(S.parseDate.toString(), 'parseDate :: String -> Maybe Date');
  });

  it('returns a Just when applied to a valid date string', function() {
    eq(S.parseDate('2001-02-03T04:05:06Z'), S.Just(new Date('2001-02-03T04:05:06Z')));
  });

  it('returns Nothing when applied to an invalid date string', function() {
    eq(S.parseDate('today'), S.Nothing);
  });

});
