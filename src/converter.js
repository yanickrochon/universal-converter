'use strict';

const assert = require('assert');
const units = require('./units');
const measureParser = require('./util/measure-parser');


module.exports = new class Converter {
  convert(type) {
    const typeDef = units.getType(type);

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
            const param = measureParser(value, unit);
            const paramType = typeDef.conversion.params[name];
            const paramTypeDef = units.getType(paramType);

            params[name] = paramTypeDef.calcBase(param.value, param.unit);

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
}
