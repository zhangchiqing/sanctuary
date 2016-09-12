'use strict';

var jsc = require('jsverify');


module.exports = function forall() {
  jsc.assert(jsc.forall.apply(jsc, arguments));
};
