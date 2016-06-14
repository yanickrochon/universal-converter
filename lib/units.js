'use strict';

/**
Unit definition cache.
@private
*/
const unitCache = {};

/**
Expose an instance of Units, a class to register and retrieve
unit definitions
*/
module.exports = new class Units {

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
      return def && (def.aliases && Object.keys(def.aliases) || []).concat(Object.keys(def.units)).sort() || [];
    } else {
      return this.types.reduce((units, type) => {
        let def = this.getType(type);
        units.push.apply(units, def && (def.aliases && Object.keys(def.aliases) || []).concat(Object.keys(def.units)).sort() || [] );
        return units;
      }, []);
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
  findTypeName(unit) {
    return Object.keys(unitCache).reduce(function (found, type) {
      const typeDef = unitCache[type];

      if (unit in typeDef.units || unit in typeDef.aliases) {
        found = typeDef;
      }

      return found;
    }, undefined);
  }

}


/**
Wrap unit definitions with helper methods and validations.
@private
*/
class UnitDefinition {
  constructor(data) {
    if (!(typeof data.name === 'string' && data.name)) {
      throw new TypeError('Definition has no name');
    } else if (!(typeof data.base === 'string' && data.base)) {
      throw new TypeError('Definition has no base unit : ' + data.name);
    }

    this.name = data.name;
    this.base = data.base;
    this.units = data.units || {};
    this.aliases = data.aliases || {};
    this.converters = data.converters || [];

    if (!(this.base in this.units)) {
      throw new TypeError('Invalid base "' + this.base +'" in definition : ' + this.name);
    }

    Object.keys(this.aliases).forEach(alias => {
      const unit = this.aliases[alias];

      if (!(unit && unit in this.units)) {
        throw new TypeError('Invalid alias "' + alias + '" = "' + unit + '" in definition : ' + this.name);
      }
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

    if (!(fromUnit in this.units)) {
      throw new TypeError('Invalid unit "' + fromUnit + '" in definition : ' + this.name);
    } else if (!(toUnit in this.units)) {
      throw new TypeError('Invalid unit "' + toUnit + '" in definition : ' + this.name);
    }

    return value * this.units[fromUnit] / this.units[toUnit];
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
}
