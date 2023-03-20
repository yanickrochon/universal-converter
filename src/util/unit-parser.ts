import { $DEF } from "./constants";
import type {
  ConversionParams,
  Converters,
  DefinitionAliases,
  DefinitionUnits,
  UnitDefType,
  UnitType,
} from "../units";

export type ParsedUnitValue<U extends DefinitionUnits> = {
  value: number;
  unit: keyof U;
  toBase(): number;
};

const UNIT_VALUE_REGEXP = /(-?\d+(?:\.\d+)?)\s(.+)$/;

/**
If value is a string, parse the value and unit.
The returned values are then validated, where value
must be numeric and unit must be a non-empty string.

Usage :
   unitParser(2, 'unit', unitDef);
   unitParser('2 unit', unitDef);

*/
function unitParser<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>
>(
  value: string,
  unitDef?: UnitDefType<T, U, A, P, C>
): ParsedUnitValue<U> | null;
function unitParser<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>
>(
  value: number,
  unit?: string,
  unitDef?: UnitDefType<T, U, A, P, C>
): ParsedUnitValue<U> | null;
function unitParser<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>
>(
  value: number | string,
  unit?: string | UnitDefType<T, U, A, P, C> | keyof U,
  unitDef?: UnitDefType<T, U, A, P, C>
): ParsedUnitValue<U> | null {
  if (!unitDef) {
    unitDef = unit as UnitDefType<T, U, A, P, C>;
  }

  if (typeof value === "string") {
    const match = value.match(UNIT_VALUE_REGEXP);
    if (match) {
      value = Number(match[1]) || 0;
      unit = match[2];
    }
  }

  if (unitDef && (unit as keyof A) in unitDef[$DEF].aliases) {
    unit = unitDef[$DEF].aliases[unit as keyof A];
  }

  if (
    unit &&
    typeof unit === "string" &&
    unitDef?.[$DEF]?.aliases &&
    unit in unitDef[$DEF].units
  ) {
    return {
      value: value as number,
      unit: unit as keyof U,
      toBase() {
        return unitDef?.toBase(value as number, unit as keyof U) ?? 0;
      },
    };
  } else {
    throw new Error(
      `Invalid unit ${unit as string} for type ${unitDef?.[$DEF]?.base}`
    );
  }
}

export default unitParser;
