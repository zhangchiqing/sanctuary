'use strict';

var $ = require('sanctuary-def');

var S = require('../..');


//  Compose :: Type -> Type
var Compose = $.UnaryType(
  'sanctuary/Compose',
  function(x) { return S.type(x) === 'sanctuary/Compose'; },
  function(compose) { return []; }
);

//  Identity :: Type -> Type
var Identity = $.UnaryType(
  'sanctuary/Identity',
  function(x) { return S.type(x) === 'sanctuary/Identity'; },
  function(identity) { return [identity.value]; }
);

module.exports = S.create({
  checkTypes: true,
  env: S.env.concat([Compose, Identity])
});
