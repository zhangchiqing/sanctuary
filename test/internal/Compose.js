'use strict';

var FL = require('fantasy-land');
var Z = require('sanctuary-type-classes');


var _Compose = function Compose(F, G, x) {
  if (!(this instanceof Compose)) return new Compose(F, G, x);
  this.F = F;
  this.G = G;
  this.x = x;
};

_Compose.prototype['@@type'] = 'sanctuary/Compose';

_Compose.prototype[FL.equals] = function(other) {
  return Z.equals(other.x, this.x);
};

_Compose.prototype[FL.map] = function(f) {
  return _Compose(this.F, this.G, Z.map(function(y) { return Z.map(f, y); }, this.x));
};

_Compose.prototype[FL.ap] = function(other) {
  return _Compose(this.F, this.G, Z.ap(Z.map(Z.ap, this.x), other.x));
};

_Compose.prototype.inspect =
_Compose.prototype.toString = function() {
  return 'Compose(' + Z.toString(this.F) + ')(' + Z.toString(this.G) + ')(' + Z.toString(this.x) + ')';
};


//  Compose :: (Apply f, Apply g) => TypeRep f -> TypeRep g -> f (g a) -> Compose f g a
var Compose = function(F) {
  return function(G) {
    var Composed = function(x) {
      return _Compose(F, G, x);
    };
    Composed[FL.of] = function(x) {
      return _Compose(F, G, Z.of(F, Z.of(G, x)));
    };
    return Composed;
  };
};

module.exports = Compose;
