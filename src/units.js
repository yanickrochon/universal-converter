import assert from './util/assert';


/**
Unit definition cache.
@private
*/
const unitCache = {};

/**
Register and retrive registered unit definitions
*/
export default {

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

  @param def {object}
  */
  register(def) {
    const typeDef = new UnitDefinition(def);

    unitCache[typeDef.name] = typeDef;
  },

  /**
  Unregister a unit type
  @param typeName {string}
  */
  unregister(typeName) {
    assert(typeof typeName === 'string' && typeName.length, 'Invalid type');

    delete unitCache[typeName];
  },


  /**
  Return an array of all available units. If type is specified, then
  return all units of the same type.
  @param typeName {string} (optional)
  @throws {TypeError} if not a known unit type name
  @return {Array}
  */
  available(typeName) {
    if (typeName) {
      const typeDef = this.get(typeName);
      const units = Object.keys(typeDef.aliases);

      units.push.apply(units, Object.keys(typeDef.units));

      return units.sort();
    } else {
      return this.types.reduce((units, typeName) => {
        const typeDef = this.get(typeName);
        units.push.apply(units, Object.keys(typeDef.aliases).concat(Object.keys(typeDef.units)));
        return units;
      }, []).sort();
    }
  },

  /**
  Return all available types
  @return {Array}
  */
  get types() {
    return Object.keys(unitCache).sort();
  },

  /**
  Return the UnitDefinition instance for the specified type name
  @param typeName {String}
  @throws {TypeError} if not a known unit type name
  @return {UnitDefinition}
  */
  get(typeName) {
    if (!(typeName in unitCache)) {
      throw new TypeError('Invalid unit type name : ' + typeName);
    }
    return unitCache[typeName];
  },

  /**
  Return the first type definition name found for the given unit
  @param unit {string}
  @return {string|undefined}
  */
  getUnitTypeName(unit) {
    return Object.keys(unitCache).find(typeName => {
      const typeDef = unitCache[typeName];

      return (unit in typeDef.units || unit in typeDef.aliases);
    });
  }

};


/**
Wrap unit definitions with helper methods and validations.
*/
export class UnitDefinition {
  constructor({ name, base, units, aliases, conversion }) {
    assert(typeof name === 'string' && name, 'Definition has no name');
    assert(typeof base === 'string' && base, 'Definition has no base unit : ' + name);
    assert(units && Object.keys(units).length, 'Definition has no units : ' + name);

    this.name = name;
    this.base = base;
    this.units = units;
    this.aliases = aliases || {};
    this.conversion = conversion || {};

    assert(this.base in this.units, 'Invalid base "' + this.base + '" in definition : ' + this.name);

    Object.keys(this.aliases).forEach(alias => {
      assert(typeof this.aliases[alias] === 'string', 'Invalid alias value for "' + alias + '" in definition : ' + this.name);
      assert(this.aliases[alias] in this.units, 'Invalid alias "' + alias + '" = "' + this.aliases[alias] + '" in definition : ' + this.name);
    });

    if (this.conversion.converters) {
      Object.keys(this.conversion.converters).forEach(converterName => {
        const converterFn = this.conversion.converters[converterName];

        assert(typeof converterFn === 'function', 'Converter should be a function : ' + converterName);
      });
    }
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
    return !!(this.conversion.params && Object.keys(this.conversion.params).some(param => this.conversion.params[param] === type));
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

    return fn.call(this, params || {});
  }
};