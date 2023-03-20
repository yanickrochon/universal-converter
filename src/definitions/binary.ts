import { buildUnitDef } from "../units";

const binaryDef = buildUnitDef({
  type: "binary",
  base: "byte",
  units: {
    bit: 1 / 8,
    byte: 1,
    kilobyte: 1024,
    megabyte: 1024 * 1024,
    gigabyte: 1024 * 1024 * 1024,
    terabyte: 1024 * 1024 * 1024 * 1024,
    petabyte: 1024 * 1024 * 1024 * 1024 * 1024,
  },
  aliases: {
    KB: "kilobyte",
    MB: "megabyte",
    GB: "gigabyte",
    TB: "terabyte",
    PB: "petabyte",
  },
});

export type BinaryType = typeof binaryDef;
export default binaryDef;
