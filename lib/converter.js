
const assert = require('assert');
const units = require('./units');
const measureParser = require('./util/measure-parser');


module.exports = new class Converter {
  convert(fromType) {
    const fromTypeDef = units.getType(fromType);

    return {
      from(fromValue, fromUnit) {
        const param = measureParser(fromValue, fromUnit);

        return {
          to(toUnit) {
            return fromTypeDef.calc(param.value, param.unit, toUnit);
          }
        }
      },
      as(toType) {
        const toTypeDef = units.getType(toType);
        const params = {};

        return {
          using(converter) {
            assert(toTypeDef.hasConverter(converter), 'Unknown conversion function "' + converter + '" found for type definition "' + toType + '"');

            return {
              with(name, value, unit) {
                const param = measureParser(value, unit);
                const paramType = toTypeDef.conversion.params[name];
                const paramTypeDef = units.getType(paramType);

                params[name] = paramTypeDef.calcBase(param.value, param.unit);

                return this;
              },
              to(toUnit) {
                return toTypeDef.calc(toTypeDef.convert(converter, params), toTypeDef.base, toUnit);
              }
            }
          },
          get isCompatible() {
            return toTypeDef.canConvert(fromType);
          }
        };
      }
    }
  }
}
