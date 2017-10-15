'use strict';

const assert = require('assert');
const Units = require('./units');
const measureParser = require('./util/measure-parser');

module.exports = {
  convert(type) {
    const typeDef = Units.getType(type);

    return {
      from(fromValue, fromUnit) {
        const param = measureParser(fromValue, fromUnit);

        return {
          to(toUnit) {
            return typeDef.calc(param.value, param.unit, toUnit);
          }
        }
      },
      using(converter) {
        assert(typeDef.hasConverter(converter), 'Unknown conversion function "' + converter + '" found for type definition "' + type + '"');

        const params = {};

        return {
          with(name, value, unit) {
            if (typeof name === 'string') {
              const param = measureParser(value, unit);
              const paramType = typeDef.conversion.params[name];
              const paramTypeDef = Units.getType(paramType);

              params[name] = paramTypeDef.calcBase(param.value, param.unit);
            } else if (arguments.length === 1) {
              assert(name && (typeof name === 'object'), 'Invalid argument "' + name + '"');

              const keys = Object.keys(name);

              for (const key of keys) {
                const value = name[key];

                if (Array.isArray(value)) {
                  this.with(key, value[0], value[1]);   // we only care for the first two args
                } else {
                  this.with(key, value);
                }
              }
            } else {
              assert.fail('Invalid arguments given');
            }

            return this;
          },
          to(toUnit) {
            return typeDef.calc(typeDef.convert(converter, params), typeDef.base, toUnit);
          }
        }
      },
      isCompatible(toType) {
        return typeDef.canConvert(toType);
      }
    };
  }
};
