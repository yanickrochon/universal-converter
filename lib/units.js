'use strict';

const path = require('path');
const fs = require('fs');

const DEFINITION_PATH = path.join(__dirname, '..', 'definitions');

module.exports = new class Units {

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

}


class UnitDefinition {
  constructor(data) {
    // TODO : checks

    this.name = data.name;
    this.converters = data.converters || [];
    this.base = data.base;
    this.aliases = data.aliases || {};
    this.units = data.units || {};
  }

  getUnitName(unit) {
    return this.aliases && this.aliases[unit] || unit;
  }

  calc(value, fromUnit, toUnit) {
    fromUnit = this.getUnitName(fromUnit);
    toUnit = this.getUnitName(toUnit);

    return value * this.units[fromUnit] * this.units[toUnit];
  }

  calcBase(value, unit) {
    return calc(value, unit, this.base);
  }

}

// we need these definitions synchronously, now
const unitCache = fs.readdirSync(DEFINITION_PATH).reduce(function (cache, file) {
  var type = path.basename(file, '.js');

  cache[type] = new UnitDefinition( require(path.join(DEFINITION_PATH, file)) );

  return cache;
}, {});
