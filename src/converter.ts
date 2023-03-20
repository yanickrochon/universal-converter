import { $DEF } from "./util/constants";
import type {
  UnitDefType,
  DefinitionUnits,
  DefinitionAliases,
  DefinitionUnitFromTo,
  ConversionParams,
  Converters,
  UnitType,
  ConverterFnParams,
} from "./units";

type ConverterTo<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>,
  D extends UnitDefType<T, U, A, P, C>
> = {
  to(
    toUnit: keyof D[typeof $DEF]["units"] | keyof D[typeof $DEF]["aliases"]
  ): number;
  toBase(): number;
};

type ConverterFrom<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>,
  D extends UnitDefType<T, U, A, P, C>
> = {
  from(
    value: number,
    fromUnit: keyof D[typeof $DEF]["units"] | keyof D[typeof $DEF]["aliases"]
  ): ConverterTo<T, U, A, P, C, D>;
};

type ConverterUsingWith<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>,
  D extends UnitDefType<T, U, A, P, C>
> = {
  with(
    param: keyof D[typeof $DEF]["conversion"]["params"],
    value: number
  ): ConverterUsingWith<T, U, A, P, C, D>;
} & ConverterTo<T, U, A, P, C, D>;

type ConverterUsing<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>,
  D extends UnitDefType<T, U, A, P, C>
> = {
  using(
    converterName: keyof D[typeof $DEF]["conversion"]["converters"]
  ): ConverterUsingWith<T, U, A, P, C, D>;
};

type Converter = {
  convert<
    T extends UnitType,
    U extends DefinitionUnits,
    A extends DefinitionAliases<U>,
    P extends ConversionParams,
    C extends Converters<P>,
    D extends UnitDefType<T, U, A, P, C>
  >(
    unitType: UnitDefType<T, U, A, P, C>
  ): ConverterFrom<T, U, A, P, C, D> & ConverterUsing<T, U, A, P, C, D>;
};

const Converter: Converter = {
  convert(unitType) {
    const def = unitType[$DEF];
    return {
      from(value, fromUnit) {
        if (fromUnit in def.aliases) {
          fromUnit = def.aliases[fromUnit as keyof (typeof def)["aliases"]];
        }
        const fromUnitValue =
          def.units[fromUnit as keyof (typeof def)["units"]];

        if (
          typeof (fromUnitValue as DefinitionUnitFromTo).toBase === "function"
        ) {
          value = (fromUnitValue as DefinitionUnitFromTo).toBase(value);
        } else {
          value = value * (fromUnitValue as number);
        }

        return {
          to(toUnit) {
            if (toUnit in def.aliases) {
              toUnit = def.aliases[toUnit as keyof (typeof def)["aliases"]];
            }

            const toUnitValue =
              def.units[toUnit as keyof (typeof def)["units"]];

            if (fromUnit !== toUnit) {
              if (
                typeof (toUnitValue as DefinitionUnitFromTo).fromBase ===
                "function"
              ) {
                value = (toUnitValue as DefinitionUnitFromTo).fromBase(value);
              } else {
                value = value / (toUnitValue as number);
              }
            }

            return value;
          },
          toBase() {
            return value;
          },
        };
      },

      using(converterName) {
        const converter = def.conversion.converters[converterName];
        const params = {} as ConverterFnParams<typeof def.conversion.params>;

        return {
          with(param, value) {
            (params as any)[param] = value;

            return this;
          },
          to(unit) {
            let value = converter(params);
            if (unit in def.aliases) {
              unit = def.aliases[unit as keyof (typeof def)["aliases"]];
            }

            if (unit !== def.base) {
              const unitValue = def.units[unit as keyof (typeof def)["units"]];

              if (
                typeof (unitValue as DefinitionUnitFromTo).fromBase ===
                "function"
              ) {
                value = (unitValue as DefinitionUnitFromTo).fromBase(value);
              } else {
                value = value / (unitValue as number);
              }
            }

            return value;
          },
          toBase() {
            return converter(params);
          },
        };
      },
    };
  },
};

export default Converter;
