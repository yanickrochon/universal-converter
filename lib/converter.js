
var Transformer = require('./transformer');


module.exports = Converter;

/**
Create a new converter instance with the specified value
*/
function Converter(n) {
  if (!(this instanceof Converter)) {
    return new Converter(n);
  }

  this.value = n;
}

/**
Create a new Transformer instance with the specified unit linked to this Converter
@param unit {string}
@return Transformer
*/
Converter.prototype.from = function from(unit) {
  return new Transformer(this, unit);
};

/**
Return a list of all available conversion units
@return {Array}
*/
Converter.prototype.available = function available() {
  // TODO
}

