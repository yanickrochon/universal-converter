
const units = require('./units');

/**


Converter.convert( 'distance' )
   .from( 100, 'km' )
   .to( 'yard' )                    => 109361.330

Converter.convert( 'distance' )
  .as( 'area' )                     => true

Converter.convert( 'distance' )
   .from( 100, 'km' )
   .as( 'area' )
   .to( 'square yard' )             => 119599004630.10802565

Converter.convert( 'area' )
   .from( 100, 'km²' )
   .as( 'distance' )
   .with( 'distance', 300, 'ft' )
   .to( 'yard' )                    => ... Number



Converter.convert( type )
         .from( value, unit )
      [ .as( type )
       [.with( type, value, unit ) ...] ]
        .to( unit ) : Number

Converter.convert( type ).as( type ) : Boolean



*/

module.exports = new class Converter {
  convert(fromType) {
    const fromTypeDef = units.getType(fromType);

    return {
      from(value, fromUnit) {
        return {
          as(toType) {
            const toTypeDef = units.getType(toType);
            const paramTypes = [fromType];
            const params = [fromTypeDef.calcBase(value, fromUnit)];

            return {
              with(type, value, unit) {
                const typeDef = units.getType(type);

                paramTypes.push(type);
                params.push(typeDef.calcBase(value, unit));

                return this;
              },
              to(toUnit) {
                const converter = toTypeDef.converters.find(function (converter) {
                  return arraysEqual(converter.params, paramTypes);
                });

                if (!converter) {
                  throw new TypeError('Could not find corresponding converter for ' + toType + ' with [' + paramTypes.join(', ') + ']');
                }

                return toTypeDef.calc( converter.convert(params), toTypeDef.base, toUnit );
              }
            };
          },
          to(toUnit) {
            return fromTypeDef.calc(value, fromUnit, toUnit);
          }
        }
      },
      as(toType) {
        const toTypeDef = units.getType(toType);

        if (toTypeDef.converters) {
          return toTypeDef.converters.some(function (converter) {
            return converter.params.includes(fromType);
          });
        }

        return false;
      }
    }
  }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
