'use strict';

const assert = require('assert');
const fnArgs = require('function-arguments');


/**
Unit definition cache.
@private
*/
const unitCache = {};

/**
Expose an instance of Units, a class to register and retrieve
unit definitions
*/
const Units = module.exports = new class Units {

  /**
  Register a new type definition.

  The type should be a string, and it's value should be the one
  referenced by other type's conversion rules.
  The data should be an array with these properties :

    - name {string}        the humain-readable name of this unit type
    - base {string}        the base unit for this unit type
    - units {object}       a map of unit names and their associated values, where
                           the base unit should have a value of 1
    - aliases {object}     (optional) a map representing unit names aliases (ex: 'km': 'kilometer')
    - converters {array}   (optional) an array of conversion rules

  See : UnitDefinition for more information.

  @param type {string}
  @param data {object}
  */
  registerType(type, def) {
    // TODO : validate type
    unitCache[type] = new UnitDefinition(def);
  }

  /**
  Unregister a unit type
  @param type {string}
  */
  unregisterType(type) {
    // TODO : validate type
    delete unitCache[type];
  }


  /**
  Return an array of all available units. If type is specified, then
  return all units of the same type.
  @param type {string} (optional)
  @return {Array}
  */
  available(type) {
    if (type) {
      let def = this.getType(type);
      let units = Object.keys(def.aliases);

      units.push.apply(units, Object.keys(def.units));

      return units.sort();
    } else {
      return this.types.reduce((units, type) => {
        let def = this.getType(type);
        units.push.apply(units, Object.keys(def.aliases).concat(Object.keys(def.units)));
        return units;
      }, []).sort();
    }
  }

  /**
  Return all available types
  @return {Array}
  */
  get types() {
    return Object.keys(unitCache).sort();
  }

  /**
  Return the unit type
  @return {object}
  */
  getType(type) {
    if (!(type in unitCache)) {
      throw new TypeError('Invalid unit type : ' + type);
    }
    return unitCache[type];
  }

  /**
  Return the first type definition name found for the given unit
  @param unit {string}
  @return {string}
  */
  getUnitTypeName(unit) {
    return Object.keys(unitCache).find(function (type) {
      const typeDef = unitCache[type];

      return (unit in typeDef.units || unit in typeDef.aliases);
    });
  }

}


/**
Wrap unit definitions with helper methods and validations.
@private
*/
class UnitDefinition {
  constructor(data) {
    assert(typeof data.name === 'string' && data.name, 'Definition has no name');
    assert(typeof data.base === 'string' && data.base, 'Definition has no base unit : ' + data.name);
    assert(data.units && Object.keys(data.units).length, 'Definition has no units : ' + data.name);

    this.name = data.name;
    this.base = data.base;
    this.units = data.units;
    this.aliases = data.aliases || {};
    this.conversion = data.conversion || {};

    assert(this.base in this.units, 'Invalid base "' + this.base +'" in definition : ' + this.name);

    Object.keys(this.aliases).every(alias => {
      assert(typeof this.aliases[alias] === 'string', 'Invalid alias value for "' + alias + '" in definition : ' + this.name);
      assert(this.aliases[alias] in this.units, 'Invalid alias "' + alias + '" = "' + this.aliases[alias] + '" in definition : ' + this.name);
    });

    this.conversion.converters && Object.keys(this.conversion.converters).forEach(converterName => {
      let converterFn = this.conversion.converters[converterName];
      let converterParams = fnArgs(converterFn);

      assert(this.conversion.params && converterParams.every(param => param in this.conversion.params), 'Paramters not defined for converter : ' + converterName);
    });
  }

  /**
  Resolve the specified unit name. This method does not check whether the
  specified value is actually a valid unit name.
  @param unit {string}
  @return {string}
  */
  resolveUnit(unit) {
    return this.aliases && this.aliases[unit] || unit;
  }

  /**
  Calculate the value from a given unit to another unit.
  For example: unitDef.calc(1, 'kilometer', 'meter') => 1000
  @param value {number}
  @param fromUnit {string}
  @param toUnit {string}
  @return {number}
  */
  calc(value, fromUnit, toUnit) {
    fromUnit = this.resolveUnit(fromUnit);
    toUnit = this.resolveUnit(toUnit);

    assert(fromUnit in this.units, 'Invalid unit "' + fromUnit + '" in definition : ' + this.name);
    assert(toUnit in this.units, 'Invalid unit "' + toUnit + '" in definition : ' + this.name);

    if (fromUnit !== toUnit) {
      if (typeof this.units[fromUnit].toBase === 'function' && fromUnit !== this.base) {
        value = this.units[fromUnit].toBase(Number(value));
      } else {
        value *= this.units[fromUnit];
      }
      if (typeof this.units[toUnit].fromBase === 'function' && toUnit !== this.base) {
        value = this.units[toUnit].fromBase(Number(value));
      } else {
        value /= this.units[toUnit];
      }
    }

    return value;
  }

  /**
  Calculate the value from a given unit to this definition's vase unit.
  @param value {number}
  @param unit {string}
  @return {number}
  */
  calcBase(value, unit) {
    return this.calc(value, unit, this.base);
  }

  /**
  Check if any converter can convert the given type to the current type.
  @param type {string}
  @return {boolean}
  */
  canConvert(type) {
    return !!(this.conversion.params && Object.keys(this.conversion.params).some(function (param) {
      return this.conversion.params[param] === type;
    }));
  }

  /**
  Check that this unit type contains the specified converter.
  @param converter {string}
  @return {boolean}
  */
  hasConverter(converter) {
    return this.conversion && this.conversion.converters && typeof this.conversion.converters[converter] === 'function';
  }

  /**
  Call a converter given the specified converter name and params. If no converter match is
  found, an error will be thrown. If not all params as specified for the given converter,
  a value such as NaN may be returned.
  @param converter {string}      the name of the converter to use
  @param params {object}         an object of arguments.
  */
  convert(converter, params) {
    assert(this.hasConverter(converter), 'Unknown or invalid converter "' + converter + '" in definition : ' + this.name);

    const fn = this.conversion.converters[converter]
    const args = fnArgs(fn).map(arg => Number(params[arg]));

    return fn.apply(this, args);
  }
}
