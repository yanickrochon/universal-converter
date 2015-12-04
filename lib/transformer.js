

module.exports = Transformer;


/**
Create a new transformer with the given base unit for the specified value.
@param converter {Converter}
@param unit {string}
*/
function Transformer(converter, unit) {
  if (!(this instanceof Transformer)) {
    return new Transformer(converter, unit);
  }

  this.converter = converter;
  this.unit = unit;
}

/**
Transform the given instance value into the given unit
@param unit {string}
@return {number}
*/
Transformer.prototype.to = function to(unit) {
  // TODO
};


/**
Return all available transformation units
@return {Array}
*/
Transformer.prototype.available = function available() {
  // TODO
}