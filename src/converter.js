import Units from './units.js';
import measureParser from './util/measure-parser.js';
import assert from './util/assert.js';


export default {
  convert(typeName) {
    const typeDef = Units.get(typeName);

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
        assert(typeDef.hasConverter(converter), `Unknown conversion function "${converter}" found for type definition "${typeName}"`);

        const params = {};

        return {
          with(name, value, unit) {
            if (typeof name === 'string') {
              assert(name in typeDef.conversion.params, `Unknown argument "${name}" in conversion function "${converter}", expected one of : "${Object.keys(typeDef.conversion.params).join('", "')}"`);

              const param = measureParser(value, unit);
              const paramTypeName = typeDef.conversion.params[name];
              const paramTypeDef = Units.get(paramTypeName);

              params[name] = paramTypeDef.calcBase(param.value, param.unit);
            } else if (arguments.length === 1) {
              assert(name && (typeof name === 'object'), `Invalid argument "${name}"`);

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
              assert(false, 'Invalid arguments given');
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
