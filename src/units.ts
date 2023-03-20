import { $DEF } from "./util/constants";
import unitParser from "./util/unit-parser";

export type UnitType =
  | "acceleration"
  | "angle"
  | "area"
  | "binary"
  | "density"
  | "distance"
  | "electric.capacitance"
  | "electric.current"
  | "energy"
  | "flow.rate.mole"
  | "flow.rate.volume"
  | "force"
  | "frequency"
  | "illuminance"
  | "luminance"
  | "mass"
  | "power"
  | "pressure"
  | "temperature"
  | "time"
  | "torque"
  | "velocity"
  | "viscosity.dynamic"
  | "viscosity.dynamic.oil-water"
  | "viscosity.kinematic"
  | "volume";

export type DefinitionUnitFromTo = {
  fromBase: (b: number) => number;
  toBase: (v: number) => number;
};
type DefinitionBase<U extends DefinitionUnits> = U extends infer R
  ? keyof R
  : never;
export type DefinitionUnits = Record<string, DefinitionUnitFromTo | number>;
export type DefinitionAliases<U> = Record<string, keyof U>;

export type ConversionParams = Record<string, UnitType>;
export type ConverterFnParams<P extends ConversionParams> = {
  [K in keyof P as K extends string ? K : never]: number;
};
export type ConverterFn<P extends ConversionParams> = {
  (params: ConverterFnParams<P>): number;
};
export type Converters<P extends ConversionParams> = {
  [fn: string]: ConverterFn<P>;
};
type UnitConversion<P extends ConversionParams, C extends Converters<P>> = {
  readonly params: P;
  readonly converters: C;
};
type ConverterBuilderOptions<
  P extends ConversionParams,
  C extends Converters<P>
> = {
  params: P;
  converters: C;
};

type UnitBuilderOptions<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>
> = {
  type: T;
  base: DefinitionBase<U>;
  units: U;
  aliases?: A;
  conversion?: ConverterBuilderOptions<P, C>;
};

type UnitDefTypeSpecs<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>
> = {
  [$DEF]: Readonly<{
    type: T;
    base: U extends infer R ? keyof R : never;
    units: U;
    aliases: A;
    conversion: UnitConversion<P, C>;
  }>;
};
type UnitTypeDefFn<
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>
> = {
  [Fn in keyof A as Fn extends string ? Fn : never]: (value: number) => number;
};
type UnitTypeDefUtils<
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>
> = {
  toBase(value: number, unit: keyof U | keyof A): number;
  parse(str: string): number;
};

export type UnitDefType<
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>
> = UnitDefTypeSpecs<T, U, A, P, C> &
  UnitTypeDefFn<U, A> &
  UnitTypeDefUtils<U, A>;

const buildConverters = <P extends ConversionParams, C extends Converters<P>>({
  params,
  converters,
}: ConverterBuilderOptions<P, C>): UnitConversion<P, C> => {
  return { params, converters };
};

export const buildUnitDef = <
  T extends UnitType,
  U extends DefinitionUnits,
  A extends DefinitionAliases<U>,
  P extends ConversionParams,
  C extends Converters<P>
>({
  type,
  base,
  units,
  aliases,
  conversion,
}: UnitBuilderOptions<T, U, A, P, C>): UnitDefType<T, U, A, P, C> => {
  const fns = (
    aliases
      ? Object.entries(aliases).reduce((fns, [alias, unit]) => {
          const modifier = units[unit] as number;
          fns[alias] = (value: number) => value * modifier;
          return fns;
        }, {} as { [x: string]: any })
      : {}
  ) as UnitTypeDefFn<U, A>;

  const typeDef: UnitDefType<T, U, A, P, C> = {
    [$DEF]: {
      type,
      units,
      base,
      aliases: aliases ?? ({} as A),
      conversion: conversion
        ? buildConverters(conversion)
        : {
            params: {} as P,
            converters: {} as C,
          },
    },
    toBase(value, unit) {
      const modifier = (
        aliases && unit in aliases
          ? units[aliases[unit as keyof A]]
          : units[unit as keyof U]
      ) as U[keyof U] | undefined;

      return typeof (modifier as DefinitionUnitFromTo | undefined)?.toBase ===
        "function"
        ? (modifier as DefinitionUnitFromTo).toBase(value)
        : value * (modifier as number);
    },
    parse(str) {
      return unitParser(str, typeDef)?.toBase() ?? 0;
    },
    ...fns,
  };

  return typeDef;
};
